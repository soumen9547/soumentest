/* eslint-disable no-duplicate-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import {} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import profilebgimg from '../../../../../../assets/images/profilebgimg.png';
import linkedinfile from '../../../../../../assets/images/linkedinfile.svg';
import { API } from '../../../../../../api';
import ChatAvatarComponent from '../../../chat/ChatAvatarComponent';
import { countries } from '../../../../../profile-page/countryData';
import { Social } from '../../../../components/SocialHandles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { AppLoader } from '../../../../../../components/AppLoader';
import ChatProfile from '../../../chat/chat-main/ChatProfile';
import { toast } from 'react-toastify';
// import moment from "moment";

interface Props {
  actievUserId: string;
  setShowProfile: any;
  grpId: any;
}

const ProgramUserDetails = ({ actievUserId, setShowProfile, grpId }: Props) => {
  const useStyles = makeStyles({
    root: {
      backgroundImage: `url(${profilebgimg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '2px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '120px'
    },
    wapperSection: {
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '16px',
      color: '#68717A',
      marginBottom: '5px'
    },
    wapperBottomSection: {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '19px',
      color: '#152536'
    },
    viewAssemessmentButton: {
      background: '#6C757D !important',
      borderRadius: '16px !important',
      border: '1px solid #2955C7 !important',
      color: '#fff !important',
      //   width: "162px !important",
      height: '30px !important',
      fontSize: '14px !important',
      fontWeight: '400 !important',
      margin: '8px 10px 15px 0 !important'
    },
    chatWrapper: {
      height: '100%',
      padding: 5
    },
    profileWrapper: {
      height: '100%',
      padding: 2
    }
  });

  const [completeUserDetails, setCompleteUserDetails] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const [loading, setLoading] = useState<any>(true);
  const [open, setOpen] = React.useState(false);
  const [latestEducation, setLatestEducation] = useState<any>();
  const [latestWorkHistory, setLatestWorkHistory] = useState<any>();
  const [copied, setCopied] = useState<any>('');
  const copiedUserDetails = {
    ...userDetails,
    id: userDetails?.personal_details,
    bio: { education: latestEducation, workHistory: latestWorkHistory },
    education: { data: userDetails?.professional_details?.education },
    workHistory: { data: userDetails?.professional_details?.workHistory },
    digital_intro: userDetails?.digital_intro?.videoUrl
  };

  const classes = useStyles();

  const fetchUserDetails = async (grpId: string, actievUserId: string) => {
    try {
      const response = await API.getUserProfileInAGroup(grpId, actievUserId);
      if (response.status === 200 && response.statusText === 'OK') {
        setCompleteUserDetails(response?.data);
        setUserDetails(response?.data?.userDetails);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error('Something went wrong');
      }
    } catch (e) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchUserDetails(grpId, actievUserId);
  }, []);

  useEffect(() => {
    setLatestEducation(
      userDetails?.professional_details?.education?.sort((a: any, b: any) => b?.graduation_date - a?.graduation_date)[0]
    );
  }, [userDetails]);

  useEffect(() => {
    setLatestWorkHistory(
      userDetails?.professional_details?.workHistory
        ?.filter((a: any) => a.currentlyWorking === true)
        ?.sort((a: any, b: any) => b.start_date - a.start_date)[0]
    );
  }, [userDetails]);

  const getCountry = () => {
    const value = countries?.find((each) => each.code === userDetails?.personal_details?.country);
    if (value) {
      return value.label;
    }
    return '-';
  };

  const getDays = () => {
    const currentDate: any = new Date();

    // Convert the Unix timestamp to a Date object
    const unixTimestamp: any = userDetails?.lastLogin * 1000; // Convert seconds to milliseconds
    const targetDate: any = new Date(unixTimestamp);

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = currentDate - targetDate;

    // Convert the time difference to days
    const daysDifference = Math.floor(timeDifferenceMs / (24 * 60 * 60 * 1000));

    return daysDifference;
  };
  type IconLabel = { id: number; name: string; icon: ReactNode } & {
    name: keyof Social;
  };

  const socialIconsArray: IconLabel[] = [
    {
      id: 1,
      name: 'facebook',
      icon: <FacebookIcon sx={{ width: '20px', height: '20px', color: '#475993' }} />
    },
    {
      id: 2,
      name: 'instagram',
      icon: <InstagramIcon sx={{ width: '20px', height: '20px', color: '#9C27B0' }} />
    },
    {
      id: 3,
      name: 'twitter',
      icon: <TwitterIcon sx={{ width: '20px', height: '20px', color: '#03A9F4' }} />
    },
    {
      id: 4,
      name: 'linkedIn',
      icon: <LinkedInIcon sx={{ width: '20px', height: '20px', color: '#0072b1' }} />
    },
    {
      id: 5,
      name: 'youtube',
      icon: <YouTubeIcon sx={{ color: '#FF0000', width: '20px', height: '20px' }} />
    }
  ];

  const data: any = {
    linkedIn: userDetails?.personal_details?.social?.linkedIn
  };

  const getIcons = () => {
    if (data) {
      const keys = Object.keys(data);
      const newArray: any = [];
      socialIconsArray?.forEach((each) => {
        if (keys?.includes(each.name) && data[each.name]) {
          newArray?.push(
            <IconButton key={each.id}>
              <a href={data[each.name]}>{each.icon}</a>
            </IconButton>
          );
        }
      });
      if (newArray?.length > 0) {
        return newArray;
      }
      return <Typography>-</Typography>;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCopy = (url: any) => {
    navigator.clipboard.writeText(url);
    setCopied('Copied');
  };

  useEffect(() => {
    const clear = setTimeout(() => {
      setCopied('');
    }, 200);

    return () => {
      clearTimeout(clear);
    };
  }, [copied]);

  // const getAlert=()=>{
  //   // if(copied){
  //     setCopied(false);
  //      return (<span>{"Copied"}</span>)

  //   // }

  // }

  const cat: any = userDetails?.personal_details.category;

  if (loading) {
    return <AppLoader height="50vh" />;
  }

  return (
    <>
      {/* <Grid container className={classes.chatWrapper}> */}
      <Grid container className={classes.chatWrapper}>
        <Grid item xs className={classes.chatWrapper}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <IconButton onClick={() => setShowProfile(false)}>
              {' '}
              <CloseIcon />{' '}
            </IconButton>
          </Box>
          <Box sx={{ height: 'cacl(100vh - 200px)', overflow: 'auto' }}>
            <Box
              sx={{
                background: '#fff',
                border: '1px solid #EFF0F4',
                borderRadius: '8px',
                margin: '10px 0 20px'
              }}
            >
              <Box className={classes.root}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '15px'
                  }}
                >
                  {/* <Box>
                <IconButton>
                  <img
                    src={lavelleprofile}
                    //src={`url(${userDetails?.headshot})`}
                    alt="lavelleprofile"
                    style={{
                      padding: 0,
                      margin: 0,

                      width: "80px",
                      height: "80px",
                    }}
                  />
                </IconButton>
              </Box> */}
                  <Box>
                    <IconButton sx={{ padding: '0 !important' }}>
                      <ChatAvatarComponent
                        height="80px"
                        width="80px"
                        firstLetter={userDetails?.personal_details?.firstName?.slice(0, 1)}
                        image={userDetails?.personal_details?.headshot}
                        type="no status"
                      />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center !important' }}>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontWeight: '700',
                          fontSize: '24px',
                          lineHeight: '33px',
                          color: '#152536',
                          marginRight: '20px'
                        }}
                      >
                        {/* Jonathan Lavelle */}
                        {userDetails?.name}
                      </Box>
                      {/* <Button
                    sx={{
                      background: "#FFFFFF",
                      border: "1px solid #2955C7",
                      borderRadius: "5px",
                      color: "#2955C7",
                      width: "65px",
                      height: "24px",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "capitalize !important",
                    }}
                  >
                    Student
                  </Button> */}
                      <Button
                        sx={{
                          background: '#FFFFFF',
                          border: ` 1px solid ${
                            cat === 'Student'
                              ? '#2955C7'
                              : cat === 'Faculty'
                              ? '#11895E'
                              : cat === 'Mentor'
                              ? '#E99940'
                              : cat === 'Alumni'
                              ? '#C7A429'
                              : '#000000'
                          }`,
                          borderRadius: '5px',
                          color:
                            cat === 'Student'
                              ? '#2955C7'
                              : cat === 'Faculty'
                              ? '#11895E'
                              : cat === 'Mentor'
                              ? '#E99940'
                              : cat === 'Alumni'
                              ? '#C7A429'
                              : '#000000',
                          fontSize: '12px',
                          fontWeight: '600',
                          height: '24px'
                        }}
                      >
                        {cat ? cat : 'Unknown'}
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        fontFamily: 'Open Sans',
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '19px',
                        color: '#68717A',
                        marginTop: '5px'
                      }}
                    >
                      {/* Jonathan@gmail.com */}
                      {userDetails?.email}
                      <span style={{ color: '#fff', padding: '0 6px' }}>|</span>
                      {userDetails?.personal_details.phonePrefix} {userDetails?.personal_details.phoneNumber}
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Button
                    className="btnBackGround"
                    sx={{
                      background: '#0071A9',
                      width: '133px',
                      height: '35px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Open Sans',
                      border: '1px solid #0071A9',
                      borderRadius: '8px',
                      textTransform: 'capitalize !important',
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#0071A9'
                      }
                    }}
                    onClick={handleClickOpen}
                  >
                    Public Profile
                  </Button>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  // columnGap: "40px",
                  padding: '20px'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item lg={2}>
                    <Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '16px',
                          color: '#68717A',
                          marginBottom: '5px'
                        }}
                      >
                        Major
                      </Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '19px',
                          color: '#152536'
                        }}
                      >
                        {/* Digital Media */}
                        {latestEducation?.major ? latestEducation?.major : '-'}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={2}>
                    <Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '16px',
                          color: '#68717A',
                          marginBottom: '5px'
                        }}
                      >
                        Year
                      </Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '19px',
                          color: '#152536'
                        }}
                      >
                        {/* 2016 */}
                        {latestEducation?.graduation_date ? latestEducation?.graduation_date : '-'}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={2}>
                    <Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '16px',
                          color: '#68717A',
                          marginBottom: '5px'
                        }}
                      >
                        Country
                      </Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '19px',
                          color: '#152536'
                        }}
                      >
                        {/* Ireland */}
                        {getCountry()}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={2}>
                    <Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '16px',
                          color: '#68717A',
                          marginBottom: '5px'
                        }}
                      >
                        Role
                      </Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '19px',
                          color: '#152536',
                          textOverflow: 'ellipsis',
                          maxWidth: '100px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Mentee */}
                        {completeUserDetails?.roleInGroup?.role?.slice(0, 1)?.toUpperCase() +
                          completeUserDetails?.roleInGroup?.role?.slice(1)}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Box sx={{ padding: '20px' }}>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'Open Sans',
                    fontWeight: '600',
                    marginBottom: '10px'
                  }}
                >
                  Programs
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  {completeUserDetails?.allGroupsUserBelongsTo?.map((each: any, index: any) => (
                    <Button
                      className="btnBackGround"
                      key={index}
                      sx={{
                        background: '#0071A9',
                        border: '1px solid #2955C7',
                        borderRadius: '16px',
                        color: '#fff',
                        minWidth: '155px',
                        height: '30px',
                        fontSize: '14px',
                        fontWeight: '400',
                        textTransform: 'capitalize !important',
                        marginRight: '10px',
                        marginBottom: '10px'
                      }}
                    >
                      {/* First Year Students** */}
                      {each}
                    </Button>
                  ))}
                  {/*               
              <Button
                sx={{
                  background: "#0071A9",
                  border: "1px solid #2955C7",
                  borderRadius: "16px",
                  color: "#fff",
                  width: "63px",
                  height: "30px",
                  fontSize: "14px",
                  fontWeight: "400",
                  textTransform: "capitalize !important",
                }}
              >
                MBA**
              </Button> */}
                </Box>
              </Box>
            </Box>

            <Box sx={{ padding: '0px', marginBottom: '20px' }}>
              <Accordion sx={{ padding: '0px !important' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'Open Sans'
                    }}
                  >
                    Profile Information
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {/* <Grid item lg={2}>
                  <Box>
                    <Box className={classes.wapperSection}>Student Number</Box>
                    <Box className={classes.wapperBottomSection}>{"**"}</Box>
                  </Box>
                </Grid> */}
                    <Grid item lg={2}>
                      <Box>
                        <Box className={classes.wapperSection}>Department</Box>
                        <Box className={classes.wapperBottomSection}>
                          {latestEducation?.department ? latestEducation?.department : '-'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box>
                        <Box className={classes.wapperSection}>Year</Box>
                        <Box className={classes.wapperBottomSection}>
                          {latestEducation?.graduation_date ? latestEducation?.graduation_date : '-'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box>
                        <Box className={classes.wapperSection}>User Type</Box>
                        <Box className={classes.wapperBottomSection}>
                          {userDetails?.personal_details?.category ? userDetails?.personal_details?.category : '-'}
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item lg={2}>
                      <Box>
                        <Box className={classes.wapperSection}>Major</Box>
                        <Box className={classes.wapperBottomSection}>
                          {/* Digital Media */}
                          {latestEducation?.major ? latestEducation?.major : '-'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box>
                        <Box className={classes.wapperSection}>College</Box>
                        <Box className={classes.wapperBottomSection}>
                          {/* College of Arts and Sciences */}
                          {latestEducation?.university ? latestEducation?.university : '-'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box>
                        <Box className={classes.wapperSection}>Major</Box>
                        <Box className={classes.wapperBottomSection}>
                          {/* Digital Media */}
                          {latestEducation?.major ? latestEducation?.major : '-'}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={2}>
                      <Box>
                        <Box className={classes.wapperSection}>Minor</Box>
                        <Box className={classes.wapperBottomSection}>
                          {latestEducation?.minor ? latestEducation?.minor : '-'}
                        </Box>
                      </Box>
                    </Grid>
                    {/* <Grid item lg={2}>
                  <Box>
                    <Box className={classes.wapperSection}>
                      Length of Course
                    </Box>
                    <Box className={classes.wapperBottomSection}>4 Years**</Box>
                  </Box>
                </Grid>
                <Grid item lg={2}>
                  <Box>
                    <Box className={classes.wapperSection}>Program Type</Box>
                    <Box className={classes.wapperBottomSection}>Careers**</Box>
                  </Box>
                </Grid>
                <Grid item lg={2}>
                  <Box>
                    <Box className={classes.wapperSection}>
                      Onboarding status
                    </Box>
                    <Box className={classes.wapperBottomSection}>Invited**</Box>
                  </Box>
                </Grid> */}
                    <Grid item lg={2}>
                      <Box>
                        <Box className={classes.wapperSection}>
                          Linkedin URL{' '}
                          {data?.linkedIn && (
                            <img
                              src={linkedinfile}
                              alt="linkedin"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '13px',
                                height: '13px'
                              }}
                              onClick={() => {
                                handleCopy(data?.linkedIn);
                              }}
                            />
                          )}
                          {copied && <span>{copied}</span>}
                        </Box>

                        {/* <Box className={classes.wapperBottomSection}>
                      <img
                        src={linkedin}
                        alt="linkedin"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    </Box> */}
                        <Box sx={{ height: '19px', display: 'flex' }}>{getIcons()}</Box>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* <Box sx={{ padding: "0px", marginBottom: "20px" }}>
          <Accordion sx={{ padding: "0px !important" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                }}
              >
                View Assessments
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Box>
                <Typography className={classes.wapperBottomSection}>
                  What is your intention after this academic year?
                </Typography>

                <Button
                  sx={{ textTransform: "capitalize" }}
                  className={classes.viewAssemessmentButton}
                >
                  Enter the workforce**
                </Button>
              </Box>
              <Box>
                <Typography className={classes.wapperBottomSection}>
                  Which sectors are you interested in working in?
                </Typography>

                <Button
                  sx={{ textTransform: "capitalize" }}
                  className={classes.viewAssemessmentButton}
                >
                  Computer & Tech**
                </Button>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  className={classes.viewAssemessmentButton}
                >
                  Finance
                </Button>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  className={classes.viewAssemessmentButton}
                >
                  Marketing
                </Button>
              </Box>

              <Box>
                <Typography className={classes.wapperBottomSection}>
                  What types of jobs/roles are you interested in pursuing?
                </Typography>

                <Button
                  sx={{ textTransform: "capitalize" }}
                  className={classes.viewAssemessmentButton}
                >
                  Arts & Design
                </Button>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  className={classes.viewAssemessmentButton}
                >
                  Entrepreneurship
                </Button>
                <Button
                  sx={{ textTransform: "capitalize" }}
                  className={classes.viewAssemessmentButton}
                >
                  Legal
                </Button>
              </Box>

              <Box>
                <Typography className={classes.wapperBottomSection}>
                  What is your intention after this academic year?
                </Typography>

                <Button
                  sx={{ textTransform: "capitalize" }}
                  className={classes.viewAssemessmentButton}
                >
                  Enter the workforce
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box> */}
            <Box
              sx={{
                background: '#fff',
                border: '1px solid #EFF0F4',
                borderRadius: '8px',
                margin: '10px 0 20px'
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'Open Sans',
                  padding: '15px'
                }}
              >
                Other Information
              </Typography>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  // columnGap: "40px",
                  padding: '20px'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item lg={2}>
                    <Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '16px',
                          color: '#68717A',
                          marginBottom: '5px'
                        }}
                      >
                        Days since last login
                      </Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '19px',
                          color: '#152536'
                        }}
                      >
                        {/* 20 Days */}
                        {getDays()} days
                        {/* {moment.unix(userDetails?.lastLogin).format("MMM DD,YYYY")} */}
                        {/* {new Date().getDate() - new Date(userDetails?.lastLogin).getDate()} */}
                      </Box>
                    </Box>
                  </Grid>
                  {/* <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Progress Score
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                    }}
                  >
                    Progress Score**
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    XP
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                    }}
                  >
                    20 Points**
                  </Box>
                </Box>
              </Grid> */}
                  {/* <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Engagement
                  </Box>
                  <img
                    src={smileimg}
                    alt="smileimg"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  {"**"}
                </Box>
              </Grid> */}
                  <Grid item lg={2}>
                    <Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '16px',
                          color: '#68717A',
                          marginBottom: '5px'
                        }}
                      >
                        Employed
                      </Box>
                      <Box
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '19px',
                          color: '#152536',
                          textOverflow: 'ellipsis',
                          maxWidth: '100px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden'
                        }}
                      >
                        {latestWorkHistory?.currentlyWorking === true ? 'Yes' : 'No'}
                      </Box>
                    </Box>
                  </Grid>
                  {/* <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Connections
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    22**
                  </Box>
                </Box>
              </Grid> */}
                  {/* <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Conversations
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    4**
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Messages
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    106**
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Calls
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    7**
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Content viewed
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    7**
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Total View Time
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    10h 60 min**
                  </Box>
                </Box>
              </Grid> */}
                  {/* <Grid item lg={2}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "#68717A",
                      marginBottom: "5px",
                    }}
                  >
                    Onboarding Status
                  </Box>
                  <Box
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "19px",
                      color: "#152536",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Invited**
                  </Box>
                </Box>
              </Grid> */}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
        {open ? (
          <Grid item xs={3} className={classes.profileWrapper}>
            <ChatProfile
              workHistory={copiedUserDetails?.workHistory}
              educationDetails={copiedUserDetails?.education}
              chatProfile={copiedUserDetails}
              onCloseChatProfile={() => {
                setOpen(false);
              }}
              setActiveChat={() => {}}
              parentComponent="programUserDetails"
            />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default ProgramUserDetails;
