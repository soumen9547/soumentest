// import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import { Button, DialogActions } from '@mui/material';
// import { appColors } from '../../../../../../../utils/theme';

export const MyDialogActions = styled(DialogActions)({
  width: '',
  height: '40px',
  justifyContent: 'center',
  padding: '20px 24px 35px',
  marginBottom: '10px'
});

export const ButtonFull = styled(Button)({
  borderRadius: '8px',
  fontFamily: 'Open Sans',
  fontSize: '16px',
  fontWeight: '700',
  color: '#fff',
  textAlign: 'center',
  width: '100%',
  backgroundColor: '#152536',
  padding: '.5rem 1rem',
  '&:hover': {
    backgroundColor: '#152536',
    color: '#FFFFFF'
  }
});

// export const GoalSettingsStyle = makeStyles(() => ({
//   class: {

//   },
// }));
