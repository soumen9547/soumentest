/* eslint-disable no-undef */
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import _ from 'lodash';
import ChatPerson from './ChatPerson';
import RenderChats from './RenderChats';

interface IChatChannels {
  activeChat: string;
  filteredDirectMessages: IThread[];
  threadValue: string;
  formattedAcsOrgUsers: IFormattedAcsOrgUser[];
  commId: string;
  activeItemRef: React.MutableRefObject<any>;
  filterParticipantsFromDirectThreads: IChatThread[];
  groupMessages: IGroupMessage[];
}

const useStyles = makeStyles({
  chatChannelsContainer: {
    width: '100%',
    overflowY: 'hidden',
    height: 'calc(100vh - 201px)',
    '&:hover': {
      overflow: 'overlay'
    }
  }
});

const ChatChannels: React.FC<IChatChannels> = ({
  activeChat,
  filteredDirectMessages,
  threadValue,
  formattedAcsOrgUsers,
  commId,
  activeItemRef,
  filterParticipantsFromDirectThreads,
  groupMessages
}) => {
  const classes = useStyles();
  return (
    // {formattedAcsOrgUsers.length > 0 ? ():()}
    <Box className={`scroll-channel ${classes.chatChannelsContainer}`}>
      {activeChat === 'Chats' ? (
        <RenderChats
          activeItemRef={activeItemRef}
          commId={commId}
          filterParticipantsFromDirectThreads={filterParticipantsFromDirectThreads}
          filteredDirectMessages={filteredDirectMessages}
          formattedAcsOrgUsers={formattedAcsOrgUsers}
          threadValue={threadValue}
        />
      ) : activeChat === 'Groups' ? (
        <>
          {_.map(groupMessages, (each, idx) => {
            return (
              <ChatPerson
                key={idx}
                type="group-thread"
                activeThreadId={threadValue}
                activeCommId={commId}
                threadId={_.get(each, 'id', '')}
                name={_.get(each, 'topic') || ''}
                image={_.get(each, 'image', '')}
                lastMessageReceivedOn={_.get(each, 'lastMessageReceivedOn', '')}
              />
            );
          })}
        </>
      ) : null}
    </Box>
  );
};

export default ChatChannels;
