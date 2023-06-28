/* eslint-disable no-undef */
import { Box } from '@mui/material';
import React from 'react';
import ChatChannels from './ChatChannels';
import ChatAvatarIcon from './ChatAvatarIcon';
import ChatTypesTabs from './ChatTypesTabs';
import { ChatStyle, ChatHeading } from '../ChatStyling';

interface IChatSidebar {
  activeChat: string;
  loginUserProfileImage: string;
  loginUserFName: string;
  handleCreateGroup: () => void;
  handleCreateNewChat: () => void;
  chatType: string;
  setActiveChat: React.Dispatch<string>;
  filteredDirectMessages: IThread[];
  formattedAcsOrgUsers: IFormattedAcsOrgUser[];
  threadValue: string;
  commId: string;
  activeItemRef: React.MutableRefObject<any>;
  filterParticipantsFromDirectThreads: IChatThread[];
  groupMessages: IGroupMessage[];
}

const ChatSideBar: React.FC<IChatSidebar> = ({
  activeChat,
  loginUserProfileImage,
  loginUserFName,
  handleCreateGroup,
  handleCreateNewChat,
  chatType,
  setActiveChat,
  filteredDirectMessages,
  formattedAcsOrgUsers,
  threadValue,
  commId,
  activeItemRef,
  filterParticipantsFromDirectThreads,
  groupMessages
}) => {
  const classes = ChatStyle();
  return (
    <Box className={classes.container}>
      <Box padding={2}>
        <ChatHeading>Chat</ChatHeading>
        <ChatAvatarIcon
          activeChat={activeChat}
          handleCreateGroup={handleCreateGroup}
          handleCreateNewChat={handleCreateNewChat}
          loginUserFName={loginUserFName}
          loginUserProfileImage={loginUserProfileImage}
        />
      </Box>

      <ChatTypesTabs activeChat={activeChat} chatType={chatType} setActiveChat={setActiveChat} />

      <ChatChannels
        activeChat={activeChat}
        activeItemRef={activeItemRef}
        commId={commId}
        filterParticipantsFromDirectThreads={filterParticipantsFromDirectThreads}
        filteredDirectMessages={filteredDirectMessages}
        formattedAcsOrgUsers={formattedAcsOrgUsers}
        groupMessages={groupMessages}
        threadValue={threadValue}
      />
    </Box>
  );
};

export default ChatSideBar;
