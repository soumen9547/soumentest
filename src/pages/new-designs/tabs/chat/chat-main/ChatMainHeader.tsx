import { Box, IconButton, Stack, Dialog, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { appColors } from '../../../../../utils/theme';
import ChatAvatarComponent from '../ChatAvatarComponent';
import _ from 'lodash';
import Text from '../../../../../components/ui/Typography/Text';
import { alphaColors } from '../../../../../utils/alphabates-colors';
import { Close, PersonAddAlt } from '@mui/icons-material';
import StarIcon from '../../../../../assets/images/starimage.png';
import BookIcon from '../../../../../assets/images/bookimage.png';
import VideoIcon from '../../../../../assets/images/videoimage.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
// import { useAppSelector } from "../../../../../redux/hooks";
import { styled } from '@mui/material/styles';
import { ChatStyle, ChatHeadName, ChatHeadStatus } from '../ChatStyling';
// import { getUserDetails } from "../../../../../utils/orgName";
// import instantCallEvent from "../../instantCallEvent";
// import LaunchZoomCall from "../../../../LaunchZoomCall";
import CallBookingCalendar from '../../CallBookingClender';

interface IChatMainHeader {
  chatType: string;
  activeChat: string;
  setChatInfoForm: React.Dispatch<boolean>;
  channelImage: string;
  acsChannelParticipants: any;
  formattedAcsOrgUsers: any;
  handleAddPersonToThread: any;
  channel: any;
  onClickOnUserIcon: () => void;
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300
  }
});

const ChatMainHeader: React.FC<IChatMainHeader> = ({
  acsChannelParticipants,
  activeChat,
  channelImage,
  chatType,
  formattedAcsOrgUsers,
  handleAddPersonToThread,
  setChatInfoForm,
  channel,
  onClickOnUserIcon
}) => {
  const classes = ChatStyle();
  const handleBookIconClick = async (param: any) => {
    // console.log('Clicked BookIcon with parameter:', param);
    if (param === 'BookIcon') {
      // Perform specific action when param is equal to BookIcon
      setCalendarOpen(true);
    } else if (param === 'VideoIcon') {
      // console.log(acsChannelParticipants);
      // const baseUrl = window.location.origin;
      // const meetingId = Math.random().toString(36).substr(2, 9);
      // const currentTimestamp = new Date().getTime();
      // const currentUnixTime = Math.floor(currentTimestamp / 1000);
      // const userName = getUserDetails().name;
      // instantCallEvent(channel, acsChannelParticipants, getUserDetails().communicationUserId, baseUrl, meetingId, currentUnixTime);
      // setZoomCallProps({
      //   base_url: baseUrl,
      //   meetingId: meetingId,
      //   unix_time: currentUnixTime,
      //   userName: userName
      // });
      // setCallActive(true);
    }
  };
  const iconMap = {
    StarIcon: StarIcon,
    BookIcon: BookIcon,
    VideoIcon: VideoIcon
  };
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  // const [unixTime, setUnixTime] = useState(0);
  // const [isCallActive, setCallActive] = useState(false);
  // const [zoomCallProps, setZoomCallProps] = useState({
  //   base_url: '',
  //   meetingId: '',
  //   unix_time: 0,
  //   userName: ''
  // });
  // useEffect(() => {
  //   const fetchUnixTime = () => {
  //     const currentTimestamp = new Date().getTime();
  //     setUnixTime(Math.floor(currentTimestamp / 1000)); // Convert milliseconds to seconds
  //   };

  //   fetchUnixTime();
  // }, []);
  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };
  // const handleVideoCallClose = () => {
  //   //setVideoCall(false);
  // };
  return (
    <div>
      <Box className={classes.headerContainer}>
        <Stack
          direction="row"
          sx={{ cursor: chatType === 'Groups' ? 'pointer' : '' }}
          gap={2}
          alignItems="center"
          onClick={() => {
            if (activeChat === 'Groups') {
              setChatInfoForm(true);
            }
          }}
        >
          <ChatAvatarComponent
            image={channelImage ? channelImage : null}
            firstLetter={channel.slice(0, 1)}
            onClickOnUserIcon={() => onClickOnUserIcon()}
          />
          <Stack direction="column" gap="2px">
            <ChatHeadName onClick={() => onClickOnUserIcon()}>{channel}</ChatHeadName>
            <ChatHeadStatus>Available</ChatHeadStatus>
          </Stack>
          {chatType === 'Groups' ? <KeyboardArrowDownIcon fontSize="small" /> : null}
        </Stack>
        <Stack direction="row" style={{ cursor: 'pointer' }}>
          <CustomWidthTooltip
            title={
              <Text
                content={acsChannelParticipants.map((each: any) => _.get(each, 'displayName')).join(', ')}
                type="T5"
                color={appColors.white}
              />
            }
          >
            <Box position="relative" marginRight={10} padding="8px">
              {chatType === 'Groups'
                ? acsChannelParticipants.slice(0, 3).map((each: any, idx: number) => (
                    <React.Fragment key={idx}>
                      {_.get(formattedAcsOrgUsers[_.get(each, 'id.communicationUserId', '')], 'id.headshot') ? (
                        <Box
                          key={each}
                          sx={{
                            borderRadius: '50%',
                            borderWidth: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            left: 17 * (idx + 1)
                          }}
                        >
                          <img
                            style={{
                              height: '34px',
                              width: '34px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                            src={_.get(formattedAcsOrgUsers[_.get(each, 'id.communicationUserId', '')], 'id.headshot')}
                            alt=""
                          />
                        </Box>
                      ) : (
                        <Box
                          key={each}
                          sx={{
                            borderRadius: '50%',
                            borderWidth: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '35px',
                            width: '35px',
                            backgroundColor: _.get(
                              alphaColors,
                              _.get(each, 'displayName', '').slice(0, 1).toUpperCase(),
                              ''
                            ),
                            position: 'absolute',
                            left: 18 * (idx + 1)
                          }}
                        >
                          <Text
                            content={_.get(each, 'displayName', '').slice(0, 1).toUpperCase()}
                            type="T5"
                            color={appColors.black}
                          />
                        </Box>
                      )}
                    </React.Fragment>
                  ))
                : null}
            </Box>
          </CustomWidthTooltip>
          {chatType === 'Groups' ? (
            <IconButton disableRipple onClick={handleAddPersonToThread}>
              <PersonAddAlt />
            </IconButton>
          ) : null}
          {Object.entries(iconMap).map(([key, value], idx) => (
            <IconButton
              key={idx}
              disableRipple
              onClick={() => handleBookIconClick(key)} // Wrap the function call in an arrow function
            >
              <img src={value} alt="" />
            </IconButton>
          ))}
        </Stack>
        <Dialog
          open={isCalendarOpen}
          onClose={handleCalendarClose}
          scroll="body"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" className="DialogTitle">
            Schedule Time with {channel}
            <IconButton onClick={handleCalendarClose} sx={{ float: 'right' }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <CallBookingCalendar
            onClose={handleCalendarClose}
            channelNaame={channel}
            threadParticipantsUsers={acsChannelParticipants}
            chatType={chatType}
            pageName="Chat"
          />{' '}
          {/* Remove the curly braces */}
        </Dialog>

        {/* <Dialog open={isVideoCall} onClose={handleVideoCallClose} scroll="body" aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth>   
        <DialogTitle id="alert-dialog-title" className="DialogTitle">
            Schedule Time with {channel}
            <IconButton onClick={handleVideoCallClose} sx={{ float: "right" }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <ZoomCall/>
      </Dialog> */}
      </Box>
      {/* {isCallActive && (
        <LaunchZoomCall
          base_url={zoomCallProps.base_url}
          meeting_id={zoomCallProps.meetingId}
          unix_time={zoomCallProps.unix_time}
          user_name={zoomCallProps.userName}
        />
      )} */}
    </div>
  );
};

export default ChatMainHeader;
