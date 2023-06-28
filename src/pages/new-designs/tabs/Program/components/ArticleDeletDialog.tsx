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
}

const ArticleDeletDialog = ({ openDelete, setDelete, deleteLoader, handleDelete }: Props) => {
  return (
    <Dialog
      open={openDelete}
      onClose={() => setDelete(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
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
      <DialogContent style={{ padding: '25px 24px 25px' }}>
        <Typography style={{ fontSize: '16px' }}>Are you sure you want to delete this Article?</Typography>
      </DialogContent>
      <DialogActions
        style={{
          width: '',
          height: '45px',
          justifyContent: 'center',
          padding: '5px 24px 30px'
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
            width: '150px',
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
              ? { width: '150px', height: '40px' }
              : {
                  fontFamily: 'Open Sans',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#fff',
                  background: '#152536',
                  borderRadius: '8px',
                  width: '150px',
                  height: '40px',
                  textTransform: 'none'
                }
          }
          fullWidth
          loading={deleteLoader}
          onClick={handleDelete}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleDeletDialog;
