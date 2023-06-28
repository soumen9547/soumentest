/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Popover,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import frequency from '../../../../assets/images/frequency.svg';
import chaticon from '../../../../assets/images/chaticon.svg';
import celendericon from '../../../../assets/images/celendericon.svg';
import { useNavigate } from 'react-router-dom';
import { chatProfileActions } from '../../../../redux/slices/chat-profile/chatProfileSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import { useLocation } from "react-router-dom";
import resumeimg from '../../../../assets/images/resumeimg.svg';
import pencile from '../../../../assets/images/pencil.svg';
import delecticon from '../../../../assets/images/delecticon.svg';
import notesimg from '../../../../assets/images/notesimg.svg';
import Filter from '../../../../assets/images/Filter.svg';
import smileimg from '../../../../assets/images/smileimg.svg';
import arrowsubtract from '../../../../assets/images/arrowsubtract.svg';
import ChatAvatarComponent from '../chat/ChatAvatarComponent';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import _ from 'lodash';
import AvatarRow from './Avatars';
import MentorRow from './MentorRow';
import SchedulecallTable from '../calls/SchedulecallTable';
import scheduleData from './meetings.json';
import axios from 'axios';
import { getUserDetails } from '../../../../utils/orgName';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { AppLoader } from '../../../../components/AppLoader';
import { API } from '../../../../api';
import { MyCardBox, MyCardHeading, BigValueTypography } from '../../style-components/CardStyling';

const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens') || '') : {};

// Make an API request using Axios
const { orgId } = getUserDetails();

const headerConfig = {
  headers: {
    orgId: orgId,
    Authorization: `Bearer ${tokens.access_token}`,
    idtoken: tokens.id_token,
    location: 'us'
  }
};

const Mentor = () => {
  const tableStyle = {
    fontWeigth: '600',
    color: '#68717A',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    marginBottom: '0 !important'
  };
  const textStyle = {
    fontWeigth: '600 !important',
    color: '#152536',
    fontSize: '16px',
    fontFamily: 'Open Sans',
    cursor: 'pointer'
  };
  const useStyles = makeStyles({
    membersNameText: {
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeight: '600 !important',
      color: '#152536 !important',
      marginRight: '10px !important'
    },
    mentorCard: {
      color: '#152536 !important',
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '400 !important'
    },
    headingText: {
      fontWeigth: '700 !important',
      color: '#152536',
      fontSize: '14px',
      fontFamily: 'Open Sans',
      marginBottom: '20px'
    },
    memberCircleImage: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      position: 'relative'
    },
    memberCircleInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      background: '#fff',
      borderRadius: '50%'
    },
    timeText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important'
    },
    overviewText: {
      fontSize: '16px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#000000 !important',
      width: '160px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },

    membersButton: {
      borderRadius: '5px',
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: '600',
      minWidth: '62px',
      height: '24px'
    },
    menberDetailsText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important',
      whiteSpace: 'nowrap'
    }
  });
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#28A745'
    }
  }));
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAuth0();
  const orgId = user?.org_id || '';
  const { location } = getUserDetails();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [peersList, setPeersList] = useState<any>();
  const [myMenteesList, setMyMenteesList] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [openNotes, setOpenNotes] = React.useState(false);
  const [openPeers, setOpenPeers] = React.useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const avatars: any = peersList?.mentors?.map((each: any) => each?.headshot);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    getUserCommunityPeersList(orgId, location);
  }, []);

  useEffect(() => {
    if (selectedMember) {
      navigateToChat();
    }
  }, [selectedMember]);

  const personalThreadsArr = useAppSelector((state) => state.acsChannels.personalThreadsArr);

  const userDetails = useAppSelector((state) => state.userProfile);

  // let mentorsArr: any = userDetails?.data?.mentors;
  // let groupId:string = mentorsArr.length ? mentorsArr[0] : "";

  const groupId = _.get(userDetails, 'data.mentors[0]', '');
  // const groupId = _.get(mentorsArr, '[0]', '');

  useEffect(() => {
    if (groupId !== '') {
      getMyMenteesList({ orgId, groupId });
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenPeers = () => {
    setOpenPeers(true);
  };

  const handleClosePeers = () => {
    setOpenPeers(false);
  };
  const handleClickOpenNotes = () => {
    setOpenNotes(true);
  };

  const handleCloseNotes = () => {
    setOpenNotes(false);
  };

  const navigateMember = (member: any) => {
    setSelectedMember(member);
  };

  const navigateToChat = () => {
    let communicationId = _.get(selectedMember, 'communicationUserId', '');
    if (!communicationId) {
      communicationId = _.get(selectedMember, 'communicationId', '');
    }
    const channel = personalThreadsArr?.find((each) => each?.displayNames?.includes(communicationId));
    dispatch(chatProfileActions.atnSetChatProfileState(null));
    if (communicationId && channel) {
      navigate(`/app/chat/?threadid=${_.get(channel, 'id')}&type=Chats&name=${_.get(channel, 'topic')}`);
    } else if (communicationId && !channel) {
      navigate(`/app/chat/?commId=${communicationId}`);
    }
  };

  const getUserCommunityPeersList = async (orgId: string, location: string) => {
    try {
      const response = await API.getUserCommunityPeersList(orgId, location);
      if (response.status === 200 && response.statusText === 'OK') {
        setPeersList(response?.data?.memberResponse);
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

  const getMyMenteesList = async ({ orgId, groupId }: { orgId: string; groupId: string }) => {
    try {
      const response = await API.getMyMentees({ orgId, groupId });
      if (response.status === 200 && response.statusText === 'OK') {
        setMyMenteesList(response?.data?.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error('Failed to get Mentors List');
      }
    } catch (e) {
      setLoading(false);
      toast.error('Failed to get Mentors List');
    }
  };

  const getMentorsName = (each: any) => {
    const chatProfileFirstName: any = _.get(each, 'firstName', '');
    const chatProfileLastName: any = _.get(each, 'lastName', '');
    return chatProfileFirstName
      ?.charAt(0)
      ?.toUpperCase()
      ?.concat(chatProfileFirstName?.slice(1)?.toLowerCase())
      ?.concat(
        ' ',
        chatProfileLastName?.charAt(0)?.toUpperCase()?.concat(chatProfileLastName?.slice(1)?.toLowerCase())
      );
  };

  const getMenteesName = (each: any) => {
    const chatProfileFirstName: any = each?.displayName.split(' ')[0];
    const chatProfileLastName: any = each?.displayName.split(' ').slice(1).join(' ');
    return chatProfileFirstName
      ?.charAt(0)
      ?.toUpperCase()
      ?.concat(chatProfileFirstName?.slice(1)?.toLowerCase())
      ?.concat(
        ' ',
        chatProfileLastName?.charAt(0)?.toUpperCase()?.concat(chatProfileLastName?.slice(1)?.toLowerCase())
      );
  };

  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      <Box className="bodyBox">
        <Typography
          sx={{
            fontSize: '20px',
            fontFamily: 'Open Sans',
            fontWeight: '400',
            color: '#152536',
            marginBottom: '15px'
          }}
        >
          Welcome, Sarah
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={3} md={6} sm={6}>
            <MyCardBox>
              <Stack mb={1} direction="row" justifyContent="space-between">
                <MyCardHeading>Advice Given</MyCardHeading>
              </Stack>
              <Box sx={{ height: '155px' }}>
                <BigValueTypography>
                  5:41<span style={{ fontSize: '35px' }}>hrs</span>
                </BigValueTypography>
                <Typography
                  sx={{
                    color: '#68717A',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: 'Open Sans'
                  }}
                >
                  Contributing to <span style={{ color: '#0082B6' }}> $900k </span>of advice provided in the program
                </Typography>
              </Box>
            </MyCardBox>
          </Grid>
          <Grid item lg={3} md={6} sm={6}>
            <MyCardBox>
              <Stack mb={1} direction="row" justifyContent="space-between">
                <MyCardHeading>Number of Connections</MyCardHeading>
              </Stack>
              <Box sx={{ height: '155px' }}>
                <BigValueTypography>152</BigValueTypography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={frequency}
                    alt="uparrow"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '250px'
                      // height: "13px",
                    }}
                  />
                </Box>
              </Box>
            </MyCardBox>
          </Grid>
          <Grid item lg={3} md={6} sm={6}>
            <MyCardBox>
              <Stack mb={1} direction="row" justifyContent="space-between">
                <MyCardHeading>Other Mentors in the Program</MyCardHeading>
              </Stack>
              <Box sx={{ height: '155px' }}>
                <BigValueTypography>{peersList?.mentors?.length}</BigValueTypography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '15px'
                  }}
                >
                  {/* <img
                    src={frameimg}
                    alt="frameimg"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "120px",
                      height: "64px",
                    }}
                  /> */}
                  <span
                    style={{
                      color: ' #0071A9',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Open Sans',
                      marginRight: '20px',
                      cursor: 'pointer'
                    }}
                    onClick={handleOpenPeers}
                  >
                    View More
                  </span>
                  <AvatarRow avatars={avatars} />
                </Box>
              </Box>
            </MyCardBox>
          </Grid>
          <Grid item lg={3} md={6} sm={6}>
            <MyCardBox>
              <Stack mb={1} direction="row" justifyContent="space-between">
                <MyCardHeading>Helpful Tips</MyCardHeading>
                <Typography style={{ color: '#0082B6', fontSize: '12px' }}>View More</Typography>
              </Stack>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography className={classes.mentorCard}>Best practices for mentoring in Dosen</Typography>
                <ChevronRightIcon sx={{ color: '#ABB5BE' }} />
              </Box>
              <Divider style={{ margin: '5px 0' }} />
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography className={classes.mentorCard}>Understanding the mentee experience</Typography>
                <ChevronRightIcon sx={{ color: '#ABB5BE' }} />
              </Box>
              <Divider style={{ margin: '5px 0' }} />
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Typography className={classes.mentorCard}>Driving engagement with your mentees</Typography>
                <ChevronRightIcon sx={{ color: '#ABB5BE' }} />
              </Box>
            </MyCardBox>
          </Grid>
        </Grid>

        {/* Table section */}
        <Box
          sx={{
            margin: '20px 0 20px 0',
            background: '#ffffff',
            border: '1px solid #EFF0F4',
            borderRadius: '8px'
            // height: "calc(100vh - 210px)",
            // overflow: "hidden auto",
          }}
        >
          <TableContainer>
            <Table className="program-table" width="100%" aria-label="simple table">
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid #EFF0F4' }}>
                  <TableCell colSpan={6} width="50%" align="left">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#152536',
                          textAlign: 'left'
                        }}
                      >
                        Students
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={6} width="50%">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <img
                        src={Filter}
                        alt="filtericon"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: '32px',
                          height: '32px',
                          marginRight: '10px',
                          cursor: 'pointer'
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table className="program-table" width="100%" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={tableStyle}>MENTEE NAME</TableCell>
                  <TableCell style={tableStyle}>YEARS</TableCell>

                  <TableCell style={tableStyle}>COURES</TableCell>
                  <TableCell style={tableStyle}>ENGAGEMENT / AFFINITY</TableCell>

                  <TableCell style={tableStyle}>GOAL PROGRESS</TableCell>
                  <TableCell style={tableStyle}>LAST CONNECTION</TableCell>
                  <TableCell style={tableStyle}>TIME OF ADVICE</TableCell>
                  <TableCell style={tableStyle}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myMenteesList.length > 0 ? (
                  [...myMenteesList].map((each: any, index: any) => (
                    <TableRow>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ marginRight: '8px' }}>
                            <Box className={classes.memberCircleImage}>
                              <Box className={classes.memberCircleInner}>
                                <img
                                  // src={womenimg}
                                  src={each.headshot}
                                  alt="womencircle"
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <Typography style={textStyle}>
                              {/* Mallory Capo */}
                              {getMenteesName(each)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography>
                          {/* 4th year */}
                          {each?.bio?.education?.university ? each?.bio?.education?.university : '4th year'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Typography>
                          {/* Biology Major */}
                          {each?.bio?.education?.major ? each?.bio?.education?.major : 'Biology Major'}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {' '}
                        <img
                          src={smileimg}
                          alt="smileimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '24px',
                            height: '24px'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {' '}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BorderLinearProgress
                            variant="determinate"
                            value={30}
                            sx={{
                              width: '70px',
                              height: '8px',
                              background: '#DF6438'
                            }}
                          />
                          <span
                            style={{
                              color: '#68717A',
                              opacity: '0.8',
                              marginLeft: '6px',
                              fontSize: '14px'
                            }}
                          >
                            30%
                          </span>
                        </Box>
                      </TableCell>

                      <TableCell>12 days ago</TableCell>
                      <TableCell>2 h 20 m</TableCell>

                      <TableCell>
                        <IconButton onClick={handleClick}>
                          <MoreVertIcon sx={{ color: '#152536' }} />
                        </IconButton>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton>
                              <img
                                src={pencile}
                                alt="pencil"
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  width: '20px',
                                  height: '20px'
                                }}
                              />
                            </IconButton>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: '400',
                                fontFamily: 'Open Sans'
                              }}
                            >
                              Edit
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton>
                              <img
                                src={notesimg}
                                alt="pencil"
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  width: '20px',
                                  height: '20px'
                                }}
                              />
                            </IconButton>
                            <Typography
                              sx={{
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '400',
                                fontFamily: 'Open Sans'
                              }}
                              onClick={handleClickOpenNotes}
                            >
                              Notes
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton>
                              <img
                                src={delecticon}
                                alt="pencil"
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  width: '20px',
                                  height: '20px'
                                }}
                              />
                            </IconButton>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: '400',
                                fontFamily: 'Open Sans'
                              }}
                            >
                              Delete
                            </Typography>
                          </Box>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Typography p={1}>No Mentee Found</Typography>
                )}

                {/* 
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ marginRight: "8px" }}>
                        <Box className={classes.memberCircleImage}>
                          <Box className={classes.memberCircleInner}>
                            <img
                              src={womenimg}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography style={textStyle}>
                          Mallory Capoferri
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography>4th year</Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography>Biology Major</Typography>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {" "}
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
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={30}
                        sx={{
                          width: "70px",
                          height: "8px",
                          background: "#DF6438",
                        }}
                      />
                      <span
                        style={{
                          color: "#68717A",
                          opacity: "0.8",
                          marginLeft: "6px",
                          fontSize: "14px",
                        }}
                      >
                        30%
                      </span>
                    </Box>
                  </TableCell>

                  <TableCell>12 days ago</TableCell>
                  <TableCell>2 h 20 m</TableCell>

                  <TableCell>
                    <MoreVertIcon sx={{ color: "#152536" }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ marginRight: "8px" }}>
                        <Box className={classes.memberCircleImage}>
                          <Box className={classes.memberCircleInner}>
                            <img
                              src={womenimg}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography style={textStyle}>
                          Mallory Capoferri
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography>4th year</Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography>Biology Major</Typography>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {" "}
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
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={30}
                        sx={{
                          width: "70px",
                          height: "8px",
                          background: "#DF6438",
                        }}
                      />
                      <span
                        style={{
                          color: "#68717A",
                          opacity: "0.8",
                          marginLeft: "6px",
                          fontSize: "14px",
                        }}
                      >
                        30%
                      </span>
                    </Box>
                  </TableCell>

                  <TableCell>12 days ago</TableCell>
                  <TableCell>2 h 20 m</TableCell>

                  <TableCell>
                    <MoreVertIcon sx={{ color: "#152536" }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ marginRight: "8px" }}>
                        <Box className={classes.memberCircleImage}>
                          <Box className={classes.memberCircleInner}>
                            <img
                              src={womenimg}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography style={textStyle}>
                          Mallory Capoferri
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography>4th year</Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography>Biology Major</Typography>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {" "}
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
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={30}
                        sx={{
                          width: "70px",
                          height: "8px",
                          background: "#DF6438",
                        }}
                      />
                      <span
                        style={{
                          color: "#68717A",
                          opacity: "0.8",
                          marginLeft: "6px",
                          fontSize: "14px",
                        }}
                      >
                        30%
                      </span>
                    </Box>
                  </TableCell>

                  <TableCell>12 days ago</TableCell>
                  <TableCell>2 h 20 m</TableCell>

                  <TableCell>
                    <MoreVertIcon sx={{ color: "#152536" }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ marginRight: "8px" }}>
                        <Box className={classes.memberCircleImage}>
                          <Box className={classes.memberCircleInner}>
                            <img
                              src={womenimg}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography style={textStyle}>
                          Mallory Capoferri
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography>4th year</Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography>Biology Major</Typography>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {" "}
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
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={30}
                        sx={{
                          width: "70px",
                          height: "8px",
                          background: "#DF6438",
                        }}
                      />
                      <span
                        style={{
                          color: "#68717A",
                          opacity: "0.8",
                          marginLeft: "6px",
                          fontSize: "14px",
                        }}
                      >
                        30%
                      </span>
                    </Box>
                  </TableCell>

                  <TableCell>12 days ago</TableCell>
                  <TableCell>2 h 20 m</TableCell>

                  <TableCell>
                    <MoreVertIcon sx={{ color: "#152536" }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ marginRight: "8px" }}>
                        <Box className={classes.memberCircleImage}>
                          <Box className={classes.memberCircleInner}>
                            <img
                              src={womenimg}
                              alt="womencircle"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography style={textStyle}>
                          Mallory Capoferri
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography>4th year</Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography>Biology Major</Typography>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {" "}
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
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={30}
                        sx={{
                          width: "70px",
                          height: "8px",
                          background: "#DF6438",
                        }}
                      />
                      <span
                        style={{
                          color: "#68717A",
                          opacity: "0.8",
                          marginLeft: "6px",
                          fontSize: "14px",
                        }}
                      >
                        30%
                      </span>
                    </Box>
                  </TableCell>

                  <TableCell>12 days ago</TableCell>
                  <TableCell>2 h 20 m</TableCell>

                  <TableCell>
                    <MoreVertIcon sx={{ color: "#152536" }} />
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Recommended Articles */}
        <Box
          sx={{
            margin: '20px 0 20px 0',
            background: '#ffffff',
            border: '1px solid #EFF0F4',
            borderRadius: '8px'
          }}
        >
          <Typography style={textStyle} sx={{ padding: '16px' }}>
            Recommended Articles
          </Typography>

          <Divider />
          <Box
            sx={{
              display: 'flex',
              padding: '16px',
              alignItems: 'center',
              columnGap: '15px',
              width: 'calc(100vw - 168px)',
              overflow: 'auto'
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginRight: '15px' }}>
                  <img
                    src={resumeimg}
                    alt="resumeimg"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '118px',
                      height: '79px',
                      borderRadius: '5px',
                      objectFit: 'cover'
                    }}
                  />
                </Box>

                <Box sx={{ width: '160px' }}>
                  <Typography className={classes.overviewText}>Overview of Top US Industries in 2022</Typography>

                  <Typography className={classes.timeText}>4:06</Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginRight: '15px' }}>
                  <img
                    src={resumeimg}
                    alt="resumeimg"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '118px',
                      height: '79px',
                      borderRadius: '5px',
                      objectFit: 'cover'
                    }}
                  />
                </Box>

                <Box sx={{ width: '160px' }}>
                  <Typography className={classes.overviewText}>Resume writing for IT pros</Typography>

                  <Typography className={classes.timeText}>4:06</Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginRight: '15px' }}>
                  <img
                    src={resumeimg}
                    alt="resumeimg"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '118px',
                      height: '79px',
                      borderRadius: '5px',
                      objectFit: 'cover'
                    }}
                  />
                </Box>

                <Box sx={{ width: '160px' }}>
                  <Typography className={classes.overviewText}>How to target industries</Typography>

                  <Typography className={classes.timeText}>
                    3 min read | by <span style={{ color: '#0082B6' }}>Ronan Wall</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginRight: '15px' }}>
                  <img
                    src={resumeimg}
                    alt="resumeimg"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '118px',
                      height: '79px',
                      borderRadius: '5px',
                      objectFit: 'cover'
                    }}
                  />
                </Box>

                <Box sx={{ width: '160px' }}>
                  <Typography className={classes.overviewText}>Overview of Top US Industries in 2022</Typography>

                  <Typography className={classes.timeText}>
                    3 min read | by <span style={{ color: '#0082B6' }}>Ronan Wall</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Notes for Mallory Capoferri */}
      <Dialog
        open={openNotes}
        onClose={handleCloseNotes}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            fontFamily: 'Open Sans',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '600',
            color: '#152536'
          }}
        >
          Notes for Mallory Capoferri
          <IconButton onClick={handleClose} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'Open Sans',
                  color: '#152536'
                }}
              >
                Notes Title
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  color: '#ABB5BE'
                }}
              >
                5 min ago
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Open Sans',
                color: '#68717A',
                margin: '10px 0'
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Sagittis elit quam suspendisse enim. Et praesent consectetur mi
              pulvinar. Ut amet scelerisque mi ultricies semper viverra. Lorem ipsum dolor sit amet consectetur.
              Sagittis elit quam suspendisse enim. Et praesent consectetur mi pulvinar. Ut amet scelerisque mi ultricies
              semper viverra.
            </Typography>
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: '400',
                fontFamily: 'Open Sans',
                color: '#DC3545',
                textAlign: 'right',
                margin: '15px 0'
              }}
            >
              Remove
            </Typography>
            <Divider style={{ marginBottom: '10px' }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'Open Sans',
                  color: '#152536'
                }}
              >
                Notes Title
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  color: '#ABB5BE'
                }}
              >
                01/13/2023
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Open Sans',
                color: '#68717A',
                margin: '10px 0'
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Sagittis elit quam suspendisse enim. Et praesent consectetur mi
              pulvinar. Ut amet scelerisque mi ultricies semper viverra. Lorem ipsum dolor sit amet consectetur.
              Sagittis elit quam suspendisse enim. Et praesent consectetur mi pulvinar. Ut amet scelerisque mi ultricies
              semper viverra.
            </Typography>
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: '400',
                fontFamily: 'Open Sans',
                color: '#DC3545',
                textAlign: 'right',
                margin: '15px 0'
              }}
            >
              Remove
            </Typography>
            <Divider style={{ marginBottom: '10px' }} />

            <Box
              sx={{
                border: '1px solid #DEE2E6',
                borderRadius: '8px',
                width: '100%',
                height: '99px',
                marginTop: '30px',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  background: '#0082B6',
                  border: '1px solid #0071A9',
                  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.08)',
                  borderRadius: '8px',
                  height: '32px',
                  width: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: '15px',
                  bottom: '15px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={arrowsubtract}
                  alt="arrowsubtract"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '14px',
                    height: '16px'
                  }}
                />
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Group of Peers Modal */}
      <Dialog
        open={openPeers}
        // onClose={()=>{setOpenPeers(false)}}
        onClose={handleClosePeers}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            fontFamily: 'Open Sans',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '600',
            color: '#152536'
          }}
        >
          Other Mentors in the Program{`(${peersList?.mentors?.length})`}
          <IconButton onClick={handleClosePeers} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: '5px 20px' }}>
          {peersList?.mentors?.map((each: any) => {
            let cat: any = each?.category;

            return (
              <Box
                sx={{
                  display: 'flex',
                  borderBottom: '1px solid #EFF0F4',
                  padding: '13px'
                  // maxWidth: "360px",
                }}
                // onClick={()=>{setSelectedMember(each)}}
              >
                <Box sx={{ marginRight: '8px' }}>
                  <Box className={classes.memberCircleImage}>
                    <Box className={classes.memberCircleInner}>
                      {/* <img
                          src={each.headshot}
                          alt="womencircle"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        /> */}
                      <Box>
                        <IconButton sx={{ padding: '0 !important' }}>
                          <ChatAvatarComponent
                            height="48px"
                            width="48px"
                            firstLetter={each?.displayName?.slice(0, 1)}
                            image={each?.headshot}
                            type="no status"
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: '1'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexGrow: '1'
                    }}
                  >
                    <Box sx={{ width: '220px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography className={classes.membersNameText}>
                          {/* Amy Rodriguez */}
                          {/* {each.displayName} */}
                          {getMentorsName(each)}
                        </Typography>
                        {/* <Button
                        className={classes.membersButton}
                        style={{
                          border: " 1px solid #2955C7",
                          textTransform: "capitalize",
                          color: "#2955C7",
                        }}
                      >
                        Student
                        {each.category}
                      </Button> */}
                        <Button
                          className={classes.membersButton}
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
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: '5px'
                        }}
                      >
                        <Typography className={classes.menberDetailsText}>{each?.bio?.workHistory?.role},</Typography>
                        <Typography className={classes.menberDetailsText}>
                          {each?.bio?.education?.major && (
                            <FiberManualRecordIcon
                              sx={{
                                fontSize: '6px',
                                margin: '0 5px',
                                cursor: 'pointer'
                              }}
                            />
                          )}
                          {/* Biology Major */}
                          {each?.bio?.education?.university || each?.bio?.workHistory?.companyName}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '15px'
                      }}
                    >
                      <img
                        src={chaticon}
                        alt="chaticon"
                        style={{
                          padding: 0,
                          width: '21px',
                          height: '21px',
                          marginRight: '10px!important',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          navigateMember(each);
                        }}
                      />
                      <img
                        src={celendericon}
                        alt="celendericon"
                        style={{
                          padding: 0,

                          width: '19px',
                          height: '19px'
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Mentor;
