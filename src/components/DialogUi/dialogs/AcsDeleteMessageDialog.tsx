import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Button, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/styles'
import { chatTheme } from '../../../utils/theme'
import Text from '../../ui/Typography/Text'
import { API } from '../../../api'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { getUserDetails } from '../../../utils/orgName'
import { dialogActions } from '../../../redux/slices/dialog-slice/dialogSlice'
import { useQueryClient } from '@tanstack/react-query'
import { acsMessageActions } from '../../../redux/slices/acs-message/acsMessage'

const AcsDeleteMessageDialog = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.dialogActions.dialogDetails)

    const handleMessageDelete = async () => {
        const messageId = _.get(data, "message.id", "");
        try {
          const { status } = await API.deleteMessage({
            orgId: getUserDetails().orgId,
            threadId: _.get(data,'threadId'),
            acsToken: _.get(data,'acsToken'),
            messageId,
          });
          if (status === 200) {
            dispatch(acsMessageActions.atnClearMessage([]))
            queryClient.fetchQuery({ queryKey: ["recieveMessages", _.get(data,'threadId')] });
            dispatch(dialogActions.atnCloseDialog())
          }
        } catch (err) {
          toast.error(_.get(err, "err.response.data", "Unable to delete message"));
        }
      };
  
  return (
    <ThemeProvider theme={chatTheme}>
    <Grid item mb={2}>
        <Text content='Are you sure want to delete this message?' type="T9"/>
    </Grid>
    <Grid container justifyContent="flex-end">
        <Button color="primary" variant='contained' size='small' onClick={handleMessageDelete}>Delete</Button>
    </Grid>
    </ThemeProvider>
  )
}

export default AcsDeleteMessageDialog