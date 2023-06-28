/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-useless-fragment */
import { Grid, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSearchParams } from 'react-router-dom';
import { appColors, chatTheme } from '../../../../utils/theme';
import ChatImage from '../../../../assets/images/message.png';
import _ from 'lodash';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { toast } from 'react-toastify';
import { API } from '../../../../api';
import { getAcsUserByCommunicationId } from '../../../../routes/helpers';
import { LoadingButton } from '@mui/lab';
import { useQueryClient } from '@tanstack/react-query';
import { dialogActions } from '../../../../redux/slices/dialog-slice/dialogSlice';
import { ACS_CREATE_CHANNEL_DIALOG } from '../../../../constants';
import groupPng from '../../../../assets/images/group.png';
import Text from '../../../../components/ui/Typography/Text';
const useStyles = makeStyles({
  chatContentWrapper: {
    height: 'calc(100vh-70px)'
  },
  messgaingImage: {
    height: '230px',
    width: '230px'
  }
});

const handleScrollChannels = () => {
  const collection = document.getElementsByClassName('scroll-channel')[0];
  collection.scrollTo(0, 0);
};

interface INoChats {
  activeChat?: string;
}
const NoChats: React.FC<INoChats> = ({ activeChat }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const commId = searchParams.get('commId') || '';
  // const acsOrgUsers = useAppSelector(state => state.acsOrgUsers.data)
  const acsCommunityUsers = useAppSelector((state) => state.acsCommunityUsers.data);
  const { user } = useAuth0();
  const [channelCreateLoading, setChannelCreateLoading] = useState(false);
  const acsToken = useAppSelector((state) => state.acsToken.data.token);
  const participant = getAcsUserByCommunicationId(acsCommunityUsers, commId);

  const handleClickOnStartChat = async () => {
    setChannelCreateLoading(true);
    const orgId = _.get(user, 'org_id');
    const modifiedValues = {
      participants: [
        {
          ...participant,
          displayName: _.get(participant, 'id.communicationUserId', ''),
          id: {
            communicationUserId: _.get(participant, 'id.communicationUserId', '')
          }
        }
      ],
      topic: '#personal',
      azureToken: acsToken
    };
    setChannelCreateLoading(true);
    try {
      const { status } = await API.createACSThread(acsToken, modifiedValues, orgId);
      if (status === 200) {
        setChannelCreateLoading(false);
        handleScrollChannels();
        queryClient.fetchQuery({ queryKey: ['getAcsChatThreads'] });
      }
    } catch (err) {
      setChannelCreateLoading(false);
      toast.error(_.get(err, 'response.data', ''));
    }
  };

  const handleCreateGroup = () => {
    dispatch(
      dialogActions.atnOpenDialog({
        dialogName: ACS_CREATE_CHANNEL_DIALOG,
        title: 'Create a Channel'
      })
    );
  };

  return (
    <ThemeProvider theme={chatTheme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={2}
        p={3}
        className={classes.chatContentWrapper}
        style={{ height: '90%' }}
      >
        {commId ? (
          <Grid container justifyContent="center">
            <img className={classes.messgaingImage} src={ChatImage} alt="" />
            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="center">
                <LoadingButton
                  loading={channelCreateLoading}
                  color="primary"
                  variant="contained"
                  onClick={handleClickOnStartChat}
                >
                  Start Chat
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <>
            {activeChat === 'Groups' ? (
              <Grid container justifyContent="center">
                <img className={classes.messgaingImage} src={groupPng} alt="" />
                <Grid item xs={12} mt={2}>
                  <Grid container justifyContent="center">
                    <LoadingButton loading={false} color="primary" variant="contained" onClick={handleCreateGroup}>
                      Create group
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid container justifyContent="center">
                <Text content="Start chat with person" type="T8" color={appColors.orange} />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default NoChats;
