import { Box, Button, IconButton, Popover, TableCell, TableRow, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import ChatAvatarComponent from '../../../chat/ChatAvatarComponent';
import { IGroupInvitedUser, groupUsersActions } from '../../../../../../redux/slices/group-users/groupUsersSlice';
import delecticon from '../../../../../../assets/images/delecticon.svg';
import ProgramDeletDialog from '../ProgramDeletDialog';
import { API } from '../../../../../../api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useAppDispatch } from '../../../../../../redux/hooks';
import InviteUserDialog from '../InviteUserDialog';

interface Props {
  data: IGroupInvitedUser;
}

const ProgramInvitedUsers = ({ data }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const [openDelete, setDelete] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const id = open ? 'simple-popover' : undefined;
  const orgId = useParams().orgId || '';

  const [openDialog, setOpenDialog] = useState(false);
  const textStyle = {
    fontWeight: '600 !important',
    color: '#152536',
    fontSize: '16px',
    fontFamily: 'Open Sans',
    cursor: 'pointer'
  };
  const sendMessageText = {
    fontWeigth: '400 !important',
    color: '#0071A9',
    fontSize: '13px',
    fontFamily: 'Open Sans',
    cursor: 'pointer',
    width: '133px',
    Height: '35px',
    padding: '5px',
    border: '1px solid #0071A9',
    borderRadius: '8px'
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRevokeInvitation = async (invitedId: string) => {
    setDeleteLoader(true);
    try {
      const response = await API.revokeGroupInvitation({
        orgId,
        invitedId: data.invitationId
      });
      if (response.status === 200 && response.statusText === 'OK') {
        dispatch(
          groupUsersActions.removeInvitedUser({
            invitationId: data.invitationId
          })
        );
        toast.success(_.get(response, 'data.message', 'Invitation Revoked Successfully'));
        setDeleteLoader(false);
      }
    } catch (e) {
      toast.error("Couldn't revoke invitation");
      setDeleteLoader(false);
    }
  };
  return (
    <>
      <TableRow key={data.userId}>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ChatAvatarComponent
              image=""
              type="no status"
              firstLetter={data.firstName.charAt(0)}
              width="40px"
              height="40px"
            />
            <Box sx={{ marginLeft: '10px' }}>
              <Typography style={textStyle}>{data.firstName + ' ' + data.lastName}</Typography>
              {/* <Typography style={marketingTextStyle}>
          Marketing
        </Typography> */}
            </Box>
          </Box>
        </TableCell>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
        {/* {each.inviteAgain && (
    <TableCell>
      <Box
        sx={{ textAlign: "center" }}
        style={sendMessageText}
      >
        Resend Invite
      </Box>
    </TableCell>
  )} */}
        <TableCell>
          {/* <IconButton>
            <Box sx={{ textAlign: "center" }} style={sendMessageText}>
              Resend Invite
            </Box>
          </IconButton> */}
          <Button style={sendMessageText} variant="outlined" onClick={() => setOpenDialog(true)}>
            Resend Invite
          </Button>
        </TableCell>

        <TableCell sx={{ textAlign: 'center' }}>
          <IconButton onClick={handleOpen}>
            <MoreVertIcon sx={{ color: '#152536' }} />
          </IconButton>
        </TableCell>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 10px 15px',
              cursor: 'pointer',
              ':hover': {
                background: '#f0f2f0',
                cursor: 'pointer'
              }
            }}
            onClick={() => {
              setDelete(true);
            }}
          >
            <IconButton>
              <img
                src={delecticon}
                alt="delecticon"
                style={{
                  padding: 0,
                  margin: 0,
                  width: '20px',
                  height: '20px'
                }}
              />
            </IconButton>
            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '14px',
                fontWeight: '400',
                marginLeft: '7px'
              }}
            >
              Revoke Invitation
            </Typography>
          </Box>
        </Popover>
      </TableRow>
      <ProgramDeletDialog
        openDelete={openDelete}
        setDelete={setDelete}
        deleteLoader={deleteLoader}
        text="Are you sure you want to revoke the invitation for this user?"
        handleDelete={handleRevokeInvitation}
        btnText="Yes, Revoke"
      />
      <InviteUserDialog
        handleClose={handleClose}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        data={data}
        type="invite"
      />
    </>
  );
};

export default ProgramInvitedUsers;
