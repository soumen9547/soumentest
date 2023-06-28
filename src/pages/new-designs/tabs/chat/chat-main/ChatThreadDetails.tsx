/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import _ from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { API } from '../../../../../api';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUserDetails } from '../../../../../utils/orgName';
import { acsChannelActions } from '../../../../../redux/slices/acs-channels/acsChannels';
import ChatAvatarComponent from '../ChatAvatarComponent';
// import ChatAvatarComponent from "./ChatAvatarComponent";

interface Props {
  openChatInfoForm: boolean;
  handleChatInfoForm: (flag: boolean) => void;
  channelName: string;
  threadId: string;
  removeParticipantFromThread: any;
  groupChatInfo: any;
}

const checkImageSize = (image: any) => {
  if (_.size(image)) {
    const { size } = image[0];
    if (size < 2000000) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const ChatThreadDetails = ({
  openChatInfoForm,
  handleChatInfoForm,
  channelName,
  threadId,
  removeParticipantFromThread,
  groupChatInfo
}: Props) => {
  const [openChatNameEdit, setChatNameEdit] = useState(false);
  const [imgProfileGroup, setImgProfileGroup] = useState();
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<any>(null);
  const acsToken = useAppSelector((state) => state?.acsToken?.data?.token);
  const handleClose = () => {
    handleChatInfoForm(false);
  };
  const schema = yup
    .object({
      topic: yup.string().required('Channel name is required').max(75, 'Max 75 characters')
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setImgProfileGroup(groupChatInfo);
    return () => {
      setImageData(null);
    };
  }, [groupChatInfo]);

  useEffect(() => {
    setValue('topic', channelName);
    return () => {
      setImageData(null);
    };
  }, [groupChatInfo]);

  // const updatedChatProfileImg = async (img: File) => {
  //   const orgId = user?.org_id || "";
  //   const tokens = localStorage.getItem("tokens")
  //     ? JSON.parse(localStorage.getItem("tokens") || "")
  //     : {};

  //   const formData = new FormData();
  //   formData.append("image", img);
  //   formData.append("threadId", threadId);

  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       orgId: orgId,
  //       Authorization: `Bearer ${tokens.access_token}`,
  //       idtoken: tokens.id_token,
  //       location: "us",
  //     },
  //   };

  //   try {
  //     const response = await axios.post(
  //       "https://dosen-v2.azurewebsites.net/api/groupChatPicUpload",
  //       formData,
  //       config
  //     );

  //     queryClient.fetchQuery({ queryKey: ["getAcsChatThreads"] });
  //     queryClient.fetchQuery({ queryKey: ["recieveMessages", threadId] });

  //     if (response.status === 200) {
  //       toast.success(response.data.message);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error(error);
  //   }
  // };
  const dispatch = useAppDispatch();

  const updateGroupName = async (newName: string) => {
    const { orgId } = getUserDetails();

    const response = await API.updateGroupChatName({
      orgId,
      acsToken,
      threadId,
      topic: newName
    });

    if (response.status === 200) {
      dispatch(
        acsChannelActions.updateGroupInfo({
          threadId,
          info: { topic: newName }
        })
      );
    }
  };

  const updateGroupImage = async (imageFile: any) => {
    const { orgId, location } = getUserDetails();
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('threadId', threadId);

    const response = await API.updateGroupPic({
      orgId,
      location,
      formData
    });
    if (!response) {
      toast.error('Unsupported image format');
    }

    if (_.get(response, 'status') === 200 && _.get(response, 'statusText') === 'OK') {
      const imageUrl = response?.data?.url;
      setImgProfileGroup(imageFile);
      dispatch(
        acsChannelActions.updateGroupInfo({
          threadId,
          info: { image: imageUrl }
        })
      );
    }
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    let hasChanges = false;

    try {
      if (channelName !== values?.topic) {
        await updateGroupName(values?.topic);
        hasChanges = true;
      }

      if (values?.image && values?.image?.length > 0 && checkImageSize(imageData)) {
        await updateGroupImage(values?.image[0]);
        hasChanges = true;
      }

      if (hasChanges) {
        setLoading(false);
        setValue('image', '');
        setChatNameEdit(false);
        setImageData(null);
      } else {
        setLoading(false);
        toast.info('No changes were made');
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(_.get(err, 'content.message', 'Something went wrong'));
    }
  };

  const ValidationError = ({ errors, fieldName }: { errors: Object; fieldName: string }) => (
    <Typography color="red" px={0.5} variant="subtitle2">
      {_.get(errors, `${fieldName}.message`, '')}
    </Typography>
  );

  const handleCloseEditForm = () => {
    setChatNameEdit(false);
    setImageData(null);
    setValue('image', '');
  };

  const handleOpenEditForm = () => {
    setValue('topic', channelName);
    setChatNameEdit(true);
    setImageData(null);
  };

  const editForm = () => (
    <Dialog open={openChatNameEdit} onClose={handleCloseEditForm} fullWidth maxWidth="xs">
      <DialogTitle display="flex" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontSize: '19px', fontWeight: 'bold' }}>Rename this channel</Typography>
        <IconButton onClick={handleCloseEditForm}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>Channel name</Typography>
          <Controller
            name="topic"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                variant="outlined"
                value={value}
                onChange={onChange}
                size="small"
                sx={{ marginTop: '5px' }}
                fullWidth
                autoFocus
              />
            )}
          />
          <ValidationError errors={errors} fieldName="topic" />
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '14px',
              marginTop: '3%',
              marginBottom: '2%'
            }}
          >
            Profile Image
          </Typography>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    setImageData(e?.target?.files);
                    onChange(e.target.files);
                  }}
                  accept="image/*,.jpeg,.jpg,.png,.gif"
                  id="image-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>

                <Box width="50px" height="50px" display="flex" position="relative">
                  <Box display="flex" width="45px" height="45px" borderRadius="50%">
                    {value && value[0] && (
                      <img
                        src={URL.createObjectURL(value[0])}
                        alt="profie img "
                        className="my-3 "
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '0%'
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </>
            )}
          />
        </Box>
        {!checkImageSize(imageData) ? (
          <div style={{ marginTop: 30 }}>
            <ValidationError errors={{ error: { message: 'Image size should be less than 2MB' } }} fieldName="error" />
          </div>
        ) : null}
        <DialogActions sx={{ marginTop: '30px' }}>
          <Button onClick={handleCloseEditForm} sx={{ textTransform: 'none' }} variant="outlined" size="small">
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            sx={{ textTransform: 'none', margin: 0 }}
            variant="contained"
            size="small"
            loading={loading}
          >
            Save Changes
          </LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <Dialog
        open={openChatInfoForm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid lightgray"
        >
          {/* <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
            {channelName}
          </Typography>

          <ChatAvatarComponent image={imgProfileGroup} /> */}
          <Box display="flex" alignItems="center" width="100%" sx={{ wordBreak: 'break-all' }}>
            {/* <Box width="50px" height="50px" borderRadius={"50%"}>
              <img
                src={imgProfileGroup}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box> */}
            <ChatAvatarComponent firstLetter={_.size(channelName) ? channelName[0] : ''} image={imgProfileGroup} />
            <Typography sx={{ fontSize: '25px', fontWeight: 'bold', marginLeft: '5%' }}>{channelName}</Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: '#fcfafa',
            paddingTop: '20px !important',
            paddingBottom: '30px !important'
          }}
        >
          <Box
            border="1px solid lightgray"
            padding={1.5}
            bgcolor="#fff"
            sx={{
              ':hover': { backgroundColor: '#f5f3f2' },
              cursor: 'pointer',
              borderTopRightRadius: '6px',
              borderTopLeftRadius: '6px'
            }}
            onClick={handleOpenEditForm}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Channel name</Typography>
              <Button
                variant="text"
                sx={{
                  textTransform: 'none',
                  ':hover': {
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                    textDecoration: 'underline'
                  },
                  margin: '0px !important',
                  padding: '0px !important',
                  minWidth: 'fit-content'
                }}
              >
                Edit
              </Button>
            </Box>
            <Typography sx={{ wordBreak: 'break-all' }}>{channelName}</Typography>
          </Box>
          <Box
            border="1px solid lightgray"
            padding={1.5}
            bgcolor="#fff"
            sx={{
              ':hover': { backgroundColor: '#f5f3f2' },
              cursor: 'pointer',
              borderBottomRightRadius: '6px',
              borderBottomLeftRadius: '6px',
              borderTop: 'none'
            }}
            onClick={() => {
              removeParticipantFromThread();
              handleClose();
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#E01E5A' }}>Leave Channel</Typography>
          </Box>
        </DialogContent>
      </Dialog>
      {editForm()}
    </div>
  );
};

export default ChatThreadDetails;
