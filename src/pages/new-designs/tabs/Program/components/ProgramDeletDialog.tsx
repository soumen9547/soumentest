import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { LoadingButton } from '@mui/lab';

interface Props {
  openDelete: boolean;
  setDelete: any;
  deleteLoader: boolean;
  handleDelete: any;
  text: string;
  btnText?: string;
}

const ProgramDeletDialog = ({ openDelete, setDelete, deleteLoader, handleDelete, text, btnText = 'Delete' }: Props) => {
  return (
    <Dialog
      open={openDelete}
      onClose={() => setDelete(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEnforceFocus // prevents from Range Error
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          fontFamily: 'Open Sans',
          textAlign: 'center',
          fontSize: '22px',
          fontWeight: '600',
          color: '#152536',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Confirmation
        <IconButton onClick={() => setDelete(false)} style={{ position: 'absolute', right: 10 }}>
          <CloseIcon sx={{ float: 'right' }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent style={{ padding: '15px 24px 20px 25px' }}>
        <Typography style={{ fontSize: '17px', maxWidth: '350px' }}>{text}</Typography>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: 'space-around',
          paddingBottom: '20px'
        }}
      >
        <Button
          style={{
            fontFamily: 'Open Sans',
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: '700',
            color: '#DC3545',
            border: '1px solid #DC3545',
            borderRadius: '8px',
            background: '#fff',
            height: '40px',
            textTransform: 'none'
          }}
          fullWidth
          onClick={() => setDelete(false)}
        >
          Cancel
        </Button>

        <LoadingButton
          style={
            deleteLoader
              ? { height: '40px' }
              : {
                  fontFamily: 'Open Sans',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#fff',
                  background: '#152536',
                  borderRadius: '8px',
                  height: '40px',
                  textTransform: 'none'
                }
          }
          fullWidth
          loading={deleteLoader}
          onClick={handleDelete}
        >
          {btnText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProgramDeletDialog;
