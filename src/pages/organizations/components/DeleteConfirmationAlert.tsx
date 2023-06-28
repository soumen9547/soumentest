/**
 * DeleteConfirmation
 * @description dialog to delete specific organization
 */
import * as React from 'react';
import { deleteOrganization } from '../../../redux/slices/organization/organizationSlice';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch } from '../../../redux/hooks';

interface IDeleteConfirmation {
  show: boolean;
  deletingOrgName: string;
  deletingOrgId: string;
  handleDeleteConfirmation: (flag: boolean) => void;
  deletingOrgLocation: any;
}

/**
 * @function @name DeleteConfirmation
 * @description It will ask for permission to delete the organization
 * @param {boolean} show
 * @param {string} deletingOrgName
 * @callback handleDeleteConfirmation
 * @returns {React.ReactElement}
 */
const DeleteConfirmation: React.FC<IDeleteConfirmation> = ({
  show,
  deletingOrgName,
  deletingOrgId,
  handleDeleteConfirmation,
  deletingOrgLocation
}) => {
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();

  /**
   * to close the dialog
   */
  const handleClose = () => {
    handleDeleteConfirmation(false);
  };

  /**
   * delete the organization and then close the dialog
   */
  const handleOk = async () => {
    const token = await getAccessTokenSilently();
    if (deletingOrgId) {
      dispatch(
        deleteOrganization({
          token,
          orgId: deletingOrgId,
          dataLocation: deletingOrgLocation
        })
      );
    }
    handleClose();
  };

  /**
   * return jsx
   */
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="organization-add">
        Delete Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete {deletingOrgName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '15px 24px 20px 24px' }}>
        <Button color="primary" variant="outlined" style={{ padding: '5px 15px' }} onClick={handleClose}>
          No
        </Button>
        <Button color="primary" variant="contained" onClick={handleOk} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
