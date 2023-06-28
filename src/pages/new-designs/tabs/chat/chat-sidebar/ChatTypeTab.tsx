import { appColors } from '../../../../../utils/theme';
import { Box, Typography } from '@mui/material';
import { ChatStyle } from '../ChatStyling';

/**
 * Chat Type Tab
 */
const ChatTypeTab = ({
  id,
  activeChat,
  setActiveChat,
  name
}: {
  id: string;
  activeChat: string;
  setActiveChat: React.Dispatch<string>;
  name: string;
}) => {
  const classes = ChatStyle();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      borderBottom={`2.5px solid ${activeChat === name ? appColors.orange : 'transparent'}`}
      paddingBottom={1}
      onClick={() => setActiveChat(name)}
      sx={{ cursor: 'pointer' }}
    >
      <Typography className={classes.TabsText}>{name}</Typography>
      {/* {name === "Chat" && (
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            width="24px"
            bgcolor={appColors.orange}
            height="18px"
            marginLeft={1}
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
          </Box>
        )} */}
    </Box>
  );
};

export default ChatTypeTab;
