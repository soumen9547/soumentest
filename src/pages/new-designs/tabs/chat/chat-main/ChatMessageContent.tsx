/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable radix */
/* eslint-disable no-constant-binary-expression */
import React, { useRef } from 'react';
import _ from 'lodash';
import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../../../../redux/hooks';
import MessageComponent from './MessageComponent';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';
import { ThreeDots } from 'react-loader-spinner';
import { chatTheme } from '../../../../../utils/theme';
import UpdateChatText from './UpdateChatText';
import { formatAcsUserWithCommunicationId, getAcsUserByCommunicationId } from '../../../../../routes/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { appColors, chatFonts } from "../../../../../utils/theme";
import { ChatStyle } from '../ChatStyling';

interface IChatMessageContent {
  disableSendButton: boolean;
  data: any;
  isLoading: boolean;
  error: any;
  updateEditor: any;
  setEditCancel: any;
  handlePostMessage: (contentId: number) => void;
  fetchNextPage: any;
  hasNextPage: any;
  isFetchingNextPage: boolean;
  innerRef: any;
  disabled: boolean;
  editingMessageId: string;
  updateMessageLoading: boolean;
  channelName: string;
}

const ChatMessageContent: React.FC<IChatMessageContent> = ({
  disableSendButton,
  isLoading,
  data,
  error,
  updateEditor,
  setEditCancel,
  handlePostMessage,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  innerRef,
  disabled,
  updateMessageLoading,
  editingMessageId,
  channelName
}) => {
  const { user } = useAuth0();
  const acsOrgUsers = useAppSelector((state) => state.acsCommunityUsers.data);
  const formattedAcsOrgUsers: any = formatAcsUserWithCommunicationId(acsOrgUsers);
  const userProfile = useAppSelector((state) => state.userProfile.data);
  const loginUserFName = _.get(userProfile, 'personal_details.firstName', '');
  const loginUserLName = _.get(userProfile, 'personal_details.lastName', '');
  const loginUserFullName = `${loginUserFName} ${loginUserLName}`;
  const loginUserCommunicationId = _.get(userProfile, 'personal_details.communicationId');
  const messagesEndRef: React.LegacyRef<HTMLDivElement> | undefined = useRef(null);
  // const acsChannelParticipants = useAppSelector(
  //   (state) => state.acsChannelParticipants
  // );
  const communicationId: any = _.trim(_.get(user, 'user_metadata.communicationId', ''));

  interface Message {
    id: number;
    text: string;
    createdOn: string;
    sequenceId: string;
    type: string;
  }

  const classes = ChatStyle();
  interface MessageGroup {
    time: moment.Moment | string;
    messages: Message[];
  }

  const messages = data.filter((each: any) => !_.has(each, 'deletedOn'));

  // Sort the messages by their timestamp

  // Group the messages by day
  const messageGroups: MessageGroup[] = [];
  let currentGroup: MessageGroup | null = null;
  messages.forEach((message: Message) => {
    if (message.sequenceId !== '1') {
      if (message.sequenceId === '2') {
        messageGroups.push({ time: 'Start of Chat', messages: [] });
      } else {
        const messageTime = moment(message.createdOn).startOf('day');
        if (!currentGroup || !messageTime.isSame(currentGroup.time, 'day')) {
          currentGroup = { time: messageTime, messages: [] };
          messageGroups.push(currentGroup);
        }
        currentGroup?.messages?.push(message);
      }
    }
  });

  function formatMessageDate(timestamp: string) {
    const now = moment();
    const messageTime = moment(timestamp);

    if (messageTime.isSame(now, 'day')) {
      return 'Today';
    } else if (messageTime.isSame(now.clone().subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    } else if (messageTime.isSame(now, 'week')) {
      return messageTime.format('dddd');
    } else {
      return messageTime.format('MMM D, YYYY');
    }
  }

  return (
    <Box
      id="scrollableDiv"
      style={{
        // TODO: need to keep dynamic height
        overflow: 'auto',
        display: 'flex',
        flexDirection: isLoading ? 'column' : 'column-reverse'
      }}
      flexGrow={1}
      ref={innerRef}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        style={{
          display: 'flex',
          flexDirection: isLoading ? 'column' : 'column-reverse',
          overflow: 'hidden',
          paddingTop: '20px'
        }} // To put endMessage and loader to the top.
        inverse={true}
        hasMore={true && !disabled}
        loader={
          (isFetchingNextPage && hasNextPage) || isLoading ? (
            <Grid container justifyContent="center" flexDirection="column" alignItems="center">
              <ThreeDots height="60" width="60" radius="7" color={chatTheme.palette.primary.main} />
            </Grid>
          ) : (
            <div />
          )
        }
        scrollableTarget="scrollableDiv"
      >
        {messageGroups.map((group: any, idx: number) => {
          return (
            // <div key={idx}>
            <div key={`${group.time}-${idx}`}>
              {group?.time === 'Start of Chat' ? (
                <UpdateChatText message={group?.time} />
              ) : (
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  position="relative"
                  height="30px"
                  paddingTop={3}
                  paddingBottom={3}
                >
                  <hr style={{ borderColor: 'black', width: '100%' }} />
                  <Typography
                    className={classes.StartOfChat}
                    sx={{
                      position: 'absolute'
                    }}
                  >
                    {formatMessageDate(group.time)}
                  </Typography>
                </Box>
              )}
              {/* <UpdateChatText message={formatMessageDate(group.time)} /> */}
              {group.messages

                .sort((a: Message, b: Message) => parseInt(a.sequenceId) - parseInt(b.sequenceId))
                .map((each: any, index: number) => {
                  const messageType = () => {
                    return (
                      <>
                        <Grid item key={index} xs={12}>
                          <MessageComponent
                            editedOn={
                              _.size(_.get(each, 'editedOn')) ? moment(_.get(each, 'editedOn')).format('hh:mm a') : ''
                            }
                            senderCommunicationId={_.get(each, 'senderCommunicationIdentifier.rawId', '')}
                            status={_.get(each, 'status', '')}
                            createdOn={moment(_.get(each, 'createdOn')).format('hh:mm a')}
                            message={each}
                            who={
                              _.get(each, 'senderCommunicationIdentifier.rawId') !== loginUserCommunicationId
                                ? `${_.get(
                                    formattedAcsOrgUsers[_.get(each, 'senderCommunicationIdentifier.rawId')],
                                    'id.firstName',
                                    ''
                                  )} ${_.get(
                                    formattedAcsOrgUsers[_.get(each, 'senderCommunicationIdentifier.rawId')],
                                    'id.lastName',
                                    ''
                                  )}`
                                : loginUserFullName
                            }
                            updateEditor={updateEditor}
                            setEditCancel={setEditCancel}
                            handlePostMessage={handlePostMessage}
                          />
                        </Grid>

                        <div ref={messagesEndRef} />
                      </>
                    );
                  };
                  const participantAddedType = () => {
                    return (
                      <>
                        {_.get(each, 'sequenceId') === '1' ? null : (
                          <UpdateChatText
                            message={`${
                              _.get(each, 'content.initiatorCommunicationIdentifier.rawId') === communicationId
                                ? 'You'
                                : _.get(
                                    getAcsUserByCommunicationId(
                                      acsOrgUsers,
                                      _.get(each, 'content.initiatorCommunicationIdentifier.rawId')
                                    ),
                                    'displayName',
                                    ''
                                  )
                            } added ${_.map(_.get(each, 'content.participants'), (each) =>
                              _.get(each, 'displayName')
                            ).join(',')}`}
                          />
                        )}
                      </>
                    );
                  };

                  const createChannel = (message: string) => {
                    return (
                      <UpdateChatText
                        message={
                          message
                            ? message
                            : `${
                                _.get(each, 'content.initiatorCommunicationIdentifier.rawId') === communicationId
                                  ? 'You'
                                  : _.get(
                                      getAcsUserByCommunicationId(
                                        acsOrgUsers,
                                        _.get(each, 'content.initiatorCommunicationIdentifier.rawId')
                                      ),
                                      'displayName',
                                      ''
                                    )
                              } ${_.get(each, 'content.topic', '') ? 'created' : 'updated'} this channel on ${moment(
                                _.get(each, 'createdOn')
                              ).format('MMMM Do, YYYY')}.  This is the very beginning of the ${_.get(
                                each,
                                'content.topic'
                              )} channel.`
                        }
                      />
                    );
                  };

                  const topicUpdatedType = (updatedPersonName: string) => {
                    return (
                      <UpdateChatText
                        message={
                          _.get(each, 'content.topic') === '#personal'
                            ? ` ${
                                _.get(
                                  getAcsUserByCommunicationId(
                                    acsOrgUsers,
                                    _.get(each, 'content.initiatorCommunicationIdentifier.rawId')
                                  ),
                                  'displayName',
                                  ''
                                )
                                  ? `
              
                                  This conversation is just between 
                                      ${channelName}
                                  and you
                                  `
                                  : ''
                              }
                              
                              `
                            : `${
                                _.get(each, 'content.initiatorCommunicationIdentifier.rawId') === communicationId
                                  ? 'You'
                                  : updatedPersonName
                              } renamed the channel to ${_.get(each, 'content.topic')}
                                        `
                        }
                      />
                    );
                  };

                  const removeParticipantType = () => {
                    return (
                      <UpdateChatText
                        message={
                          _.get(
                            getAcsUserByCommunicationId(
                              acsOrgUsers,
                              _.get(each, 'content.initiatorCommunicationIdentifier.rawId')
                            ),
                            'displayName',
                            ''
                          ) + ' left the channel'
                        }
                      />
                    );
                  };

                  const checkAndReturn = () => {
                    if (_.get(each, 'sequenceId') === '1') {
                      return null;
                    } else if (_.get(each, 'sequenceId') === '2') {
                      const message = _.get(each, 'content.topic') === '#personal' ? `` : '';
                      return !message ? '' : createChannel(message);
                    } else if (_.get(each, 'type') === 'text') {
                      return messageType();
                    } else if (_.get(each, 'type') === 'participantAdded') {
                      return participantAddedType();
                    } else if (_.get(each, 'type') === 'topicUpdated') {
                      const updatedPersonName = _.get(
                        formattedAcsOrgUsers[_.get(each, 'content.initiatorCommunicationIdentifier.rawId', '')],
                        'displayName'
                      );
                      return topicUpdatedType(updatedPersonName);
                    } else if (_.get(each, 'type') === 'participantRemoved') {
                      return removeParticipantType();
                    } else {
                      return null;
                    }
                  };
                  return <React.Fragment key={_.get(each, 'sequenceId', '')}>{checkAndReturn()}</React.Fragment>;
                })}
            </div>
          );
        })}
      </InfiniteScroll>
    </Box>
  );
};

export default ChatMessageContent;
