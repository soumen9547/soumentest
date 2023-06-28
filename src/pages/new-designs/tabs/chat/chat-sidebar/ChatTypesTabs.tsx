import { Box } from '@mui/material';
import { CHAT_NAVBAR_ARRAY } from '../../../../../constants';
import ChatTypeTab from './ChatTypeTab';
import _ from 'lodash';
import { ChatStyle } from '../ChatStyling';

interface IChatTypeTabs {
  chatType: string;
  setActiveChat: React.Dispatch<string>;
  activeChat: string;
}

const ChatTypesTabs: React.FC<IChatTypeTabs> = ({ activeChat, chatType, setActiveChat }) => {
  const classes = ChatStyle();
  return (
    <Box className={classes.chatTypeTabsContainer}>
      {CHAT_NAVBAR_ARRAY.map((each, idx) => (
        <ChatTypeTab
          activeChat={activeChat || chatType}
          setActiveChat={setActiveChat}
          id={_.get(each, 'id')}
          name={_.get(each, 'name')}
          key={idx}
        />
      ))}
    </Box>
  );
};

export default ChatTypesTabs;
