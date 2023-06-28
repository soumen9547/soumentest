/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, SyntheticEvent, useState } from 'react';
import { Grid, Box, Divider, Typography, IconButton, Stack, Button, Dialog, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import chaticon from '../../../../../assets/images/chaticon.svg';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import celendericon from '../../../../../assets/images/celendericon.svg';
import { appColors, chatFonts } from '../../../../../utils/theme';
import _ from 'lodash';
import ChatProfileButton from '../../../../../components/ui/Buttons/ChatProfileButton';
import { BsChatTextFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { chatProfileActions } from '../../../../../redux/slices/chat-profile/chatProfileSlice';
import ChatAvatarComponent from '../ChatAvatarComponent';
import { userEducationActions } from '../../../../../redux/slices/user-education/userEducationSlice';
import { userWorkHistoryActions } from '../../../../../redux/slices/user-work/userWorkHistorySlice';
import { Social } from '../../../components/SocialHandles';
import ChatNotification from '../ChatNotification';
import CallBookingCalendar from '../../CallBookingClender';
// import detailsv from "../../../../../assets/images/detailsv.svg";
import { ChatStyle, ItemsButton, ChatProfileSubText, ChatProfileHeadings } from '../ChatStyling';
// import { getUserDetails } from "../../../../../utils/orgName";
// import instantCallEvent from "../../instantCallEvent";

interface IChatProfile {
  chatProfile: any;
  onCloseChatProfile: () => void;
  workHistory: any;
  educationDetails: any;
  setActiveChat: any;
  parentComponent: string;
}

const ChatProfile: React.FC<IChatProfile> = ({
  chatProfile,
  onCloseChatProfile,
  workHistory,
  educationDetails,
  setActiveChat,
  parentComponent
}) => {
  // console.log(chatProfile, 'chatProfilee');
  const handleBookIconClick = async (param: any) => {
    // console.log('Clicked BookIcon:', param);
    setCalendarOpen(true);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const personalThreadsArr = useAppSelector((state) => state.acsChannels.personalThreadsArr);
  const chatProfileFirstName = _.get(chatProfile, 'id.firstName', '');

  const classes = ChatStyle();
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  // const [isCallActive, setCallActive] = useState(false);
  // const [zoomCallProps, setZoomCallProps] = useState({
  //   base_url: '',
  //   meetingId: '',
  //   unix_time: 0,
  //   userName: ''
  // });

  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };
  const cat: any = chatProfile?.id?.category;

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
  // console.log(chatProfile?.digital_intro);
  const data = chatProfile?.id?.social;

  const navigateToChat = () => {
    let communicationId = _.get(chatProfile, 'id.communicationUserId', '');
    if (!communicationId) {
      communicationId = _.get(chatProfile, 'id.communicationId', '');
    }
    const channel = personalThreadsArr?.find((each) => each?.displayNames?.includes(communicationId));
    dispatch(chatProfileActions.atnSetChatProfileState(null));
    dispatch(userEducationActions.clearEducation(null));
    dispatch(userWorkHistoryActions.clearWorkHistory(null));
    setActiveChat('Chats');
    if (communicationId && channel) {
      navigate(`/app/chat/?threadid=${_.get(channel, 'id')}&type=Chats&name=${_.get(channel, 'topic')}`);
    } else if (communicationId && !channel) {
      navigate(`/app/chat/?commId=${communicationId}`);
    }
  };

  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>, displayName: string) => {
    event.currentTarget.src = `https://ui-avatars.com/api/?name=${displayName}`;
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
      if (parentComponent === 'chatMain') {
        return <ChatProfileSubText>No Social Handles</ChatProfileSubText>;
      } else {
        return <Typography p={2}>No Social Handles</Typography>;
      }
    }

    if (parentComponent === 'chatMain') {
      return <ChatProfileSubText>No Social Handles</ChatProfileSubText>;
    }

    return <Typography p={2}>No Social Handles</Typography>;
  };

  const getSocialHandles = () => {
    if (data) {
      const keys = Object.keys(data);
      const newArray: any = [];
      socialIconsArray?.forEach((each) => {
        if (keys?.includes(each.name) && data[each.name]) {
          newArray?.push(
            <IconButton key={each.id}>
              <a style={{ lineHeight: 0 }} href={data[each.name]}>
                {each.icon}
              </a>
            </IconButton>
          );
        }
      });
      if (newArray?.length > 0) {
        return newArray;
      }
    }
  };

  const getBio = () => {
    const category: any = chatProfile?.id?.category;
    const major: any = chatProfile?.bio?.education?.major;
    const university: any = chatProfile?.bio?.education?.university;
    const role: any = chatProfile?.bio?.workHistory?.role;
    const company: any = chatProfile?.bio?.workHistory?.companyName;

    return category === 'Student' ? (
      <Typography
        sx={{
          fontSize: chatFonts.md,
          fontFamily: 'Open Sans',
          fontWeight: '400',
          color: '#68717A'
        }}
      >
        {major
          ?.split(' ')
          ?.map((each: any) => each.charAt(0).toUpperCase().concat(each?.slice(1).toLowerCase()))
          .join(' ')
          .concat(', ')}
        {university
          ?.split(' ')
          ?.map((each: any) => each.charAt(0).toUpperCase().concat(each?.slice(1)))
          ?.join(' ')}
      </Typography>
    ) : (
      <Typography
        sx={{
          fontSize: chatFonts.md,
          fontFamily: 'Open Sans',
          fontWeight: '400',
          color: '#68717A'
        }}
      >
        {role
          ?.split(' ')
          ?.map((each: any) => each.charAt(0).toUpperCase().concat(each?.slice(1)))
          .join(' ')
          ?.concat(', ')}

        {company
          ?.split(' ')
          ?.map((each: any) => each.charAt(0).toUpperCase().concat(each?.slice(1)))
          ?.join(' ')}
      </Typography>
    );
  };

  const getName = () => {
    const chatProfileFirstName: any = _.get(chatProfile, 'id.firstName', '');
    const chatProfileLastName: any = _.get(chatProfile, 'id.lastName', '');
    return chatProfileFirstName
      ?.charAt(0)
      ?.toUpperCase()
      ?.concat(chatProfileFirstName?.slice(1)?.toLowerCase())
      .concat(' ', chatProfileLastName?.charAt(0)?.toUpperCase()?.concat(chatProfileLastName?.slice(1)?.toLowerCase()));
  };

  return parentComponent === 'chatMain' || parentComponent === 'programUserDetails' ? (
    <Grid item xs>
      <Box className={classes.chatProfileBox}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" p={1}>
          <Typography className={classes.profileBoxHeading}>Profile Details</Typography>
          <IconButton onClick={onCloseChatProfile}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />
        <Box
          sx={{
            height: 'calc(100vh - 180px)',
            overflow: 'auto',
            padding: '6px'
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={0.5}
            sx={{ padding: '10px 0' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                columnGap: '5px'
              }}
            >
              <ChatAvatarComponent
                height="48px"
                width="48px"
                image={_.get(chatProfile, 'id.headshot', '')}
                firstLetter={chatProfileFirstName?.slice(0, 1)}
              />
              <Box>
                <Stack direction="row" alignItems="center">
                  <ChatProfileHeadings>{getName()}</ChatProfileHeadings>
                  <Box ml={0.75}>
                    <ChatNotification />
                  </Box>
                </Stack>
                <Box>{getBio()}</Box>
                <Button
                  sx={{
                    marginTop: '5px',
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
                <Box pt={1}>{getSocialHandles()}</Box>
              </Box>
            </Box>
            {/* <Box>
              {" "}
              <img src={detailsv} style={{ width: "19px", height: "19px" }} alt="share"/>
            </Box> */}
          </Stack>
          <Divider />
          <Box sx={{ padding: '5px 10px' }}>
            {/* Video and Photo */}
            <Box>
              {parentComponent === 'chatMain' && chatProfile?.digital_intro?.videoUrl !== '' ? (
                <video
                  src={chatProfile?.digital_intro}
                  key={chatProfile?._id}
                  controls
                  style={{
                    padding: '10px 0',
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 8px 8px'
                  }}
                />
              ) : parentComponent === 'chatMain' && chatProfile?.digital_intro?.videoUrl === '' ? (
                // {_.get(chatProfile, "id.headshot", "") ? (
                <img
                  src={_.get(chatProfile, 'id.headshot', '')}
                  alt="profile"
                  style={{
                    margin: 0,
                    width: '100%',
                    objectFit: 'cover',
                    height: '100%',
                    padding: '10px 0',
                    borderRadius: '8px 8px 8px 8px'
                  }}
                />
              ) : parentComponent === 'programUserDetails' && chatProfile?.digital_intro !== '' ? (
                <video
                  src={chatProfile?.digital_intro}
                  key={chatProfile?._id}
                  controls
                  style={{
                    padding: '10px 0',
                    margin: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 8px 8px'
                  }}
                />
              ) : (
                <img
                  src={_.get(chatProfile, 'id.headshot', '')}
                  alt="profile"
                  style={{
                    margin: 0,
                    width: '100%',
                    objectFit: 'cover',
                    height: '100%',
                    padding: '10px 0',
                    borderRadius: '8px 8px 8px 8px'
                  }}
                />
              )}
            </Box>
            {/* Button area */}
            <Stack direction="column" spacing={1}>
              {/* Chat Profile Button */}
              <Stack direction="row" width="100%">
                <ChatProfileButton title="Chat with me" icon={<BsChatTextFill />} onClick={navigateToChat} />
              </Stack>
              {/* Book a time btn */}
              <Button
                sx={{ textTransform: 'capitalize' }}
                className={classes.memberChatBttn}
                // onClick={handleClickOpenBookTime}
              >
                <Box sx={{ marginRight: '10px' }}>
                  <img
                    src={celendericon}
                    alt="celendericon"
                    style={{
                      padding: 0,
                      width: '16px',
                      height: '16px'
                    }}
                  />
                </Box>
                Book a time
              </Button>
            </Stack>
            {/*  */}
            <Box mt={2}>
              {/* I can help you with */}
              <Box sx={{ padding: '10px 0' }}>
                <ChatProfileHeadings pb={1}>I can help you with :</ChatProfileHeadings>
                <ChatProfileSubText>Not yet for now</ChatProfileSubText>
                {/* <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {["Weaknesses", "Cover letter", "Resume", "Grit", "LinkedIn",
                    "Work experience", "Strengths", "Interview skills",
                    ].map((each, idx) => (
                    <ItemsButton key={idx}>{each}</ItemsButton>
                  ))}
                </Stack> */}
              </Box>
              <Divider />
              {/* Experience */}
              <Box sx={{ padding: '10px 0' }}>
                <ChatProfileHeadings>Experience :</ChatProfileHeadings>
                {_.get(workHistory, 'data')?.length ? (
                  <Box>
                    {(Array.isArray(_.get(workHistory, 'data')) ? _.get(workHistory, 'data') : [])?.map(
                      (each: any, idx: any) => {
                        return (
                          <React.Fragment key={idx}>
                            {/* <Box sx={{ marginRight: "2px" }}>
                            <IconButton>
                              <img
                                src={logo}
                                alt="logo"
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  width: "33px",
                                  height: "33px",
                                }}
                              />
                            </IconButton>
                          </Box> */}
                            <Box>
                              <Box className={classes.profileBoxHeading2}>{_.get(each, 'title', '')}</Box>
                              <Box className={classes.profileBoxItalic}>
                                {[_.get(each, 'company_name'), _.get(each, 'industry')]
                                  ?.filter((each) => _.size(each))
                                  .join(', ')}
                              </Box>
                            </Box>
                          </React.Fragment>
                        );
                      }
                    )}
                  </Box>
                ) : (
                  <ChatProfileSubText>No Work History</ChatProfileSubText>
                )}
              </Box>
              <Divider />
              {/* Hobbies and interests */}
              <Box sx={{ padding: '10px 0' }}>
                <ChatProfileHeadings mb={1}>Hobbies and interests :</ChatProfileHeadings>
                {chatProfile?.id?.hobbies?.length ? (
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {chatProfile?.id?.hobbies?.map((each: any, index: any) => {
                      return <ItemsButton key={index}>{each}</ItemsButton>;
                    })}
                  </Stack>
                ) : (
                  <ChatProfileSubText>No Hobbies</ChatProfileSubText>
                )}
              </Box>
              <Divider />
              {/* Education */}
              <Box sx={{ padding: '10px 0' }}>
                <ChatProfileHeadings pb={1}>Education :</ChatProfileHeadings>
                {_.get(educationDetails, 'data')?.length ? (
                  <Box>
                    {(Array.isArray(_.get(educationDetails, 'data')) ? _.get(educationDetails, 'data') : [])?.map(
                      (eachData: any, ind: any) => {
                        return (
                          <React.Fragment key={ind}>
                            <Box display="flex">
                              {/* <Box sx={{ marginRight: "2px" }}>
                              <IconButton>
                                <img
                                  src={Universityicon}
                                  alt=""
                                  style={{
                                    padding: 0,
                                    margin: 0,
                                    width: "42px",
                                    height: "49px",
                                  }}
                                />
                              </IconButton>
                            </Box> */}
                              <Box>
                                <Box className={classes.profileBoxHeading2}>
                                  {_.capitalize(_.get(eachData, 'university'))}
                                </Box>
                                <Box className={classes.profileBoxItalic}>
                                  {[_.get(eachData, 'department'), _.get(eachData, 'minor'), _.get(eachData, 'major')]
                                    ?.filter((each) => _.size(each))
                                    .join(', ')}
                                </Box>
                              </Box>
                            </Box>
                          </React.Fragment>
                        );
                      }
                    )}
                  </Box>
                ) : (
                  <ChatProfileSubText>No Education details</ChatProfileSubText>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  ) : (
    <Grid item xs={8} style={{ height: '100%' }}>
      <Box sx={{ height: 'calc(100vh - 85px)', overflow: 'auto' }}>
        <Box
          sx={{
            background: '#FFFFFF',
            border: '1px solid #EFF0F4',
            borderRadius: '8px',
            margin: '16px 16px 16px 0'
          }}
        >
          <Box
            sx={{
              borderBottom: '1px solid #EFF0F4',
              padding: '16px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '15px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '15px'
                  }}
                >
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    <Box className={classes.memberCircleInner}>
                      <img
                        src={
                          chatProfile?.id?.headshot
                            ? chatProfile.id.headshot
                            : `https://ui-avatars.com/api/?name=${chatProfile?.id?.firstName}`
                        }
                        alt="womencircle"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '15px'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Open Sans !important',
                        fontSize: '24px !important',
                        fontWeight: '600 !important',
                        color: appColors.ChatTitle
                      }}
                    >
                      {getName()}
                    </Typography>
                    {/* <Box
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    border={`1px solid ${appColors.gray1}`}
                    borderRadius={2}
                    height="23px"
                    marginRight={1}
                    width="45px"
                  >
                    <img
                      src={favicon}
                      style={{ width: "14px", height: "14px" }}
                      alt="logo"
                    />
                    <Typography
                      sx={{
                        fontFamily: "Open Sans",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      98
                    </Typography>
                  </Box> */}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {getBio()}
                    <Typography className={classes.menberDetailsText}>
                      {/* <FiberManualRecordIcon
                      sx={{
                        fontSize: "6px",
                        cursor: "pointer",
                        margin: "0 5px",
                      }}
                        /> */}
                    </Typography>
                  </Box>
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
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                {/* <Box sx={{ marginBottom: "10px" }}>
                <img
                  src={starimg}
                  alt="starimg"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: "34px",
                    height: "34px",
                    objectFit: "cover",
                  }}
                />
              </Box> */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      style={{ textTransform: 'capitalize' }}
                      className={classes.memberChatBttn}
                      onClick={navigateToChat}
                    >
                      <Box sx={{ marginRight: '10px' }}>
                        <img
                          src={chaticon}
                          alt="chaticon"
                          style={{
                            padding: 0,
                            width: '21px',
                            height: '21px',
                            marginRight: '10px!important'
                          }}
                        />
                      </Box>
                      Chat with me
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      style={{ textTransform: 'capitalize' }}
                      className={classes.memberChatBttn}
                      onClick={handleBookIconClick}
                    >
                      <Box sx={{ marginRight: '10px' }}>
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
                      Book a time
                    </Button>
                  </Box>
                  <Dialog
                    open={isCalendarOpen}
                    onClose={handleCalendarClose}
                    scroll="body"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                  >
                    <DialogTitle id="alert-dialog-title" className="DialogTitle">
                      Schedule Time with {chatProfile.displayName}
                      <IconButton onClick={handleCalendarClose} sx={{ float: 'right' }}>
                        <Close />
                      </IconButton>
                    </DialogTitle>
                    <CallBookingCalendar
                      onClose={handleCalendarClose}
                      channelNaame={chatProfile.displayName}
                      threadParticipantsUsers={[chatProfile]}
                      chatType="Chats"
                      pageName="Community"
                    />
                  </Dialog>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: '16px', marginBottom: '15px' }}>
            {chatProfile?.digital_intro?.videoUrl ? (
              <video
                src={chatProfile?.digital_intro?.videoUrl}
                key={chatProfile?.digital_intro}
                controls
                style={{
                  padding: 0,
                  margin: 0,
                  width: '560px',
                  height: '310px',
                  cursor: 'pointer',
                  objectFit: 'contain',
                  borderRadius: '8px 8px 8px 8px'
                }}
              />
            ) : (
              <img
                src={
                  chatProfile?.id?.headshot
                    ? chatProfile?.id?.headshot
                    : `https://ui-avatars.com/api/?name=${chatProfile?.id?.firstName}`
                }
                onError={(e) => addImageFallback(e, chatProfile?.id?.firstName)}
                alt="ronanprofile"
                style={{
                  padding: 0,
                  margin: 0,
                  width: '560px',
                  height: '310px',
                  cursor: 'pointer',
                  borderRadius: '8px 8px 8px 8px'
                }}
              />
            )}
            <Typography className={classes.membersNameText} sx={{ margin: '15px 0' }}>
              I can help you with:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '10px'
              }}
            >
              <ChatProfileSubText>Not yet for now</ChatProfileSubText>
              {/* <Button className={classes.memberHelpBtn}>
              Weaknesses
            </Button>
            <Button className={classes.memberHelpBtn}>
              Cover letter
            </Button>
            <Button className={classes.memberHelpBtn}>Resume</Button>

            <Button className={classes.memberHelpBtn}>Grit</Button>
            <Button className={classes.memberHelpBtn}>LinkedIn</Button>

            <Button className={classes.memberHelpBtn}>
              Work experience
            </Button>
            <Button className={classes.memberHelpBtn}>Strengths</Button>
            <Button className={classes.memberHelpBtn}>
              Interview skills
            </Button> */}
            </Box>
            <Typography className={classes.membersNameText} sx={{ margin: '15px 0 10px' }}>
              Prior Dosen program experience
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '15px'
              }}
            >
              Still Learning
              {/* <Button className={classes.priorHelpBtn}>
              First Year Students program 2021
            </Button>
            <Button className={classes.priorHelpBtn}>
              First Year Students program 2022
            </Button>
            <Button className={classes.priorHelpBtn}>
              First Year Students program 2023
            </Button> */}
            </Box>
          </Box>
        </Box>

        <Box className={classes.memberBoxSize}>
          <Typography className={classes.membersNameText} sx={{ padding: '16px' }}>
            Work history
          </Typography>
          <Divider />

          {_.get(workHistory, 'data')?.length ? (
            <Box
              sx={{
                padding: '16px'
              }}
            >
              {(Array.isArray(_.get(workHistory, 'data')) ? _.get(workHistory, 'data') : [])?.map(
                (each: any, ind: any) => {
                  return (
                    <React.Fragment key={ind}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          paddingBottom: '10px'
                        }}
                      >
                        {/* <IconButton>
                    <img
                      src={favicon}
                      alt="favicon"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: "25px",
                        height: "25px",
                      }}
                    />
                   </IconButton> */}

                        <Box sx={{ width: '100%' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start'
                            }}
                          >
                            <Box sx={{ marginBottom: '10px' }}>
                              <Box className={classes.membersNameText}>{each.company_name}</Box>
                              <Box className={classes.memberWorkHistory}>{each.title}</Box>
                            </Box>
                            <Box>
                              <Box className={classes.memberWorkHistory} style={{ marginRight: '50px' }}>
                                {each.start_date} - {each.end_date ? each.end_date : 'Present'}
                              </Box>
                            </Box>
                          </Box>

                          <Box
                            className={classes.membersNameText}
                            sx={{
                              color: '#0082B6'
                            }}
                          />
                          <Box className={classes.memberWorkHistory}>{each.industry}</Box>
                        </Box>
                      </Box>
                    </React.Fragment>
                  );
                }
              )}
            </Box>
          ) : (
            <Box
              sx={{
                padding: '16px'
              }}
            >
              No Work History
            </Box>
          )}
        </Box>
        <Box className={classes.memberBoxSize}>
          <Typography className={classes.membersNameText} sx={{ padding: '16px' }}>
            Education and Skills
          </Typography>
          <Divider />
          {_.get(educationDetails, 'data')?.length ? (
            <Box
              sx={{
                padding: '16px'
              }}
            >
              {(Array.isArray(_.get(educationDetails, 'data')) ? _.get(educationDetails, 'data') : [])?.map(
                (each: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          paddingBottom: '10px'
                        }}
                      >
                        {/* <IconButton>
                    <img
                      src={Universityicon}
                      alt="Universityicon"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: "25px",
                        height: "25px",
                      }}
                    />
                   </IconButton> */}

                        <Box sx={{}}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start'
                            }}
                          >
                            <Box sx={{ marginBottom: '10px' }}>
                              <Box className={classes.membersNameText}>{each.university}</Box>
                              <Box className={classes.memberWorkHistory}>
                                {each.major}, {each.minor}
                              </Box>
                              <Box className={classes.memberWorkHistory}>
                                {new Date(each.graduation_date).getFullYear()}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </React.Fragment>
                  );
                }
              )}
            </Box>
          ) : (
            <Box
              sx={{
                padding: '16px'
              }}
            >
              No Education Details
            </Box>
          )}
        </Box>

        <Box className={classes.memberBoxSize}>
          <Typography className={classes.membersNameText} sx={{ padding: '16px' }}>
            Hobbies and interests
          </Typography>
          <Divider />
          {chatProfile?.id?.hobbies?.length ? (
            <Box
              sx={{
                padding: '16px',
                display: 'flex',
                columnGap: '15px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              {chatProfile?.id?.hobbies?.map((each: any, index: any) => {
                return (
                  <Button
                    key={index}
                    sx={{ background: '#6C757D !important', margin: '1px' }}
                    className={classes.priorHelpBtn}
                  >
                    {each}
                  </Button>
                );
              })}
            </Box>
          ) : (
            <Box
              sx={{
                padding: '16px',
                display: 'flex',
                columnGap: '15px',
                alignItems: 'center'
              }}
            >
              No Hobbies
            </Box>
          )}
        </Box>

        <Box className={classes.memberBoxSize}>
          <Typography className={classes.membersNameText} sx={{ padding: '16px' }}>
            Social handles
          </Typography>
          <Divider />

          <Box>{getIcons()}</Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default ChatProfile;
