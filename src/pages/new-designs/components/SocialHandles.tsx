/* eslint-disable guard-for-in */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import pencil from '../../../assets/images/pencil.svg';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  InputLabel,
  Divider
} from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { Controller, SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { API } from '../../../api';
import { getUserDetails } from '../../../utils/orgName';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../redux/hooks';
import { userSocialUpdate } from '../../../redux/slices/user-profile/userProfieSlice';

export interface Social {
  facebook: string;
  instagram: string;
  youtube: string;
  linkedIn: string;
  twitter: string;
}

interface Props {
  socialData: any;
}

const schema = yup.object({
  // linkedIn: yup
  //   .string()
  //   .required("LinkedIn profile is required")
  //   .url("Invalid Url"),
  linkedIn: yup
    .string()
    .matches(/^(?:$|(https?:\/\/)?(?:www\.)?(linkedin\.com\/.*)$)/, 'Invalid Url')
    .required('Please enter Url'),
  facebook: yup
    .string()
    .matches(/^(?:$|(https?:\/\/)?(?:www\.)?facebook\.com\/.*)$/, 'Invalid Url')
    .nullable(),
  twitter: yup
    .string()
    .nullable()
    .matches(/^(?:$|(https?:\/\/)?(?:www\.)?twitter\.com\/.*)$/, 'Invalid Url'),
  instagram: yup
    .string()
    .matches(/^(?:$|(https?:\/\/)?(?:www\.)?instagram\.com\/.*)$/, 'Invalid Url')
    .nullable(),
  youtube: yup
    .string()
    .nullable()
    .matches(/^(?:$|(https?:\/\/)?(?:www\.)?youtube\.com\/.*)$/, 'Invalid Url')
});

const SocialHandles = ({ socialData }: Props) => {
  const [data, setData] = useState<Social>(socialData);
  const [socialLoader, setSocialLoader] = useState(false);
  const [openSocial, setOpenSocial] = React.useState(false);

  const handleClickOpenSocial = () => {
    setOpenSocial(true);
  };
  const handleCloseSocial = () => {
    setOpenSocial(false);
    reset(socialData);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setSocialLoader(true);
    const { facebook, instagram, linkedIn, twitter, youtube } = values;
    const data: Social = { facebook, instagram, linkedIn, twitter, youtube };
    const { orgId } = getUserDetails();
    try {
      const response = await API.updateSocialLinks({ orgId, data });
      if (response.status === 200 && response.statusText === 'OK') {
        setData(data);
        setSocialLoader(false);
        setOpenSocial(false);
        dispatch(userSocialUpdate(response.data?.user_metadata?.social));
      }
    } catch (e) {
      setSocialLoader(false);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    const x: any = socialData;
    for (let i in x) {
      setValue(i, x[i]);
    }
  }, [socialData]);

  useEffect(() => {
    setData(socialData);
  }, [socialData]);

  type SocialLabel = { id: number; name: string; label: string } & {
    name: keyof Social;
  };

  const socialArray: SocialLabel[] = [
    {
      id: 1,
      name: 'linkedIn',
      label: 'Linkedin'
    },
    {
      id: 2,
      name: 'facebook',
      label: 'Facebook'
    },
    { id: 3, name: 'youtube', label: 'Youtube' },
    { id: 4, name: 'instagram', label: 'Instagram' },
    { id: 5, name: 'twitter', label: 'Twitter' }
  ];

  type IconLabel = { id: number; name: string; icon: ReactNode } & {
    name: keyof Social;
  };

  const socialIconsArray: IconLabel[] = [
    {
      id: 1,
      name: 'facebook',
      icon: <FacebookIcon sx={{ width: '20px', height: '20px', color: '#475993' }} />
    },
    {
      id: 2,
      name: 'instagram',
      icon: <InstagramIcon sx={{ width: '20px', height: '20px', color: '#9C27B0' }} />
    },
    {
      id: 3,
      name: 'twitter',
      icon: <TwitterIcon sx={{ width: '20px', height: '20px', color: '#03A9F4' }} />
    },
    {
      id: 4,
      name: 'linkedIn',
      icon: <LinkedInIcon sx={{ width: '20px', height: '20px', color: '#0072b1' }} />
    },
    {
      id: 5,
      name: 'youtube',
      icon: <YouTubeIcon sx={{ color: '#FF0000', width: '20px', height: '20px' }} />
    }
  ];

  const getIcons = () => {
    if (data) {
      const keys = Object.keys(data);
      const newArray: any = [];
      socialIconsArray?.forEach((each) => {
        if (keys?.includes(each.name) && data[each.name]) {
          newArray?.push(
            <IconButton key={each.id}>
              <a href={data[each.name]}>{each.icon}</a>
            </IconButton>
          );
        }
      });
      if (newArray?.length > 0) {
        return newArray;
      }
      return (
        <Box sx={{ padding: '8px 0' }}>
          <Typography>No Social Handles</Typography>
        </Box>
      );
    }
    return (
      <Box sx={{ padding: '8px 0' }}>
        <Typography>No Social Handles</Typography>
      </Box>
    );
  };
  return (
    <>
      <Box sx={{ padding: '10px 20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              fontFamily: 'Open Sans !important',
              fontSize: '14px ',
              fontWeight: '600',
              lineHeight: '19px',
              color: '#0082B6'
            }}
          >
            Social Handles
          </Box>

          <Box>
            <IconButton onClick={handleClickOpenSocial}>
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
        <Box>{getIcons()}</Box>
      </Box>

      <Dialog
        open={openSocial}
        onClose={handleCloseSocial}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="informationtext" id="alert-dialog-title">
          Social Handles
          <IconButton onClick={handleCloseSocial} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '20px 24px' }}>
          <Grid container spacing={2}>
            {socialArray?.map((each: SocialLabel, index) => {
              return (
                <Grid item xs={6} key={each.id}>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{
                      marginBottom: '10px',
                      fontFamily: 'Open Sans',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#68717A'
                    }}
                  >
                    {each.label === 'Linkedin' ? 'Linkedin*' : each.label}
                  </InputLabel>
                  <Controller
                    name={each.name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        name={each.name}
                        value={value || ''}
                        type="text"
                        placeholder="Enter URL"
                        variant="outlined"
                        style={{ width: '100%' }}
                        onChange={(e) => onChange(e.target.value.trim())}
                        error={checkError(each.name)}
                        helperText={getError(each.name)?.toString()}
                      />
                    )}
                  />
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '50px',
            justifyContent: 'center',
            marginBottom: '15px'
          }}
        >
          <LoadingButton
            style={
              socialLoader
                ? {}
                : {
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#fff',
                    background: '#152536',
                    borderRadius: '8px',
                    width: '560px',
                    height: '50px'
                  }
            }
            loading={socialLoader}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SocialHandles;
