/* eslint-disable react/no-unescaped-entities */
/**
 * DeleteUserDialog
 */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { deleteUser } from "../../../redux/slices/users/userSlice";

interface Props {
  show: boolean;
  userId: string;
  handleDeleteAlert: (flag: boolean) => void;
}

/**
 * @function @name DeleteUserDialog
 * @description it handle confirmation from admin for deleting the user
 * @returns jsx
 */
const DeleteUserDialog = ({ show, userId, handleDeleteAlert }: Props) => {
  /**
   * to close the form
   */
  const handleClose = () => {
    handleDeleteAlert(false);
  };

  /**
   * @function @name deleteUserId
   * @description it delete the user
   */
  const deleteUserId = () => {
    // dispatch(deleteUser(userId));
    handleClose();
  };

  /**
   * return jsx
   */
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete ${userId} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You won't be able to get this data later</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteUserId}>DELETE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUserDialog;
