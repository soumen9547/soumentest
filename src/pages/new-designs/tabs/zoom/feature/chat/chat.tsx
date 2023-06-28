import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import produce from 'immer';
import { Input } from 'antd';
import { ChatPrivilege } from '@zoom/videosdk';
import ZoomContext from '../../context/zoom-context';
import { ChatReceiver, ChatRecord } from './chat-types';
import { useParticipantsChange } from './hooks/useParticipantsChange';
import ChatContext from '../../context/chat-context';
import ChatMessageItem from './component/chat-message-item';
import ChatReceiverContainer from './component/chat-receiver';
// import IconChat from '../../component/svgs/icon-chat.svg';
import { useMount } from '../../hooks';
import './chat.scss';
import { HiOutlineChat } from 'react-icons/hi';
const { TextArea } = Input;

const ChatContainer = () => {
  const zmClient = useContext(ZoomContext);
  const chatClient = useContext(ChatContext);
  const [chatRecords, setChatRecords] = useState<ChatRecord[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [chatReceivers, setChatReceivers] = useState<ChatReceiver[]>([]);
  const [chatPrivilege, setChatPrivilege] = useState<ChatPrivilege>(ChatPrivilege.All);
  const [chatUser, setChatUser] = useState<ChatReceiver | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  let isManager = false;
  const [chatDraft, setChatDraft] = useState<string>('');
  const chatWrapRef = useRef<HTMLDivElement | null>(null);
  const onChatMessage = useCallback(
    (payload: ChatRecord) => {
      setChatRecords(
        produce((records: ChatRecord[]) => {
          const { length } = records;
          if (length > 0) {
            const lastRecord = records[length - 1];
            if (
              payload.sender.userId === lastRecord.sender.userId &&
              payload.receiver.userId === lastRecord.receiver.userId &&
              payload.timestamp - lastRecord.timestamp < 1000 * 60 * 5
            ) {
              if (Array.isArray(lastRecord.message)) {
                lastRecord.message.push(payload.message as string);
              } else {
                lastRecord.message = [lastRecord.message, payload.message as string];
              }
            } else {
              records.push(payload);
            }
          } else {
            records.push(payload);
          }
        })
      );
      if (chatWrapRef.current) {
        chatWrapRef.current.scrollTo(0, chatWrapRef.current.scrollHeight);
      }
    },
    [chatWrapRef]
  );
  const onChatPrivilegeChange = useCallback(
    (payload: { chatPrivilege: ChatPrivilege }) => {
      setChatPrivilege(payload.chatPrivilege);
      if (chatClient) {
        setChatReceivers(chatClient.getReceivers());
      }
    },
    [chatClient]
  );
  const onChatInput = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatDraft(event.target.value);
  }, []);
  useEffect(() => {
    zmClient.on('chat-on-message', onChatMessage);
    return () => {
      zmClient.off('chat-on-message', onChatMessage);
    };
  }, [zmClient, onChatMessage]);
  useEffect(() => {
    zmClient.on('chat-privilege-change', onChatPrivilegeChange);
    return () => {
      zmClient.off('chat-privilege-change', onChatPrivilegeChange);
    };
  }, [zmClient, onChatPrivilegeChange]);
  useParticipantsChange(zmClient, () => {
    if (chatClient) {
      setChatReceivers(chatClient.getReceivers());
    }
    setIsHost(zmClient.isHost());
    // setIsManager(zmClient.isManager());
  });
  useEffect(() => {
    if (chatUser) {
      const index = chatReceivers.findIndex((user) => user.userId === chatUser.userId);
      if (index === -1) {
        setChatUser(chatReceivers[0]);
      }
    } else {
      if (chatReceivers.length > 0) {
        setChatUser(chatReceivers[0]);
      }
    }
  }, [chatReceivers, chatUser]);
  const setChatUserId = useCallback(
    (userId: number) => {
      const user = chatReceivers.find((u) => u.userId === userId);
      if (user) {
        setChatUser(user);
      }
    },
    [chatReceivers]
  );
  const sendMessage = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      if (chatUser && chatDraft) {
        chatClient?.send(chatDraft, chatUser?.userId);
        setChatDraft('');
      }
    },
    [chatClient, chatDraft, chatUser]
  );
  useMount(() => {
    setCurrentUserId(zmClient.getSessionInfo().userId);
    if (chatClient) {
      setChatPrivilege(chatClient.getPrivilege());
    }
  });

  const [closeButton, setCloseButton] = useState(false);

  const handleOpen = () => {
    setCloseButton(true);
  };
  const handleClose = () => {
    setCloseButton(false);
  };
  return (
    <>
      <button onClick={handleOpen} className="iconBtn" style={{ backgroundColor: 'transparent', border: 'none' }}>
        {/* <img src={IconChat} alt="" className='chatIcon' /> */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: '1px solid white'
          }}
        >
          <HiOutlineChat color="white" size={35} />
        </div>
      </button>
      {closeButton === true && (
        <div className="chat-container">
          <div className="chat-wrap">
            <div className="chatHeader">
              <h2>Chat</h2>
              <div>
                <div onClick={handleClose} className="close">
                  X
                </div>
              </div>
            </div>
            <div className="chat-message-wrap" ref={chatWrapRef}>
              {chatRecords.map((record) => (
                <ChatMessageItem
                  record={record}
                  currentUserId={currentUserId}
                  setChatUser={setChatUserId}
                  key={record.timestamp}
                />
              ))}
            </div>
            {ChatPrivilege.NoOne !== chatPrivilege || isHost || isManager ? (
              <>
                <ChatReceiverContainer
                  chatUsers={chatReceivers}
                  selectedChatUser={chatUser}
                  isHostOrManager={isHost || isManager}
                  chatPrivilege={chatPrivilege}
                  setChatUser={setChatUserId}
                />
                <div className="chat-message-box">
                  <TextArea
                    onPressEnter={sendMessage}
                    onChange={onChatInput}
                    value={chatDraft}
                    placeholder="Type message here ..."
                  />
                </div>
              </>
            ) : (
              <div className="chat-disabled">Chat disabled</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
