/* eslint-disable react/no-unstable-nested-components */
import { Typography, Stack } from '@mui/material';
import { appColors, chatFonts } from '../../../../utils/theme';
import logo from '../../../../assets/images/favicon.png';

const ChatNotification = () => {
  const unReadMsg = 98;
  let displayMsg;

  if (unReadMsg > 99) {
    displayMsg = '99+';
  } else {
    displayMsg = unReadMsg.toString();
  }

  const NotificationIcon = () => <img src={logo} style={{ width: '12px', height: '12px' }} alt="logo" />;

  return (
    <Stack
      direction="row"
      alignItems="center"
      border={`1px solid ${appColors.gray1}`}
      spacing={0.5}
      sx={{
        padding: '2px 2px',
        borderRadius: '5px'
      }}
    >
      <NotificationIcon />
      <Typography
        sx={{
          fontFamily: 'Open Sans',
          fontSize: chatFonts.sm,
          fontWeight: 600,
          lineHeight: 1
        }}
      >
        {displayMsg}
      </Typography>
    </Stack>
  );
};

export default ChatNotification;
