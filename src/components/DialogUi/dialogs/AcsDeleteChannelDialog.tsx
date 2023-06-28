import _ from 'lodash'
import { LoadingButton } from '@mui/lab'
import {Grid} from '@mui/material'
import { useState } from 'react'
import { API } from '../../../api'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { dialogActions } from '../../../redux/slices/dialog-slice/dialogSlice'
import { useQueryClient } from '@tanstack/react-query'

const AcsDeleteChannelDialog = () => {
  const [deleteLoading,setDeleteLoading]= useState(false) 
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.data)
  const acsToken = useAppSelector((state) => state.acsToken.data.token);
  const dialogDetails = useAppSelector(state => state.dialogActions.dialogDetails)
  const threadId = _.get(dialogDetails,'id','')
  const queryClient = useQueryClient()
  const handleDelete = async() => {
    setDeleteLoading(true)    
    const orgId = _.get(user, "org_id", "");
    try {
      const res = await API.deleteACSThread(acsToken, threadId, orgId);
      if (res.status === 200) {
        setDeleteLoading(false)
        queryClient.fetchQuery({queryKey: ["getAcsChatThreads"]})
        dispatch(dialogActions.atnCloseDialog())
      }
    } catch (err) {
      setDeleteLoading(false)
    }
  }





  return (
    <Grid>
      <Grid item>Do you want to remove this channel?</Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <LoadingButton loading={deleteLoading} color="primary" size="small" variant='contained' onClick={handleDelete}>
            Yes
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AcsDeleteChannelDialog