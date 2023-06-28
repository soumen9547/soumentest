/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, IconButton } from '@mui/material';
import pencil from '../../../assets/images/pencil.svg';
import profilebgimg from '../../../assets/images/profilebgimg.png';
import EditProfile from './EditProfile';
import { FormValues, initialValues } from '../tabs/ProfileLayout';
import _ from 'lodash';
import { countries } from '../../profile-page/countryData';
import { Grid } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ChatAvatarComponent from '../tabs/chat/ChatAvatarComponent';
import { makeStyles } from '@mui/styles';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
import { API } from '../../../api';
import { toast } from 'react-toastify';
import { userInfoUpdate } from '../../../redux/slices/user-profile/userProfieSlice';
import DisabilityModal from './DisabilityModal';
import { disabilityPopupActions } from '../../../redux/slices/disability/disabilityPopupSlice';
import ROLES from '../../../utils/roles';
interface Props {
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

const ProfileHeader = ({ formData, setFormData }: Props) => {
  const userData = useAppSelector((state) => state.userProfile.data);
  const data = useAppSelector((state) => state.userProfile.data?.personal_details) || initialValues;

  const [open, setOpen] = React.useState(false);
  const userProfile = useAppSelector((state) => state.userProfile.data?.personal_details);
  const userImage = _.get(userProfile, 'headshot', '');
  const userFirstName = _.get(userProfile, 'firstName', '');
  const userLastName = _.get(userProfile, 'lastName', '');
  const isActive = _.get(userProfile, 'isActive', false);
  const [disableClose, setDisable] = useState(false);
  const { category, timezone, phoneNumber, firstName, lastName } = userProfile || {
    category: '',
    timezone: '',
    phoneNumber: '',
    firstName: '',
    lastName: ''
  };
  // const timezone = userProfile?.timezone || "";
  const mandatoryFields = {
    category: true,
    timezone: true,
    phoneNumber: true,
    firstName: true,
    lastName: true
  };
  const settings = useAppSelector((state) => ({
    ...state.userProfile.data?.settings,
    ...mandatoryFields
  })) || {
    gender: false,
    country: false,
    firstGenerationStudent: false,
    ethnicity: false,
    dob: false,
    disabilityType: false,
    ...mandatoryFields
  };

  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setFormData(data);
    setOpen(true);
  };

  useEffect(() => {
    // because firstGenStudent and firstGenerationStudent are different
    const role = localStorage.getItem('role') || '';
    if (role !== ROLES.platAdmin && userData) {
      const data = {
        gender: userProfile?.gender || '',
        disabilityType: userProfile?.disability || [],
        firstGenerationStudent: userProfile?.firstGenStudent || '',
        country: userProfile?.country || '',
        dob: userProfile?.dob || '',
        ethnicity: userProfile?.ethnicity || '',
        category,
        timezone,
        phoneNumber,
        firstName,
        lastName
      };
      const value = Object.keys(settings).some((each) => {
        if (each === 'disabilityType') {
          return false;
        } else if (settings[each as keyof typeof settings] && _.get(data, `${each}`, '') === '') {
          return true;
        } else {
          return false;
        }
      });

      if (!isActive && value) {
        setDisable(true);
        setOpen(true);
      } else if (!isActive && settings.disabilityType && userProfile?.disability.length === 0) {
        dispatch(
          disabilityPopupActions.handleDisabilityPopup({
            open: true,
            disable: true
          })
        );
      }
    }
  }, [isActive, userData]);

  const getUserProfile = async () => {
    try {
      const response = await API.getUserProfile();
      if (response.status === 200 && response.statusText === 'OK') {
        dispatch(userInfoUpdate(response.data));
      }
    } catch (e) {
      toast.error('Failed to get user profile');
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const editProfileForm = () => {
    return <EditProfile data={data} open={open} setOpen={setOpen} disableClose={disableClose} />;
  };

  const getCountry = () => {
    const value = countries.find((each) => each.code === data.country);
    if (value) {
      return value.label;
    }
    return '-/-';
  };

  const dob = _.get(data, 'dob', '');
  const formattedDob = dob ? moment(dob).format('MM/DD/YYYY') : '-/-';

  const useStyles = makeStyles({
    profileHeaderImage: {
      backgroundImage: `url(${profilebgimg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  });

  const classes = useStyles();
  return (
    <>
      {data ? (
        <>
          <Box
            className={classes.profileHeaderImage}
            sx={{
              // background: "#E9ECEF",
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '120px'
            }}
            // style={{backgroundImage:`url(${profilebgimg})`}}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '20px !important'
              }}
            >
              <Box>
                <IconButton sx={{ padding: '0 !important' }}>
                  <ChatAvatarComponent
                    height="80px"
                    width="80px"
                    firstLetter={userFirstName.slice(0, 1)}
                    image={userImage}
                    type="no status"
                  />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Box
                  sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '700',
                    fontSize: '24px',
                    lineHeight: '33px',
                    color: '#152536'
                  }}
                >
                  {userFirstName ? userFirstName : _.startCase(data.firstName)} <span> </span>
                  {userLastName ? userLastName : _.startCase(data.lastName)}
                  {/* { +
                    " " +
                    _.startCase(data.lastName)} */}
                </Box>
                <Box
                  sx={{
                    fontFamily: 'Open Sans',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '19px',
                    color: '#68717A',
                    marginTop: '10px'
                  }}
                >
                  {data.email}
                  <span style={{ color: '#fff', padding: '0 6px' }}>|</span> {data.phonePrefix} {data.phoneNumber}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '10px'
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '700',
                  fontSize: '24px',
                  lineHeight: '33px',
                  color: '#152536',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <IconButton onClick={handleClickOpen}>
                  <img
                    src={pencil}
                    alt="pencil"
                    style={{
                      padding: 0,
                      // marginRight: "-9px",
                      width: '20px',
                      height: '20px'
                    }}
                  />
                </IconButton>
              </Box>

              <Box
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '600',
                  fontSize: '10px',
                  lineHeight: '14px',
                  color: '#262738',
                  marginTop: '10px'
                }}
              >
                {data.country} ({data.timezone})
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              // columnGap: "40px",
              padding: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={3} md={4} sm={6}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontSize: '12px',
                      fontWeight: '400',
                      lineHeight: '16px',
                      color: '#68717A',
                      marginBottom: '10px'
                    }}
                  >
                    Gender
                  </Box>
                  <Tooltip title={data && data.gender ? data.gender : '-/-'}>
                    <Box
                      className="profile-text"
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: '19px',
                        color: '#152536',
                        width: '110px'
                      }}
                    >
                      {/* {_.get(data, "gender", "-/-")} */}
                      {data && data.gender ? data.gender : '-/-'}
                    </Box>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontSize: '12px',
                      fontWeight: '400',
                      lineHeight: '16px',
                      color: '#68717A',
                      marginBottom: '10px'
                    }}
                  >
                    DOB
                  </Box>
                  <Tooltip title={formattedDob}>
                    <Box
                      className="profile-text"
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: '19px',
                        color: '#152536',
                        width: '110px',
                        wordBreak: 'break-word',
                        textTransform: 'uppercase'
                      }}
                    >
                      {formattedDob}
                    </Box>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontSize: '12px',
                      fontWeight: '400',
                      lineHeight: '16px',
                      color: '#68717A',
                      marginBottom: '10px'
                    }}
                  >
                    Country
                  </Box>
                  <Tooltip title={getCountry()}>
                    <Box
                      className="profile-text"
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: '19px',
                        color: '#152536',
                        width: '110px',
                        wordBreak: 'break-word'
                      }}
                    >
                      {getCountry()}
                    </Box>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item lg={3} md={4} sm={6}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontSize: '12px',
                      fontWeight: '400',
                      lineHeight: '16px',
                      color: '#68717A',
                      marginBottom: '10px'
                    }}
                  >
                    Ethnicity
                  </Box>
                  <Tooltip title={_.get(data, 'ethnicity', '')}>
                    <Box
                      className="profile-text"
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: '19px',
                        color: '#152536',
                        maxWidth: '110px',
                        wordBreak: 'break-word'
                      }}
                    >
                      {_.get(data, 'ethnicity', '') ? _.get(data, 'ethnicity', '') : '-/-'}
                    </Box>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6}>
                <Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontSize: '12px',
                      fontWeight: '400',
                      lineHeight: '16px',
                      color: '#68717A',
                      marginBottom: '10px'
                    }}
                  >
                    First generation student
                  </Box>
                  <Tooltip title={data.firstGenStudent}>
                    <Box
                      className="profile-text"
                      sx={{
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: '19px',
                        color: '#152536',
                        width: '110px'
                      }}
                    >
                      {_.get(data, 'firstGenStudent', '') ? _.get(data, 'firstGenStudent', '') : '-/-'}
                    </Box>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : null}

      {editProfileForm()}
      <DisabilityModal />
    </>
  );
};

export default ProfileHeader;
