/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Box } from '@mui/material';
import { convertToRaw, EditorState, convertFromHTML, ContentState } from 'draft-js';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import draftToHtml from 'draftjs-to-html';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { ChatClient } from '@azure/communication-chat';
import moment from 'moment';
import {
  ACS_ADD_USER_TO_CHANNEL,
  ACS_CREATE_CHANNEL_DIALOG,
  ACS_CREATE_DIRECT_MESSAGE_DIALOG
} from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  filterTheAcsUsersWithPersonalThreadsWithCommId,
  formatAcsUserWithCommunicationId,
  getCurrentChannelInfo,
  getCurrentChannelName,
  getGroupChannelImage
} from '../../../../routes/helpers';
import { API } from '../../../../api';
import { acsHoldMessagesActions } from '../../../../redux/slices/acs-messages/acsHoldMessages';
import { fetchAcsToken } from '../../../../redux/slices/acs-token/acsTokenSlice';
import { getUserDetails } from '../../../../utils/orgName';
import { fetchAcsChannelParticipants } from '../../../../redux/slices/acs-channel-participants/acsChannelParticipants';
import { dialogActions } from '../../../../redux/slices/dialog-slice/dialogSlice';
import { chatProfileActions } from '../../../../redux/slices/chat-profile/chatProfileSlice';
import { fetchUserEducation, userEducationActions } from '../../../../redux/slices/user-education/userEducationSlice';
import { fetchUserWorkHistory, userWorkHistoryActions } from '../../../../redux/slices/user-work/userWorkHistorySlice';
// import { fetchACSOrgMembers } from "../../../../redux/slices/acs-org-members/acsOrgMembers";
import { fetchCommunityMembers } from '../../../../redux/slices/acs-community-members/acsCommunityMembers';
import { acsChannelActions } from '../../../../redux/slices/acs-channels/acsChannels';
import { acsMessageActions } from '../../../../redux/slices/acs-message/acsMessage';
import ChatSideBar from './chat-sidebar/ChatSideBar';
import ChatMain from './chat-main/ChatMain';
import { acsMessageNotificationActions } from '../../../../redux/slices/acs-message-notifications/acsMessageNotificationsSlice';
/**
 * Chat
 */
let lastSeqId: any;
let threadValue = '';
const Chat = () => {
  const activeItemRef = useRef<any>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { user } = useAuth0();
  const timelineRef = useRef<any>();
  const dispatch = useAppDispatch();
  const [activeChat, setActiveChat] = useState<string>('');
  const [openChatInfoForm, setChatInfoForm] = useState<boolean>(false);
  const [updatingMessage, setUpdatingMessage] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showEditCancel, setEditCancel] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [updateMessageLoading, setUpdateMessageLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(false);
  const [disableSendButton, setDisableSendButton] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const acsMessagesData = useAppSelector((state) => state.messages);
  const acsChannels = useAppSelector((state) => state.acsChannels);
  const acsCommunityUsers = useAppSelector((state) => state.acsCommunityUsers);

  const userProfile = useAppSelector((state) => state.userProfile.data?.personal_details);

  const userWorkHistory = useAppSelector((state) => state.userWorkHistory);
  const userEducation = useAppSelector((state) => state.userEducation);
  const chatProfile = useAppSelector((state) => state.chatProfile.chatProfileDetails);

  const acsChannelParticipants = useAppSelector((state) => state.acsChannelParticipants.data);
  const acsToken = useAppSelector((state) => state.acsToken.data.token);

  const loginUserProfileImage = _.get(userProfile, 'headshot', '');
  const loginUserFName = _.get(userProfile, 'firstName', '');
  const formattedAcsOrgUsers: any = formatAcsUserWithCommunicationId(acsCommunityUsers?.data);

  const threadId = searchParams.get('threadid') || '';
  const urlSearchParams = new URLSearchParams(document.location.hash);
  const chatType = urlSearchParams.get('type') || 'Chats';
  threadValue = threadId || '';
  const commId = searchParams.get('commId') || '';
  const newEditorState = EditorState.createEmpty();
  const newStateWithCursorAtEnd = EditorState.moveFocusToEnd(newEditorState);
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  // const src =
  //   useAppSelector((state) => state.userHeadshot.src) ||
  //   getUserDetails().picture;

  const chatClient: any = acsToken
    ? new ChatClient(
        process.env.REACT_APP_COMMUNICATION_SERVICES_ENDPOINT || '',
        new AzureCommunicationTokenCredential(acsToken)
      )
    : null;

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage, refetch, isFetching } =
    useInfiniteQuery(
      ['recieveMessages', threadValue],
      ({
        pageParam = `${process.env.REACT_APP_AZURE_ENDPOINT}/chat/threads/${threadValue}/messages?maxPageSize=30&api-version=2021-09-07`
      }) => {
        return API.readMessagesFromThreadsByNextLink({
          link: pageParam,
          azureToken: acsToken
        });
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return _.get(lastPage, 'nextLink');
        },
        enabled: false,
        onSuccess: (res) => {
          dispatch(acsMessageNotificationActions.atnRemoveNotifications(threadValue));
          const allPages = _.flattenDeep(_.map(_.get(res, 'pages'), (each) => _.get(each, 'value'))) || [];
          const sortPages = allPages.sort(
            (a, b) => _.parseInt(_.get(a, 'sequenceId')) - _.parseInt(_.get(b, 'sequenceId'))
          );
          const seqID1 = isNaN(parseInt(_.get(_.last(sortPages), 'sequenceId')))
            ? 0
            : parseInt(_.get(_.last(sortPages), 'sequenceId'));
          if (hasNextPage) {
            dispatch(acsMessageActions.atnClearMessage([]));
          }
          const seqID2 = parseInt(_.get(_.last(acsMessagesData), 'sequenceId', ''));
          const checkIsNaN = isNaN(seqID2) ? 0 : seqID2;
          lastSeqId = Math.max(seqID1, checkIsNaN);
          setUpdateMessageLoading(false);
        },
        onError: (err) => {
          if (_.get(err, 'response.status') === 401) {
            dispatch(
              fetchAcsToken({
                communicationId: getUserDetails().communicationUserId
              })
            );
          }
        }
      }
    );

  const directMessages: IThread[] = _.filter(
    _.get(acsChannels, 'personalThreadsArr'),
    (each) => !_.has(each, 'deletedOn')
  ).sort((a: any, b: any) => moment(_.get(b, 'lastMessageReceivedOn')).diff(moment(_.get(a, 'lastMessageReceivedOn'))));
  const filteredDirectMessages = directMessages.filter((each) =>
    _.size(formattedAcsOrgUsers[_.head(_.get(each, 'displayNames', [])) || ''])
  );

  const groupMessages = _.filter(_.get(acsChannels, 'groupThreads'), (each) => !_.has(each, 'deletedOn')).sort(
    (a: any, b: any) => moment(_.get(b, 'lastMessageReceivedOn')).diff(moment(_.get(a, 'lastMessageReceivedOn')))
  );

  useEffect(() => {
    activeItemRef?.current?.scrollIntoView();
    dispatch(acsMessageActions.atnClearMessage([]));
  }, []);

  useEffect(() => {
    activeItemRef?.current?.scrollIntoView();
    if (!activeChat) {
      setActiveChat(chatType);
    }
  }, [chatType]);

  const filterParticipantsFromDirectThreads: IChatThread[] = filterTheAcsUsersWithPersonalThreadsWithCommId(
    acsCommunityUsers?.data,
    _.get(acsChannels, 'personalThreadsArr')
  );
  const channelUser = formattedAcsOrgUsers[getCurrentChannelName(acsChannels, threadValue)];

  const channelUserFirstName = _.get(channelUser, 'id.firstName', '');
  const channelUserLastName = _.get(channelUser, 'id.lastName', '');
  const channelUserFullName = `${channelUserFirstName} ${channelUserLastName}`;
  const groupChannelImage = getGroupChannelImage(acsChannels, threadValue);
  const channelImage = chatType === 'Chats' ? _.get(channelUser, 'id.headshot') : groupChannelImage;
  const channel = chatType === 'Chats' ? channelUserFullName : getCurrentChannelName(acsChannels, threadValue);

  const groupChatInfo = getCurrentChannelInfo(acsChannels, threadValue);
  // const groupChatImg = groupChatInfo?.image;
  const cachedMessages = useAppSelector((state) =>
    _.filter(state.acsHoldMessages, (each) => _.get(each, 'threadId', '') === threadValue)
  );

  const updateEditor = (message: any) => {
    setUpdatingMessage(message);
    setMessageId(message.id || _.get(message, 'contentId'));
    setUpdateMessage(true);
    const { contentBlocks, entityMap } = convertFromHTML(message.content.message);
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  };
  const add = () => {
    setDisabled(true);
    if (timelineRef && timelineRef?.current) {
      timelineRef.current.scrollTo(0, timelineRef.current.scrollHeight);
      setTimeout(() => {
        setDisabled(false);
      }, 200);
    }
  };

  const markup = draftToHtml(rawContentState);

  const handleUpdateMessage = async () => {
    setEditorState(newStateWithCursorAtEnd);
    setEditCancel(false);
    setUpdatingMessage(null);
    const orgId = _.get(user, 'org_id', '');
    setUpdateMessageLoading(true);
    setDisableSendButton(false);
    let content = markup.replace(/&nbsp;/g, '').trim();
    const updatingMessageId = _.get(updatingMessage, 'id');
    const findInExistingMessages = _.find(acsMessagesData, (each) => _.get(each, 'id') === updatingMessageId);
    if (_.size(findInExistingMessages)) {
      dispatch(
        acsMessageActions.atnUpdateMessage({
          id: _.get(updatingMessage, 'id', ''),
          message: content,
          status: 'loading'
        })
      );
    }
    try {
      const { status } = await API.editMessage({
        acsToken,
        threadId,
        messageId: _.get(updatingMessage, 'id', ''),
        content,
        orgId
      });
      if (status === 200) {
        setUpdateMessage(false);
        setDisableSendButton(false);
        setUpdatingMessage(null);
        if (_.size(findInExistingMessages)) {
          dispatch(
            acsMessageActions.atnUpdateMessage({
              id: _.get(updatingMessage, 'id', ''),
              message: content,
              status: 'success'
            })
          );
        } else {
          refetch();
        }
      }
    } catch (err) {
      setDisableSendButton(false);
      setUpdateMessageLoading(false);
      toast.error('Failed to send message');
      setUpdateMessage(false);
    }
  };

  const handleSendMessageToAPI = async (content: string, contentId: number) => {
    try {
      const { status, data } = await API.sendMessageToACSThread(acsToken, threadValue, content, contentId);
      if (status === 200) {
        setDisableSendButton(false);
        setUpdatingMessage(null);
        dispatch(
          acsMessageActions.atnSendMessage({
            communicationUserId: getUserDetails().communicationUserId,
            contentId: contentId,
            message: content,
            status: 'success',
            id: _.get(data, 'Successfully Sent', '')
          })
        );
        queryClient.fetchQuery({ queryKey: ['getAcsChatThreads'] });
        lastSeqId = lastSeqId + 1;
      }
    } catch (err) {
      // pending failed
    }
  };

  const resendMessage = async (contentIdValue: number) => {
    const getContent = _.find(cachedMessages, (each) => _.get(each, 'contentId') === contentIdValue);
    setEditorState(newStateWithCursorAtEnd);
    dispatch(acsHoldMessagesActions.holdMessage({ ...getContent, status: 'loading' }));
    handleSendMessageToAPI(_.get(getContent, 'content.message', ''), contentIdValue);
  };

  const handleSendMessage = async () => {
    setEditorState(newStateWithCursorAtEnd);
    const contentId = Date.now();
    setDisableSendButton(false);
    let content = markup.replace(/&nbsp;/g, '').trim();
    if (activeChat === 'Groups') {
      const newGroup = groupMessages.map((each) => {
        if (each.id === threadId) {
          return { ...each, lastMessageReceivedOn: new Date().toISOString() };
        }
        return each;
      });
      dispatch(acsChannelActions.updateAcsGroupChannesls(newGroup));
    }
    if (activeChat === 'Chats') {
      const newGroup = directMessages.map((each) => {
        if (each.id === threadId) {
          return { ...each, lastMessageReceivedOn: new Date().toISOString() };
        }
        return each;
      });
      dispatch(acsChannelActions.updateAcsDirectChannesls(newGroup));
    }
    dispatch(
      acsMessageActions.atnSendMessage({
        communicationUserId: getUserDetails().communicationUserId,
        contentId: contentId,
        message: content,
        status: 'loading',
        sequenceId: lastSeqId + 1,
        id: ''
      })
    );
    handleSendMessageToAPI(content, contentId);
  };

  const handlePostMessage = async (contentIdValue?: number) => {
    add();
    if (contentIdValue) {
      // this condition for resending the failed messages
      resendMessage(contentIdValue);
    }
    // To Prevent from the Updation of the Same Message Again and again
    else if (updateMessage) {
      // for update messages
      handleUpdateMessage();
    } else {
      handleSendMessage();
    }
  };

  const handleEditCancel = () => {
    setEditCancel(false);
    setUpdatingMessage(null);
    setUpdateMessage(false);
    setEditorState(newStateWithCursorAtEnd);
  };

  const getChannelParticipants = () => {
    dispatch(
      fetchAcsChannelParticipants({
        acsToken: acsToken,
        threadId: threadValue
      })
    );
  };

  useEffect(() => {
    if (threadValue && acsToken) {
      refetch();
      getChannelParticipants();
      dispatch(acsMessageActions.atnClearMessage([]));
      queryClient.fetchQuery({ queryKey: ['getAcsChatThreads'] });
    }
  }, [acsToken, threadValue]);

  const navigateToTheChat = () => {
    if (!threadId && !commId) {
      if (_.size(filteredDirectMessages)) {
        const personalChat = _.head(filteredDirectMessages);
        if (personalChat) {
          navigate(`/app/chat/?threadid=${_.get(personalChat, 'id')}&type=Chats&name=${_.get(personalChat, 'topic')}`);
        }
      } else {
        if (filterParticipantsFromDirectThreads.length) {
          const firstUser = _.head(filterParticipantsFromDirectThreads);
          const communicationUserIdOfFirstUser = _.get(firstUser, 'id.communicationUserId', '');
          navigate(`/app/chat/?commId=${communicationUserIdOfFirstUser}`);
        }
      }
    }
  };

  const handleChatInfoForm = (flag: boolean) => {
    setChatInfoForm(flag);
  };

  const removeParticipantFromThread = async () => {
    const communicationId = getUserDetails().communicationUserId;

    try {
      await API.removeParticipantFromThread({
        threadId,
        acsToken,
        communicationId
      });
      // if (status === 200 && statusText === "OK") {
      queryClient.fetchQuery({ queryKey: ['getAcsChatThreads'] });
      const takeNewChannel = _.find(acsChannels.groupThreads, (each) => each.id !== threadId);
      if (_.size(takeNewChannel)) {
        navigate(`/app/chat/?threadid=${takeNewChannel?.id}&name=${takeNewChannel?.topic}&type=Groups`);
      } else {
        navigate('/app/chat');
      }
      // }
    } catch (err) {
      toast.error('something went wrong');
    }
  };

  useEffect(() => {
    navigateToTheChat();
    // dispatch(fetchUserProfile());
    dispatch(
      fetchCommunityMembers({
        orgId: getUserDetails().orgId,
        location: getUserDetails().location
      })
    );
  }, []);

  const realTime = useCallback(async () => {
    if (acsToken) {
      await chatClient.startRealtimeNotifications();
      chatClient.on('chatMessageEdited', (e: any) => {
        if (e?.sender?.communicationUserId !== getUserDetails().communicationUserId) {
          if (!isFetching) {
            // queryClient.refetchQueries(["recieveMessages", threadValue])
            refetch();
            // queryClient.fetchQuery({
            //   queryKey: ["recieveMessages", threadValue],
            // });
          }
        }
      });
      chatClient.on('participantsRemoved', (e: any) => {
        refetch();
      });
      chatClient.on(
        'chatMessageReceived',
        _.debounce((e: any) => {
          // Refetch only on receiving the messages
          if (e?.sender) {
            if (e?.sender?.communicationUserId !== getUserDetails().communicationUserId) {
              if (!isFetching) {
                // queryClient.refetchQueries(["recieveMessages", threadValue])
                refetch();
                queryClient.fetchQuery({ queryKey: ['getAcsChatThreads'] });
                // queryClient.fetchQuery({
                //   queryKey: ["recieveMessages", threadValue],
                // });
              }
            }
          }

          // if (e.threadId === threadValue) {
          //   refetch();
          // }
        }, 1000)
      );
      chatClient.on('chatThreadCreated', (e: any) => {
        const { threadId } = e;
        const topic = _.get(e, 'properties.topic', '');
        queryClient.fetchQuery({ queryKey: ['getAcsChatThreads'] });
        if (!topic?.includes('#personal')) {
          navigate(`/app/chat/?threadid=${threadId}&name=${topic}&type=Groups`);
        } else {
          navigate(`/app/chat/?threadid=${threadId}&name=${topic}&type=Chats`);
        }
      });
      chatClient.on('chatThreadPropertiesUpdated', (e: any) => {
        queryClient.fetchQuery({ queryKey: ['recieveMessages', threadValue] });
      });
      chatClient.on('chatMessageDeleted', (e: any) => {
        if (e?.sender?.communicationUserId !== getUserDetails().communicationUserId) {
          if (!isFetching) {
            queryClient.fetchQuery({
              queryKey: ['recieveMessages', threadValue]
            });
          }
        }
      });
    }
  }, [acsToken]);

  useEffect(() => {
    realTime();
    return () => {
      realTime();
    };
  }, [acsToken]);

  const handleCreateGroup = () => {
    dispatch(
      dialogActions.atnOpenDialog({
        dialogName: ACS_CREATE_CHANNEL_DIALOG,
        title: 'Create a Channel'
      })
    );
  };

  const handleCreateNewChat = () => {
    dispatch(
      dialogActions.atnOpenDialog({
        dialogName: ACS_CREATE_DIRECT_MESSAGE_DIALOG,
        title: 'Start Chat'
      })
    );
  };

  const handleAddPersonToThread = () => {
    dispatch(
      dialogActions.atnOpenDialog({
        dialogName: ACS_ADD_USER_TO_CHANNEL,
        title: `Add participants to ${channel}`,
        dialogDetails: { threadId: threadValue }
      })
    );
  };

  const onClickOnUserIcon = () => {
    if (formattedAcsOrgUsers) {
      dispatch(chatProfileActions.atnSetChatProfileState(channelUser));
      // to call user education api
      const commId = _.get(channelUser, 'id.communicationId');
      const userId = _.get(formattedAcsOrgUsers, `${commId}.userId`);
      if (activeChat === 'Chats') {
        dispatch(fetchUserEducation(userId.trim()));
        dispatch(fetchUserWorkHistory(userId.trim()));
      }
    }
  };

  const onCloseChatProfile = () => {
    dispatch(chatProfileActions.atnSetChatProfileState(null));
    dispatch(userEducationActions.clearEducation(null));
    dispatch(userWorkHistoryActions.clearWorkHistory(null));
  };

  const content = convertToRaw(editorState.getCurrentContent());
  const contentText = _.map(_.get(content, 'blocks'), (each) => _.get(each, 'text', '')).join('');

  useEffect(() => {
    onCloseChatProfile();
    // Clear edit
    if (updatingMessage) {
      setUpdatingMessage(null);
    }
    if (_.size(contentText)) {
      setEditorState(EditorState.createEmpty());
    }
  }, [threadId, activeChat]);

  useEffect(() => {
    queryClient.fetchQuery({ queryKey: ['getAcsChatThreads'] });
    if (activeChat === 'Chats' && chatType === 'Groups') {
      const personalChat = _.head(filteredDirectMessages);
      if (personalChat) {
        navigate(`/app/chat/?threadid=${_.get(personalChat, 'id')}&type=Chats&name=${_.get(personalChat, 'topic')}`);
      }
    }
    if (activeChat === 'Groups' && chatType === 'Chats') {
      if (groupMessages.length) {
        const firstGroup = _.head(groupMessages);
        navigate(`/app/chat/?threadid=${_.get(firstGroup, 'id')}&type=Groups&name=${_.get(firstGroup, 'topic')}`);
      }
    }
  }, [activeChat]);

  return (
    <Box className="bodyBox d-flex p-0">
      <ChatSideBar
        activeChat={activeChat}
        loginUserProfileImage={loginUserProfileImage}
        loginUserFName={loginUserFName}
        handleCreateGroup={handleCreateGroup}
        handleCreateNewChat={handleCreateNewChat}
        chatType={chatType}
        setActiveChat={setActiveChat}
        filteredDirectMessages={filteredDirectMessages}
        formattedAcsOrgUsers={formattedAcsOrgUsers}
        threadValue={threadValue}
        commId={commId}
        activeItemRef={activeItemRef}
        filterParticipantsFromDirectThreads={filterParticipantsFromDirectThreads}
        groupMessages={groupMessages}
      />
      <ChatMain
        threadValue={threadValue}
        activeChat={activeChat}
        chatType={chatType}
        setChatInfoForm={setChatInfoForm}
        channelImage={channelImage}
        channel={channel}
        onClickOnUserIcon={onClickOnUserIcon}
        acsChannelParticipants={acsChannelParticipants}
        formattedAcsOrgUsers={formattedAcsOrgUsers}
        handleAddPersonToThread={handleAddPersonToThread}
        disabled={disabled}
        messageId={messageId}
        updateMessageLoading={updateMessageLoading}
        timelineRef={timelineRef}
        acsMessagesData={acsMessagesData}
        data={data}
        fetchNextPage={fetchNextPage}
        chatProfile={chatProfile}
        disableSendButton={disableSendButton}
        editorState={editorState}
        error={error}
        groupChatInfo={groupChatInfo}
        handleChatInfoForm={handleChatInfoForm}
        handleEditCancel={handleEditCancel}
        handlePostMessage={handlePostMessage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        onCloseChatProfile={onCloseChatProfile}
        openChatInfoForm={openChatInfoForm}
        removeParticipantFromThread={removeParticipantFromThread}
        setActiveChat={setActiveChat}
        setEditCancel={setEditCancel}
        setEditorState={setEditorState}
        showEditCancel={showEditCancel}
        updateEditor={updateEditor}
        userEducation={userEducation}
        userWorkHistory={userWorkHistory}
      />
    </Box>
  );
};

export default Chat;
