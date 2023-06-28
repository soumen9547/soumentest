/* eslint-disable react-hooks/exhaustive-deps */
import { appColors } from '../../../../../utils/theme';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatAvatarComponent from '../ChatAvatarComponent';
import Text from '../../../../../components/ui/Typography/Text';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../../../redux/hooks';
import _ from 'lodash';
import { ChatStyle } from '../ChatStyling';

/** Chat person */
interface IChatPerson {
  type: 'personal-thread' | 'personal-user' | 'group-thread';
  name: string;
  threadId?: string;
  communicationUserId?: string;
  activeThreadId: string;
  activeCommId?: string;
  image?: string;
  lastMessageReceivedOn?: string;
}
const ChatPerson: React.FC<IChatPerson> = ({
  type,
  name,
  threadId,
  communicationUserId,
  activeThreadId,
  activeCommId,
  image,
  lastMessageReceivedOn
}) => {
  const classes = ChatStyle();
  const navigate = useNavigate();
  const notifications = useAppSelector((state) => state.messageNotifications.notifications);
  const filterNotificationsUsingThreadId = _.filter(notifications, (each) => _.get(each, 'threadId') === threadId);

  const handleClickOnChannel = () => {
    // type
    switch (type) {
      case 'personal-thread':
        localStorage.setItem('acsdetails', JSON.stringify({ name: name }));
        navigate(`/app/chat/?threadid=${threadId}&name=#personal&type=Chats`);
        break;
      case 'personal-user':
        navigate(`/app/chat/?commId=${communicationUserId}`);
        break;
      case 'group-thread':
        navigate(`/app/chat/?threadid=${threadId}&name=${name}&type=Groups`);
        break;
      default:
        break;
    }
  };

  const isActive = threadId === activeThreadId || communicationUserId === activeCommId;
  function formatMessageDate(timestamp: string) {
    const now = moment();
    const messageTime = moment(timestamp);

    if (messageTime.isSame(now, 'day')) {
      return messageTime.format('h:mm A');
    } else if (messageTime.isSame(now.clone().subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    } else if (messageTime.isSame(now, 'week')) {
      return messageTime.format('dddd');
    } else {
      return messageTime.format('MMM D, YYYY');
    }
  }
  const refrence: any = useRef(null);

  useEffect(() => {
    isActive && refrence?.current?.scrollIntoView();
  }, []);

  /** Active classes */
  const MyChatPersonWrapper = isActive ? classes.activeChatPersonWrapper : classes.chatPersonWrapper;
  const NameActiveColor = isActive ? appColors.white : appColors.ChatTitle;
  const DateActiveColor = isActive ? appColors.white : appColors.gray3;

  return (
    <Box
      className={`${MyChatPersonWrapper} ${classes.ChatPersonWrapperBox}`}
      onClick={handleClickOnChannel}
      ref={refrence}
    >
      <Box mr={1}>
        <ChatAvatarComponent image={image} firstLetter={name.slice(0, 1)} />
      </Box>
      <Box display="flex" flexDirection="column" flexGrow={1} alignItems="space-between">
        <Box display="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
          {/* <H4 content={name} /> */}
          <Text content={name} type="T6" color={NameActiveColor} />
          {_.size(filterNotificationsUsingThreadId) > 0 ? (
            <Text
              content={_.size(filterNotificationsUsingThreadId).toString()}
              type="T6"
              color="#fff"
              className={classes.notificationContainer}
            />
          ) : null}
          <Typography
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '12px',
              fontWeight: 600
            }}
            color={DateActiveColor}
          >
            {lastMessageReceivedOn ? formatMessageDate(lastMessageReceivedOn) : ''}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexGrow={1}>
          {/* <Typography
            sx={{
              fontFamily: "Open Sans",
              fontSize: "13px",
              fontWeight: 500,
              color: appColors.gray3,
            }}
          >
            Wow that would be amazing
          </Typography> */}
          {/* <Box
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              width="24px"
              bgcolor={appColors.orange}
              height="18px"
              borderRadius={"15px"}
              boxSizing="border-box"
            >
              <span
                style={{
                  color: appColors.white,
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                }}
              >
                4
              </span>
            </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPerson;
