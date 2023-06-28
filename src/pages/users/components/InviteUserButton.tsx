/* eslint-disable no-undef */
import { Button } from '@mui/material';
import React from 'react';

const InviteUserButton: React.FC<IInviteUser> = ({ handleAddUserFormVisible }) => {
  return (
    <Button
      variant="contained"
      sx={{ marginLeft: '20px', textTransform: 'none' }}
      size="small"
      onClick={() => handleAddUserFormVisible(true)}
    >
      INVITE USER
    </Button>
  );
};

export default InviteUserButton;
