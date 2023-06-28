/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, Grid, Dialog, Button, Divider, Typography, IconButton, DialogTitle, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import groupprogram from '../../../../assets/images/groupprogram.svg';
import circleicon from '../../../../assets/images/circleicon.svg';
import chaticon from '../../../../assets/images/chaticon.svg';
import celendericon from '../../../../assets/images/celendericon.svg';
import Trophybadge from '../../../../assets/images/Trophybadge.svg';
import greencheckimg from '../../../../assets/images/greencheckimg.svg';
import greycheckimg from '../../../../assets/images/greycheckimg.svg';
import halfcircleimg from '../../../../assets/images/halfcircleimg.svg';
import flagimg from '../../../../assets/images/flagimg.svg';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ChatAvatarComponent from '../chat/ChatAvatarComponent';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { chatProfileActions } from '../../../../redux/slices/chat-profile/chatProfileSlice';
import AvatarRow from './Avatars';
import SchedulecallTable from '../calls/SchedulecallTable';

import axios from 'axios';

import { toast } from 'react-toastify';
import { API } from '../../../../api';
import { AppLoader } from '../../../../components/AppLoader';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserDetails } from '../../../../utils/orgName';
import { MyCardBox, MyCardHeading } from '../../style-components/CardStyling';

import MyMentorCard from './MyMentorCard';

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

const Mentee = () => {
  // const usageStyle = {
  //   fontWeigth: "400",
  //   color: "#152536",
  //   fontSize: "14px",
  //   fontFamily: "Open Sans",
  // };
  // const { state } = useLocation();
  const useStyles = makeStyles({
    cardHeading: {
      color: '#000000 !important',
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '600 !important',
      padding: '16px'
    },
    profileHeading: {
      color: '#152536 !important',
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '600 !important'
    },
    officerHeading: {
      color: '#68717A !important',
      fontSize: '14px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '400 !important',
      whiteSpace: 'nowrap'
    },
    greenText: {
      color: '#11895E !important',
      fontSize: '12px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '600 !important'
    },
    alumniButton: {
      color: '#C7A429',
      fontSize: '12px',
      fontWeight: '600',
      fontFamily: 'Open Sans',
      border: '1px solid #C7A429',
      borderRadius: '5px',
      width: '54px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    numberButton: {
      display: 'flex',
      alignItems: 'center',
      columnGap: '5px',
      border: '1px solid #11895E',
      borderRadius: '5px',
      width: '44px',
      height: '24px',
      justifyContent: 'center'
    },
    memberChatBttn: {
      fontSize: '14px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#0082B6 !important',
      border: '1px solid #0082B6 !important',
      borderRadius: '29px !important',
      whiteSpace: 'nowrap'
    },
    levelText: {
      color: '#0082B6 !important',
      fontSize: '14px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '400 !important',
      width: '250px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
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
    menberDetailsText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important',
      whiteSpace: 'nowrap'
    },
    membersNameText: {
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeight: '600 !important',
      color: '#152536 !important',
      marginRight: '10px !important',
      whiteSpace: 'nowrap'
    },
    membersButton: {
      borderRadius: '5px',
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontWeight: '600',
      minWidth: '62px',
      height: '24px'
    }
  });
  const { user } = useAuth0();
  const orgId: string = user?.org_id || '';
  const { location } = getUserDetails();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [peersList, setPeersList] = useState<any>();
  const [myMentorsList, setMyMentorsList] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

  const personalThreadsArr = useAppSelector((state) => state.acsChannels.personalThreadsArr);
  const userDetails = useAppSelector((state) => state.userProfile);

  const groupId = _.get(userDetails, 'data.mentee[0]', '');

  useEffect(() => {
    if (groupId !== '') {
      getMyMentorsList({ orgId, groupId });
    }
  }, []);

  /** Taking all mentees headshots */
  const avatars: any = peersList?.members?.map((each: any) => each?.headshot);

  useEffect(() => {
    getUserCommunityPeersList(orgId, location);
  }, []);

  useEffect(() => {
    if (selectedMember) {
      navigateToChat();
    }
  }, [selectedMember]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserCommunityPeersList = async (orgId: string, location: string) => {
    try {
      const response = await API.getUserCommunityPeersList(orgId, location);
      if (response.status === 200 && response.statusText === 'OK') {
        setPeersList(response?.data?.memberResponse);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error('Failed to get Peers List');
      }
    } catch (e) {
      setLoading(false);
      toast.error('Failed to get Peers List');
    }
  };

  const getMyMentorsList = async ({ orgId, groupId }: { orgId: string; groupId: string }) => {
    try {
      const response = await API.getMyMentors({ orgId, groupId });
      if (response.status === 200 && response.statusText === 'OK') {
        setMyMentorsList(response?.data?.data);
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

  const getName = (each: any) => {
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

  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      <Box className="bodyBox">
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={6}>
            <MyCardBox>
              <MyCardHeading sx={{ mb: 1 }}>My Goal</MyCardHeading>
              <Divider />
              <Box
                sx={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    borderRight: '1px solid #EFF0F4',
                    paddingRight: '20px'
                  }}
                >
                  <img
                    src={groupprogram}
                    alt="groupprogram"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '165px',
                      height: '165px'
                    }}
                  />
                </Box>
                <Box sx={{ paddingLeft: '20px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={circleicon}
                      alt="logo"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: '50px',
                        height: '50px'
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#152536',
                        fontSize: 40,
                        fontFamily: ' Open Sans',
                        fontWeight: 700,
                        textAlign: 'center',
                        marginLeft: 10
                      }}
                    >
                      {peersList?.members?.length}
                      <sub
                        style={{
                          fontSize: 14,
                          color: '#68717A',
                          marginLeft: 10
                        }}
                      >
                        Peers
                      </sub>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '15px'
                    }}
                  >
                    {/* <img
                      //src={imageElement}
                      src={frameimg}
                      alt="frameimg"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: "120px",
                        height: "64px",
                        //cursor: "pointer",
                      }}
                      //onClick={handleClickOpen}
                    /> */}
                    <AvatarRow avatars={avatars} />
                    <span
                      style={{
                        color: ' #0071A9',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Open Sans',
                        marginLeft: '10px',
                        cursor: 'pointer',
                        fontStyle: 'italic'
                      }}
                      onClick={handleClickOpen}
                    >
                      View all peers
                    </span>
                  </Box>
                </Box>
              </Box>
            </MyCardBox>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            {/* If this User have mentor */}
            <MyCardBox>
              <MyCardHeading sx={{ mb: 1 }}>My Mentors</MyCardHeading>
              <Divider />
              <MyMentorCard myMentorList={myMentorsList} />
            </MyCardBox>
          </Grid>
        </Grid>

        {/* My Goals sections */}
        <Box
          sx={{
            background: '#FFFFFF',
            border: '1px solid #EFF0F4',
            borderRadius: '8px',
            marginTop: '20px'
          }}
        >
          <Typography className={classes.cardHeading} sx={{ fontWeight: '600' }}>
            My Goal
          </Typography>
          <Divider />
          <Box sx={{ padding: '16px' }}>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6}>
                <Box
                  sx={{
                    border: '1px solid #EFF0F4',
                    borderRadius: '8px',
                    background: '#fff',
                    minHeight: '290px',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '8px 8px 0 0',
                      borderTop: '10px solid #0082B6'
                    }}
                  />
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px'
                      }}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            fontFamily: 'Open Sans',
                            color: '#ABB5BE',
                            marginBottom: '5px'
                          }}
                        >
                          Level 1
                        </Typography>
                        <Typography
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            fontFamily: 'Open Sans',
                            color: '000'
                          }}
                        >
                          Understanding your goal
                        </Typography>
                      </Box>
                      <img
                        src={Trophybadge}
                        alt="Trophybadge"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: '35px',
                          height: '35px'
                        }}
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ padding: '16px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greencheckimg}
                          alt="greencheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />

                        <Typography
                          sx={{
                            fontFamily: 'Open Sans',
                            fontSize: '14px',
                            fontWeight: '400',
                            color: '#6C757D',
                            w: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Complete onboarding
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={halfcircleimg}
                          alt="halfcircleimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: 'Open Sans',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#0082B6',
                            w: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Identify industries you could work in
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Identify desirable jobs within your industry
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Create a target company list
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px'
                        }}
                      >
                        <img
                          src={flagimg}
                          alt="flagimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Check-in with mentor
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={4} md={6} sm={6}>
                <Box
                  sx={{
                    border: '1px solid #EFF0F4',
                    borderRadius: '8px',
                    background: '#fff',
                    minHeight: '290px',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '8px 8px 0 0',
                      borderTop: '10px solid #ABB5BE'
                    }}
                  />
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px'
                      }}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            fontFamily: 'Open Sans',
                            color: '#ABB5BE',
                            marginBottom: '5px'
                          }}
                        >
                          Level 2
                        </Typography>
                        <Typography
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            fontFamily: 'Open Sans',
                            color: '000'
                          }}
                        >
                          Do the groundwork
                        </Typography>
                      </Box>
                      <img
                        src={Trophybadge}
                        alt="Trophybadge"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: '35px',
                          height: '35px'
                        }}
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ padding: '16px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Complete your Experience Assessment
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Applying research and analysis skills
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Culture and diversity in the workplace
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Problem solving and critical thinking
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px'
                        }}
                      >
                        <img
                          src={flagimg}
                          alt="flagimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Check-in with mentor
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={4} md={6} sm={6}>
                <Box
                  sx={{
                    border: '1px solid #EFF0F4',
                    borderRadius: '8px',
                    background: '#fff',
                    minHeight: '290px',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '8px 8px 0 0',
                      borderTop: '10px solid #ABB5BE'
                    }}
                  />
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px'
                      }}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            fontFamily: 'Open Sans',
                            color: '#ABB5BE',
                            marginBottom: '5px'
                          }}
                        >
                          Level 3
                        </Typography>
                        <Typography
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            fontFamily: 'Open Sans',
                            color: '000'
                          }}
                        >
                          Start the search
                        </Typography>
                      </Box>
                      <img
                        src={Trophybadge}
                        alt="Trophybadge"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: '35px',
                          height: '35px'
                        }}
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ padding: '16px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Complete your Brand Assessment
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Optimize your resume to achieve your goal
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Polish your social media presence
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px',
                          marginBottom: '15px'
                        }}
                      >
                        <img
                          src={greycheckimg}
                          alt="greycheckimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Build a professional network
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          columnGap: '15px'
                        }}
                      >
                        <img
                          src={flagimg}
                          alt="flagimg"
                          style={{
                            padding: 0,
                            margin: 0,
                            width: '20px',
                            height: '20px'
                          }}
                        />
                        <Typography
                          className={classes.levelText}
                          sx={{
                            fontWeight: '400'
                          }}
                        >
                          Check-in with mentor
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Group of Peers Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
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
          Group of Peers
          <IconButton onClick={handleClose} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: '5px 20px' }}>
          {peersList?.members?.map((each: any) => {
            let cat: any = each?.category;

            return (
              <Box
                sx={{
                  display: 'flex',
                  borderBottom: '1px solid #EFF0F4',
                  padding: '13px'
                }}
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
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography className={classes.membersNameText}>
                          {/* Amy Rodriguez */}
                          {/* {each.displayName} */}
                          {getName(each)}
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
                        <Typography className={classes.menberDetailsText}>
                          {/* 4th year */}
                          {each?.bio?.education?.major.concat(',') || each?.bio?.workHistory?.role.concat(',')}
                        </Typography>
                        <Typography className={classes.menberDetailsText}>
                          {/* {each?.bio?.education?.major && <FiberManualRecordIcon
                            sx={{
                              fontSize: "6px",
                              margin: "0 5px",
                              cursor: "pointer",
                            }}
                          />} */}
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
                        onClick={(event) => {
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

          {/*              
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #EFF0F4",
              padding: "13px",
              // maxWidth: "360px",
            }}
          >
          <Box
            sx={{
              display: "flex",
              padding: "13px",
            }}
          >
            <Box sx={{ marginRight: "8px" }}>
              <Box className={classes.memberCircleImage}>
                <Box className={classes.memberCircleInner}>
                  <img
                    src={womenimg}
                    alt="womencircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexGrow: "1",
                }}
              >
                <Box sx={{ width: "220px" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography className={classes.membersNameText}>
                      Amy Rodriguez
                    </Typography>
                    <Button
                      className={classes.membersButton}
                      style={{
                        border: " 1px solid #2955C7",
                        textTransform: "capitalize",
                        color: "#2955C7",
                      }}
                    >
                      Student
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Typography className={classes.menberDetailsText}>
                      Vice President, User Experience, Company LLC
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "15px",
                  }}
                >
                  <img
                    src={chaticon}
                    alt="chaticon"
                    style={{
                      padding: 0,
                      width: "21px",
                      height: "21px",
                      marginRight: "10px!important",
                    }}
                  />
                  <img
                    src={celendericon}
                    alt="celendericon"
                    style={{
                      padding: 0,

                      width: "19px",
                      height: "19px",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Mentee;
