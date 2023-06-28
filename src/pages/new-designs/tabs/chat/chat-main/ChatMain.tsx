/* eslint-disable no-undef */
import { Box, Grid } from '@mui/material';
import React from 'react';
import ChatMessageContent from './ChatMessageContent';
import ChatEditorComponent from '../ChatEditorComponent';
import ChatThreadDetails from './ChatThreadDetails';
import NoChats from '../NoChats';
import ChatProfile from './ChatProfile';
import _ from 'lodash';
import ChatMainHeader from './ChatMainHeader';
import { ChatStyle } from '../ChatStyling';

interface IChatMain {
  threadValue: string;
  activeChat: string;
  chatType: string;
  setChatInfoForm: React.Dispatch<boolean>;
  channelImage: string;
  channel: string;
  onClickOnUserIcon: () => void;
  acsChannelParticipants: IAcsUsers[];
  formattedAcsOrgUsers: IFormattedAcsOrgUser[];
  handleAddPersonToThread: () => void;
  disabled: boolean;
  messageId: string;
  updateMessageLoading: boolean;
  timelineRef: React.MutableRefObject<any>;
  acsMessagesData: IChatMessage[];
  data: any;
  fetchNextPage: any;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  error: any;
  isLoading: boolean;
  disableSendButton: boolean;
  updateEditor: any;
  setEditCancel: any;
  handlePostMessage: () => void;
  editorState: any;
  setEditorState: any;
  handleEditCancel: () => void;
  showEditCancel: boolean;
  openChatInfoForm: boolean;
  handleChatInfoForm: (flag: boolean) => void;
  groupChatInfo: any;
  removeParticipantFromThread: any;
  chatProfile: any;
  userWorkHistory: any;
  userEducation: any;
  onCloseChatProfile: () => void;
  setActiveChat: any;
}

const ChatMain: React.FC<IChatMain> = ({
  threadValue,
  activeChat,
  chatType,
  setChatInfoForm,
  channelImage,
  channel,
  onClickOnUserIcon,
  acsChannelParticipants,
  formattedAcsOrgUsers,
  handleAddPersonToThread,
  disabled,
  messageId,
  updateMessageLoading,
  timelineRef,
  acsMessagesData,
  data,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  error,
  isLoading,
  disableSendButton,
  updateEditor,
  setEditCancel,
  handlePostMessage,
  editorState,
  setEditorState,
  handleEditCancel,
  showEditCancel,
  openChatInfoForm,
  handleChatInfoForm,
  groupChatInfo,
  removeParticipantFromThread,
  chatProfile,
  userWorkHistory,
  userEducation,
  onCloseChatProfile,
  setActiveChat
}) => {
  const classes = ChatStyle();
  return (
    <Grid container className={classes.chatWrapper}>
      <Grid item xs className={classes.chatWrapperBody}>
        {threadValue && activeChat === chatType ? (
          <Box className={classes.chatContent}>
            <ChatMainHeader
              acsChannelParticipants={acsChannelParticipants}
              activeChat={activeChat}
              channelImage={channelImage}
              chatType={chatType}
              formattedAcsOrgUsers={formattedAcsOrgUsers}
              handleAddPersonToThread={handleAddPersonToThread}
              setChatInfoForm={setChatInfoForm}
              channel={channel}
              onClickOnUserIcon={onClickOnUserIcon}
            />
            <ChatMessageContent
              disabled={disabled}
              channelName={channel}
              editingMessageId={messageId}
              updateMessageLoading={updateMessageLoading}
              innerRef={timelineRef}
              data={_.uniqBy(
                [
                  ...acsMessagesData,
                  ..._.flattenDeep(_.map(_.get(data, 'pages'), (each) => _.get(each, 'value')))
                ].sort((a, b) => _.parseInt(_.get(b, 'sequenceId')) - _.parseInt(_.get(a, 'sequenceId'))),
                'sequenceId'
              )}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              error={error}
              isLoading={isLoading}
              disableSendButton={disableSendButton || isLoading}
              updateEditor={updateEditor}
              setEditCancel={setEditCancel}
              handlePostMessage={handlePostMessage}
            />
            <ChatEditorComponent
              disableSendButton={disableSendButton}
              editorState={editorState}
              handlePostMessage={handlePostMessage}
              setEditorState={setEditorState}
              handleEditCancel={handleEditCancel}
              showEditCancel={showEditCancel}
              channelName={channel}
              setEditCancel={setEditCancel}
              activeMessageId={messageId}
            />
          </Box>
        ) : (
          <NoChats activeChat={activeChat} />
        )}
        {chatType === 'Groups' ? (
          <ChatThreadDetails
            openChatInfoForm={openChatInfoForm}
            handleChatInfoForm={handleChatInfoForm}
            channelName={channel}
            groupChatInfo={groupChatInfo}
            threadId={threadValue}
            removeParticipantFromThread={removeParticipantFromThread}
          />
        ) : null}
      </Grid>
      {_.size(chatProfile) ? (
        <Grid item xs={4}>
          <ChatProfile
            workHistory={userWorkHistory}
            educationDetails={userEducation}
            chatProfile={chatProfile}
            onCloseChatProfile={onCloseChatProfile}
            setActiveChat={setActiveChat}
            parentComponent="chatMain"
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ChatMain;
