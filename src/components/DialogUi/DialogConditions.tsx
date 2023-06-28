import React from 'react';
import {
  ACS_ADD_USER_TO_CHANNEL,
  ACS_CREATE_CHANNEL_DIALOG,
  ACS_CREATE_DIRECT_MESSAGE_DIALOG,
  ACS_DELETE_CHANNEL_DIALOG,
  ACS_DELETE_MESSAGE
} from '../../constants';
import AcsCreateUserChatDialog from './dialogs/AcsCreateUserChatDialog';
import AcsCreateChannelDialog from './dialogs/AcsCreateChannelDialog';
import { useAppSelector } from '../../redux/hooks';
import AcsDeleteChannelDialog from './dialogs/AcsDeleteChannelDialog';
import AcsAddUserToExistingChannel from './dialogs/AcsAddUserToExistingChannel';
import AcsDeleteMessageDialog from './dialogs/AcsDeleteMessageDialog';

const DialogConditions = () => {
  const dialogName = useAppSelector((state) => state.dialogActions.dialogName);
  switch (dialogName) {
    case ACS_CREATE_CHANNEL_DIALOG:
      return <AcsCreateChannelDialog />;
    case ACS_CREATE_DIRECT_MESSAGE_DIALOG:
      return <AcsCreateUserChatDialog />;
    case ACS_DELETE_CHANNEL_DIALOG:
      return <AcsDeleteChannelDialog />;
    case ACS_ADD_USER_TO_CHANNEL:
      return <AcsAddUserToExistingChannel />;
    case ACS_DELETE_MESSAGE:
      return <AcsDeleteMessageDialog />;
    default:
      return null;
  }
};

export default DialogConditions;
