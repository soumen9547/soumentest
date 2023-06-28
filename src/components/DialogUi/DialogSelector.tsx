import _ from 'lodash';
import { Dialog, DialogContent, ThemeProvider, Typography, IconButton, DialogTitle } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { dialogActions } from '../../redux/slices/dialog-slice/dialogSlice';
import { chatTheme } from '../../utils/theme';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DialogConditions from './DialogConditions';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const DialogSelector = () => {
  const dialogName = useAppSelector((state) => state.dialogActions.dialogName);
  const dialogTitle = useAppSelector((state) => state.dialogActions.title);
  const dispatch = useAppDispatch();

  const closeDialog = () => dispatch(dialogActions.atnCloseDialog());
  if (_.isEmpty(dialogName)) return null;
  return (
    <ThemeProvider theme={chatTheme}>
      <BootstrapDialog
        open={!_.isEmpty(dialogName)}
        maxWidth="xs"
        fullWidth
        // onClose={closeDialog}
        aria-labelledby="customized-dialog-title"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={closeDialog}>
          <Typography fontWeight="bold" style={{ fontSize: '1.5rem' }}>
            {dialogTitle}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogConditions />
        </DialogContent>
      </BootstrapDialog>
    </ThemeProvider>
  );
};

export default DialogSelector;
