/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable no-duplicate-imports */
import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import pencil from '../../../assets/images/pencil.svg';
// import videoImg from "../../../assets/images/video.png";
import CloseIcon from '@mui/icons-material/Close';
import upload from '../../../assets/images/upload.svg';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { API } from '../../../api';
import videoImage from '../../../assets/images/videoimage.png';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userInfoUpdate } from '../../../redux/slices/user-profile/userProfieSlice';
import { getUserDetails } from '../../../utils/orgName';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';

const DigitalIntro = () => {
  const { user, getIdTokenClaims, getAccessTokenSilently } = useAuth0();
  const [openDigital, setOpenDigital] = React.useState(false);
  const userData = useAppSelector((state) => state.userProfile.data);
  const videoValue = userData?.videoIntro || '';

  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>(videoValue);

  const [videoUrlTest, setVideoUrlTest] = useState<string>(videoValue);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [openDelete, setDelete] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  // const [videoDataLink, setVideoDataLink] = useState<string>(videoIntroValue);

  useEffect(() => {
    // setVideoDataLink(videoIntroValue)
    setVideoUrl(videoValue);
  }, [videoValue]);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsHovering(true);
    } else if (e.type === 'dragleave') {
      setIsHovering(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoChange(e.dataTransfer.files[0]);
      setShowPreview(true);
    }
  };

  function handleImageClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setShowPreview(true);
    }
  }

  function handleVideoChange(selectedFile: File) {
    if (selectedFile) {
      const maxFileSize = 100 * 1024 * 1024;

      const allowedMimeTypes = [
        'video/mp4',
        'video/webm',
        'video/ogg',
        'video/mpeg',
        'video/x-msvideo',
        'video/quicktime',
        'video/x-flv',
        'video/x-ms-wmv',
        'video/x-matroska'
        // Add any other video MIME types you want to allow
      ];

      if (!allowedMimeTypes?.includes(selectedFile.type)) {
        toast.error('Invalid file type. Please upload a video file.');
        return;
      }

      if (selectedFile.size > maxFileSize) {
        toast.error('File size exceeds the 100 MB limit. Please choose a smaller file.');
        return;
      }

      setVideo(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      // setVideoUrl(url);
      setVideoUrlTest(url);
      setErrorMessage('');
      setShowPreview(true);
    }
  }

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCloseDigital = () => {
    setOpenDigital(false);
    setShowPreview(false);
    setVideo(null);
    setErrorMessage('');
    // setVideoUrl("");
    setVideoUrlTest('');
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!video && !videoUrl && !videoUrlTest) {
      setErrorMessage('Please select a video file.');
      return;
    }

    handleCloseDigital();
    handleSubmit(event);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
    event.preventDefault();

    setIsLoading(true);

    const idTokenClaims = await getIdTokenClaims();
    const accessToken = await getAccessTokenSilently();
    const orgId = _.get(user, 'org_id');

    try {
      if (video !== null) {
        const formData = new FormData();
        formData.append('video', video);

        const tokens = {
          access_token: accessToken,
          id_token: _.get(idTokenClaims, '__raw', '')
        };

        const response = await API.addUserVideoUpload({
          data: formData,
          orgId,
          tokens
        });
        if (response.status === 200) {
          toast.success('video uploaded successfully');
          dispatch(userInfoUpdate({ ...userData, videoIntro: response.data.URL }));
        } else {
          toast.error('failed to upload video');
        }
      } else {
        // Handle the case when no video file is present (if needed)
      }
    } catch (err) {
      toast.error('failed to upload video');
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  const { userId } = getUserDetails();

  const handleDelete = async () => {
    setDeleteLoader(true);
    try {
      const response = await API.deleteVideoIntro({
        userId: userId
      });

      if (response.status === 200 && response.statusText === 'OK') {
        toast.success('Video intro deleted successfully');
        setVideoUrl('');
        setVideoUrlTest('');
        setVideo(null);
        dispatch(userInfoUpdate({ ...userData, videoIntro: '' }));
        // setDelete(false);
        setDeleteLoader(false);
        handleCloseDigital();
      }

      setDelete(false);
    } catch (e: any) {
      const { status, statusText } = e.response;
      toast.error(_.get(e, 'response.data.message', `${status}: ${statusText}`));
      setDeleteLoader(false);
    }
  };

  const handleRemoveClose = () => {
    // handleCloseDigital();
    handleDelete();
  };

  const handleClickOpenDigital = () => {
    setOpenDigital(true);
    setShowPreview(true);
  };

  return (
    <>
      <Box sx={{ padding: '10px 20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '10px'
          }}
        >
          <Box
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '19px',
              color: '#0082B6'
            }}
          >
            Digital Intro
          </Box>

          <Box>
            <IconButton onClick={handleClickOpenDigital}>
              <img
                src={pencil}
                alt="pencil"
                style={{
                  padding: 0,
                  margin: 0,
                  width: '20px',
                  height: '20px'
                }}
              />
            </IconButton>
          </Box>
        </Box>

        {/* { videoDataLink ?  */}

        <Box sx={{ width: '100%' }}>
          {/* <IconButton> */}
          {isLoading ? (
            <Box
              sx={{
                width: '232px',
                height: '134px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0'
              }}
            >
              <video
                src={videoUrl}
                key={videoUrl}
                controls
                style={{
                  padding: 0,
                  margin: 0,
                  width: '232px',
                  height: '134px',
                  objectFit: 'contain'
                }}
              />
            </Box>
          ) : videoValue ? (
            <video
              src={videoValue}
              key={videoValue}
              controls
              style={{
                padding: 0,
                margin: 0,
                width: '232px',
                height: '134px',
                objectFit: 'contain'
              }}
            />
          ) : (
            <Box
              sx={{
                width: '400px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0'
              }}
            >
              <img
                src={videoImage}
                alt="placeholder"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              />
            </Box>
          )}
          {/* </IconButton> */}
        </Box>
        {/* : ""
        } */}
      </Box>

      <Dialog
        open={openDigital}
        onClose={handleCloseDigital}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSave}>
          <DialogTitle className="informationtext" id="alert-dialog-title">
            Digital Intro
            <IconButton onClick={handleCloseDigital} sx={{ float: 'right' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box
              style={{
                marginTop: '0px'
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFFFF',
                border: '1px dashed #DEDFDF',
                borderRadius: '8px',
                padding: '5px 46px 15px',
                margin: '15px 0',
                cursor: 'pointer'
              }}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleImageClick}
            >
              <Box sx={{ marginRight: '20px', marginTop: '20px' }}>
                {showPreview && (videoUrlTest || videoUrl) ? (
                  <video
                    src={videoUrlTest || videoUrl}
                    key={videoUrlTest || videoUrl}
                    controls
                    style={{
                      width: '140px',
                      height: 'auto'
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '140px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#f0f0f0'
                    }}
                  >
                    <img
                      src={videoImage}
                      alt="placeholder"
                      style={{
                        width: 'auto',
                        height: 'auto'
                      }}
                    />
                  </Box>
                )}
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <input
                  type="file"
                  id="video-upload"
                  accept="video/*"
                  onChange={(e) => e.target.files && handleVideoChange(e.target.files[0])}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />

                <IconButton>
                  <img
                    src={upload}
                    alt="upload"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '25px',
                      height: '25px',
                      filter: isHovering ? 'brightness(1.2)' : 'none'
                    }}
                  />
                </IconButton>

                <Box
                  sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '600',
                    fontSize: '12px',
                    // color: " #999999",
                    color: isHovering ? '#3D8BFD' : '#999999'
                  }}
                >
                  <span style={{ fontSize: '14' }}> Click to upload </span>
                  or drag
                  <br />
                  Video File (max. 100 MB)
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                textAlign: 'center',
                color: 'red',
                fontSize: '12px',
                fontFamily: 'Open Sans',
                fontWeight: '600',
                marginBottom: '10px'
              }}
            >
              {errorMessage}
            </Box>
          </DialogContent>
          <DialogActions
            style={{
              width: '',
              height: '50px',
              justifyContent: 'center',
              padding: '0px 24px 8px',
              marginBottom: '15px'
            }}
          >
            {videoValue && (
              <Button
                style={{
                  fontFamily: 'Open Sans',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#DC3545',
                  border: '1px solid #DC3545',
                  borderRadius: '8px',
                  background: '#fff',
                  // width: "270px",
                  height: '50px'
                }}
                fullWidth
                // onClick={handleRemoveClose}
                onClick={() => setDelete(true)}
              >
                Remove
              </Button>
            )}

            <Button
              type="submit"
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: '700',
                color: '#fff',
                background: '#152536',
                borderRadius: '8px',
                width: '560px',
                height: '50px'
              }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={() => setDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            fontFamily: 'Open Sans',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '600',
            color: '#152536',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Confirmation
          <IconButton onClick={() => setDelete(false)} style={{ position: 'absolute', right: 10 }}>
            <CloseIcon sx={{ float: 'right' }} />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '25px 24px 25px' }}>
          <Typography style={{ fontSize: '16px' }}>Are you sure to remove this video file ?</Typography>
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '45px',
            justifyContent: 'center',
            padding: '5px 24px 30px'
          }}
        >
          <Button
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: '700',
              color: '#DC3545',
              border: '1px solid #DC3545',
              borderRadius: '8px',
              background: '#fff',
              width: '150px',
              height: '40px',
              textTransform: 'none'
            }}
            fullWidth
            onClick={() => setDelete(false)}
          >
            No
          </Button>

          <LoadingButton
            style={
              deleteLoader
                ? { width: '150px', height: '40px' }
                : {
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#fff',
                    background: '#152536',
                    borderRadius: '8px',
                    width: '150px',
                    height: '40px',
                    textTransform: 'none'
                  }
            }
            fullWidth
            loading={deleteLoader}
            onClick={handleRemoveClose}
          >
            Yes, Remove
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DigitalIntro;
