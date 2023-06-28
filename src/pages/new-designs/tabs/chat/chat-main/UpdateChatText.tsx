import { Grid, Typography, Paper } from '@mui/material';
import { ChatStyle } from '../ChatStyling';

interface IUpdateChatText {
  message: string;
}
const UpdateChatText: React.FC<IUpdateChatText> = ({ message }) => {
  if (!message) return null;
  const classes = ChatStyle();
  return (
    <Grid item display="flex" alignItems="center" justifyContent="center" paddingTop={1} paddingBottom={1}>
      <Paper elevation={0}>
        <Typography className={classes.StartOfChat}>{message}</Typography>
      </Paper>
    </Grid>
  );
};

export default UpdateChatText;
