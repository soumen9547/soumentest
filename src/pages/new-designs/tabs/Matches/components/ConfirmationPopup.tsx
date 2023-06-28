import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  // InputLabel,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';

interface Props {
  matchesCount: any;
  confirmedCount: any;
  modelConfirmMatch: any;
  handleCloseConfirmMatch: any;
  handelSubmitConfirmMatch: any;
  handleConfirmAll: any;
  loaderFirstPopup: any;
  loaderFirstPopup1: any;
}

const ConfirmationPopup = ({
  matchesCount,
  confirmedCount,
  modelConfirmMatch,
  handleCloseConfirmMatch,
  handelSubmitConfirmMatch,
  handleConfirmAll,
  loaderFirstPopup,
  loaderFirstPopup1
}: Props) => {
  return (
    <div>
      <div>
        <Dialog
          open={modelConfirmMatch}
          onClose={handleCloseConfirmMatch}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" className="informationtext">
            Confirmation
            <IconButton onClick={handleCloseConfirmMatch} style={{ float: 'right' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '20px',
                fontWeight: '600',
                color: '#DF6438',
                margin: '15px 0'
              }}
            >
              You have {matchesCount + confirmedCount} auto matches that require confirmation to become active. You can
              confirm them all at once or confirm each match individually.
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '20px',
                fontWeight: '400',
                color: '#68717A',
                marginBottom: '15px'
              }}
            >
              Once you confirm, both parties will be notified of the match and their mentoring relationship will begin.
            </Typography>
          </DialogContent>
          <DialogActions
            style={{
              justifyContent: 'center',
              padding: '5px 24px 20px',
              marginBottom: '10px'
            }}
          >
            <LoadingButton
              style={
                loaderFirstPopup
                  ? {}
                  : {
                      fontFamily: 'Open Sans',
                      textAlign: 'center',
                      fontSize: '15px',
                      fontWeight: '700',
                      color: ' #68717A',
                      border: '1px solid #68717A',

                      borderRadius: '8px',
                      background: '#fff',
                      // width: "270px",
                      height: '45px'
                    }
              }
              loading={loaderFirstPopup}
              fullWidth
              onClick={handelSubmitConfirmMatch}
            >
              <span>Confirm only one</span>
            </LoadingButton>

            <LoadingButton
              style={
                loaderFirstPopup1
                  ? {}
                  : {
                      fontFamily: 'Open Sans',
                      textAlign: 'center',
                      fontSize: '15px',
                      fontWeight: '700',
                      color: '#fff',
                      background: '#152536',
                      borderRadius: '8px',
                      width: '560px',
                      height: '45px'
                    }
              }
              loading={loaderFirstPopup1}
              fullWidth
              onClick={handleConfirmAll}
            >
              <span> Confirm All</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
