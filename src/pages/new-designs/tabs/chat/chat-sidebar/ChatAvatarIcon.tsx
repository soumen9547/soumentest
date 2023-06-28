import { Box, IconButton } from '@mui/material';
import ChatAvatarComponent from '../ChatAvatarComponent';
import chatedit from '../../../../../assets/images/chatedit.svg';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  avatar: {
    display: 'flex',
    paddingTop: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatarImage: {
    padding: 0,
    margin: 0,
    width: '44px',
    height: '44px'
  }
});

interface IChatAvatarIcon {
  loginUserFName: string;
  loginUserProfileImage: string;
  activeChat: string;
  handleCreateGroup: () => void;
  handleCreateNewChat: () => void;
}

const ChatAvatarIcon: React.FC<IChatAvatarIcon> = ({
  loginUserFName,
  loginUserProfileImage,
  activeChat,
  handleCreateGroup,
  handleCreateNewChat
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.avatar}>
      <ChatAvatarComponent image={loginUserProfileImage} firstLetter={loginUserFName.slice(0, 1)} />
      <IconButton onClick={activeChat === 'Groups' ? handleCreateGroup : handleCreateNewChat}>
        <img src={chatedit} referrerPolicy="no-referrer" alt="editicon" className={classes.avatarImage} />
      </IconButton>
    </Box>
  );
};

export default ChatAvatarIcon;
