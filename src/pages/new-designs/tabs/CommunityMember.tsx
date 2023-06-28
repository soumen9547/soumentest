/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Divider, Typography, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Filter from '../../../assets/images/Filter.svg';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import { API } from '../../../api';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchUserWorkHistory } from '../../../redux/slices/user-work/userWorkHistorySlice';
import { getUserDetails } from '../../../utils/orgName';
import ChatProfile from './chat/chat-main/ChatProfile';
import { fetchUserEducation } from '../../../redux/slices/user-education/userEducationSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { AppLoader } from '../../../components/AppLoader';
import { appColors } from '../../../utils/theme';
import CommunitySidebar from './CommunitySidebar';

const CommunityMember = () => {
  const [selectedMember, setSelectedMember] = useState<any>({});
  const useStyles = makeStyles({
    memberCommonText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
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
    membersNameText: {
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeight: '600 !important',
      color: '#152536 !important',
      marginRight: '10px !important'
    },
    membersButton: {
      borderRadius: '5px',
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: '600',
      // width: "62px",
      minWidth: '62px',
      height: '24px'
    },
    menberDetailsText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important'
    },
    memberChatBttn: {
      fontSize: '14px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#0082B6 !important',
      border: '1px solid #0082B6 !important',
      borderRadius: '29px !important'
    },
    memberHelpBtn: {
      fontSize: '13px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important',
      border: '1px solid  #CED4DA !important',
      borderRadius: '29px !important',
      height: '29px',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap'
    },
    priorHelpBtn: {
      fontSize: '13px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#fff !important',
      borderRadius: '16px !important',
      background: '#0071A9 !important',
      height: '29px',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap'
    },
    memberBoxSize: {
      background: '#fff',
      borderRadius: '8px',
      border: '1px solid #EFF0F4',
      margin: '16px 16px 16px 0'
    },
    memberWorkHistory: {
      fontFamily: 'Open Sans',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '22px',
      color: ' #68717A',
      fontStyle: 'italic'
    },
    memberLanguage: {
      fontFamily: 'Open Sans',
      fontWeight: '400',
      fontSize: '12px',
      color: '#152536'
    },
    filterAccordionDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px'
    },
    filterDetailsText: {
      FontFamily: 'Open Sans',
      fontWeight: '400!important',
      fontSize: '14px !important',
      color: '#68717A'
    },
    programPopupWrapper: {
      color: '#68717A',
      fontSize: '14px',
      fontFamily: 'Open Sans',
      fontWeigth: '400',
      marginBottom: '10px'
    },
    popupSummary: {
      FontFamily: 'Open Sans',
      fontWeight: '600 !important',
      fontSize: '16px !important',
      color: ' #152536'
    },
    programDialogTitle: {
      fontFamily: 'Open Sans',
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: '600 !important',
      color: '#152536'
    },
    chatPersonWrapper: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.1)'
      }
    },
    activeChatPersonWrapper: {
      backgroundColor: appColors.blue1
    }
  });

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const refrence: any = useRef(null);
  const { state } = useLocation();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const { user } = useAuth0();
  const { location } = getUserDetails();
  const orgId = user?.org_id || '';

  const [openFilter, setOpenFilter] = React.useState(false);
  const [role, setRole] = useState('');
  const [roleArr, setRoleArr] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [categoryArr, setCategoryArr] = useState<string[]>([]);
  const [mentee, setMentee] = useState(false);
  const [mentor, setMentor] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [student, setStudent] = useState(false);
  const [alumini, setAlumini] = useState(false);
  const [faculty, setFaculty] = useState(false);
  const [programFriend, setProgramFriend] = useState(false);
  const [programFriendCat, setProgramFriendCat] = useState(false);
  const [openChatWithMe, setOpenChatWithMe] = React.useState(false);
  const [allCommunityMembersList, setAllCommunityMembersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openBookTime, setOpenBookTime] = React.useState(false);

  const userWorkHistory = useAppSelector((state) => state.userWorkHistory);
  const userEducation = useAppSelector((state) => state.userEducation);

  useEffect(() => {
    setSelectedMember(state?.mem);
  }, [state]);

  useEffect(() => {
    setSelectedMember(state?.mem);
    setAllCommunityMembersList(state.allCommunityMembersList);
  }, []);

  useEffect(() => {
    fetchCommunityMembers(role, category);
  }, [role, category]);

  useEffect(() => {
    if (selectedMember?.userId) {
      dispatch(fetchUserWorkHistory(selectedMember?.userId));
      dispatch(fetchUserEducation(selectedMember?.userId));
    }
  }, [selectedMember]);

  useEffect(() => {
    refrence?.current && refrence?.current?.scrollIntoView();
  }, [refrence?.current]);

  const handleApply = () => {
    if (mentee) {
      roleArr?.push('mentee');
      setRoleArr(roleArr);
    }
    if (mentor) {
      roleArr?.push('mentor');
      setRoleArr(roleArr);
    }
    if (admin) {
      roleArr?.push('admin');
      setRoleArr(roleArr);
    }
    if (programFriend) {
      roleArr?.push('programFriends');
      setRoleArr(roleArr);
    } else {
      setRole('');
    }
    if (student) {
      categoryArr?.push('Student');
      setCategoryArr(categoryArr);
    }
    if (faculty) {
      categoryArr?.push('Faculty');
      setCategoryArr(categoryArr);
    }
    if (programFriendCat) {
      categoryArr?.push('Program Friend');
      setCategoryArr(categoryArr);
    }
    if (alumini) {
      categoryArr?.push('Alumni');
      setCategoryArr(categoryArr);
    } else {
      setCategory('');
    }
    setRole(roleArr.join(','));
    setCategory(categoryArr.join(','));
    handleCloseFilter();
  };

  const handleReset = () => {
    setMentee(false);
    setMentor(false);
    setAdmin(false);
    setStudent(false);
    setAlumini(false);
    setFaculty(false);
    setProgramFriend(false);
    setProgramFriendCat(false);
  };

  const handleClickOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setRoleArr([]);
    setCategoryArr([]);
    setOpenFilter(false);
  };

  const handleCloseChatWithMe = () => {
    setOpenChatWithMe(false);
  };

  const handleCloseBookTime = () => {
    setOpenBookTime(false);
  };

  const setMember = (mem: any) => {
    setSelectedMember(mem);
  };

  const onClickOnUserIcon = (mem: any) => {
    const userId = mem?.userId;
    dispatch(fetchUserEducation(userId?.trim()));
    dispatch(fetchUserWorkHistory(userId?.trim()));
  };
  const fetchCommunityMembers = async (role: string, category: string) => {
    try {
      const response = await API.getCommunityMembers(orgId, location, role, category);
      if (response.status === 200 && response.statusText === 'OK') {
        Array.isArray(response.data.memberResponse)
          ? setAllCommunityMembersList(response.data.memberResponse)
          : setAllCommunityMembersList([]);
        setLoading(false);
      } else {
        setAllCommunityMembersList([]);
        setLoading(true);
      }
    } catch (e) {
      setAllCommunityMembersList([]);
      setLoading(true);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', height: '90%', background: '#E5E5E5' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              sx={{
                background: '#fff',
                borderRight: '1px solid #EFF0F4',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              }}
            >
              <Box sx={{ padding: '16px' }} className={classes.memberCommonText}>
                <Typography
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#000'
                  }}
                >
                  Community
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>{`All (${allCommunityMembersList ? allCommunityMembersList?.length : 0})`}</Typography>
                  <img
                    src={Filter}
                    alt="filtericon"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '34px',
                      height: '34px',
                      cursor: 'pointer',
                      marginLeft: '10px'
                    }}
                    onClick={handleClickOpenFilter}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  // justifyContent:"space-evenly",
                  columnGap: '130px',
                  borderBottom: '1px solid #EFF0F4',
                  padding: '0 16px'
                }}
              >
                <Typography
                  style={{
                    borderBottom: '3px solid #DF6438',
                    color: '#152536',
                    paddingBottom: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    cursor: 'pointer'
                  }}
                >
                  All Members
                </Typography>
                <Typography
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    cursor: 'pointer',
                    color: ' #68717A'
                  }}
                >
                  Favorites
                </Typography>
              </Box>

              <Box
                className="scroll-channel"
                sx={{
                  overflowY: 'hidden',
                  height: 'calc(100vh - 201px)',
                  ':hover': {
                    overflow: 'overlay'
                  }
                }}
                width="100%"
              >
                {loading ? <AppLoader /> : ''}

                {allCommunityMembersList?.map((mem: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      <CommunitySidebar
                        mem={mem}
                        selectedMember={selectedMember}
                        onClickOnUserIcon={onClickOnUserIcon}
                        setMember={setMember}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>
            </Box>
          </Grid>
          <ChatProfile
            workHistory={userWorkHistory}
            educationDetails={userEducation}
            chatProfile={selectedMember}
            onCloseChatProfile={() => {}}
            setActiveChat={() => {}}
            parentComponent="CommunityMember"
          />
        </Grid>
      </Box>
      <div>
        <Dialog
          open={openFilter}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" className={classes.programDialogTitle}>
            Filter
            <IconButton style={{ float: 'right' }} onClick={handleCloseFilter}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: '0 !important' }}>
            <Box sx={{ padding: '0px' }}>
              <Accordion sx={{ padding: '0px !important' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.popupSummary}>Role</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}> Mentee</Typography>
                    <Checkbox
                      {...label}
                      // defaultChecked
                      checked={mentee}
                      onChange={() => {
                        setMentee(!mentee);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Mentor</Typography>
                    <Checkbox
                      {...label}
                      checked={mentor}
                      onChange={() => {
                        setMentor(!mentor);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Admin</Typography>
                    <Checkbox {...label} checked={admin} onChange={() => setAdmin(!admin)} />
                  </Box>

                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Program Friend</Typography>
                    <Checkbox
                      {...label}
                      checked={programFriend}
                      onChange={() => {
                        setProgramFriend(!programFriend);
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ padding: '0px !important' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.popupSummary}>Function</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <Grid container spacing={2}>
                    <Grid item md={12}>
                      <Box
                        border={`1px solid #EFF0F4`}
                        borderRadius={1}
                        display="flex"
                        alignItems={"center"}
                        width="100%"
                        // height={"20px"}
                        padding={1.2}
                      >
                        <SearchIcon
                          sx={{ color: appColors.gray4, marginRight: "10px" }}
                        />
                        <TextField
                          variant="standard"
                          placeholder="Search Dosen"
                          size="small"
                          type="text"
                          style={{
                            borderColor: "transparent",
                            padding: "0px !important",
                            margin: 0,
                            paddingBottom: 0,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid> */}
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>
                      {' '}
                      {/* Aeronautical Engineering. */}
                      Student
                    </Typography>
                    <Checkbox
                      {...label}
                      // defaultChecked
                      checked={student}
                      onChange={() => {
                        setStudent(!student);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Alumini</Typography>
                    <Checkbox
                      {...label}
                      checked={alumini}
                      onChange={() => {
                        setAlumini(!alumini);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Faculty</Typography>
                    <Checkbox
                      {...label}
                      checked={faculty}
                      onChange={() => {
                        setFaculty(!faculty);
                      }}
                    />
                  </Box>
                  <Box className={classes.filterAccordionDetails}>
                    <Typography className={classes.filterDetailsText}>Program Friend</Typography>
                    <Checkbox
                      {...label}
                      checked={programFriendCat}
                      onChange={() => {
                        setProgramFriendCat(!programFriendCat);
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions
            style={{
              justifyContent: 'center',
              padding: '5px 24px 20px',
              marginBottom: '10px'
            }}
          >
            <Button
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: '700',
                color: ' #68717A',
                border: '1px solid #68717A',

                borderRadius: '8px',
                background: '#fff',
                // width: "270px",
                height: '45px'
              }}
              fullWidth
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: '700',
                color: '#fff',
                background: '#152536',
                borderRadius: '8px',
                width: '560px',
                height: '45px'
              }}
              onClick={handleApply}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={openChatWithMe}
          onClose={handleCloseChatWithMe}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-title"
            className={classes.membersNameText}
            sx={{ textAlign: 'center', fontSize: '22px !important' }}
          >
            Message
            <IconButton style={{ float: 'right' }} onClick={handleCloseChatWithMe}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container>
              <Grid item lg={12}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    paddingBottom: '6px',
                    fontSize: '16px',
                    fontWeight: '700',
                    fontFamily: 'Open Sans',
                    color: '#152536'
                  }}
                >
                  Message
                </InputLabel>
                <Box
                  sx={{
                    border: '1px solid #DEE2E6',
                    borderRadius: '8px',
                    height: '125px',
                    padding: '16px'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Open Sans',
                      color: '#b7bec5'
                    }}
                  >
                    Write something to Ronan
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            style={{
              width: '',
              height: '50px',
              justifyContent: 'center',
              padding: ' 10px 24px',
              margin: '15px 0'
            }}
          >
            <Button
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '700',
                color: '#68717A',
                background: '#fff',
                borderRadius: '8px',
                width: '560px',
                height: '50px',
                border: '1px solid #68717A'
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: '700',
                color: '#fff',
                background: '#152536',
                borderRadius: '8px',
                width: '560px',
                height: '50px'
              }}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={openBookTime}
          onClose={handleCloseBookTime}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to Google, even when
              no apps are running.3
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBookTime}>Disagree</Button>
            <Button onClick={handleCloseBookTime} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default CommunityMember;
