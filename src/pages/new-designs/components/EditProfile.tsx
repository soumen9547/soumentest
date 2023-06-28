/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-invalid-this */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Autocomplete, FormHelperText, IconButton } from '@mui/material';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import { countries } from '../../profile-page/countryData';
import { timezones } from '../../profile-page/timeZones';
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Controller, SubmitHandler, FieldValues, useForm } from 'react-hook-form';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Divider,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { getUserDetails } from '../../../utils/orgName';
import { API } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { toast } from 'react-toastify';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import { userInfoUpdate } from '../../../redux/slices/user-profile/userProfieSlice';
import countryCodeArray from '../../../constants/countrycode';
import { disabilityPopupActions } from '../../../redux/slices/disability/disabilityPopupSlice';
// import ChatAvatarComponent from "../tabs/chat/ChatAvatarComponent";
import { validatePhoneNumber } from '../../../constants/PhoneNumberValidator';
import PhoneInput from '../../../constants/PhoneInput';
import { fetchOrgDetails } from '../../../redux/slices/orgDetails/orgDetailsSlice';
import ROLES from '../../../utils/roles';

interface Props {
  data?: any;
  open: boolean;
  setOpen: any;
  setData?: any;
  disableClose: boolean;
}

const userData = {
  firstName: getUserDetails().firstName,
  lastName: getUserDetails().lastName,
  gender: 'Prefer not to say',
  country: '',
  phoneNumber: '',
  ethnicity: '',
  timezone: '',
  headshot: getUserDetails().picture,
  firstGenStudent: 'No',
  email: getUserDetails().email,
  category: '',
  dob: ''
};
const EditProfile = ({ data = userData, setData, open, setOpen, disableClose }: Props) => {
  const sortedCountries = [...countries]?.sort((a, b) => {
    const labelA = a.label.toLowerCase();
    const labelB = b.label.toLowerCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });
  const userData = useAppSelector((state) => state.userProfile.data);
  const disability = useAppSelector((state) => state.userProfile.data?.personal_details?.disability) || [];
  const optionalFields = _.get(userData, 'settings', {
    gender: false,
    ethnicity: false,
    firstGenerationStudent: false,
    disabilityType: false,
    dob: false,
    country: false
  });

  interface CountryType {
    name: string;
    dial_code: string;
    code: string;
  }
  interface OptionalFields {
    country: boolean;
    gender: boolean;
    ethnicity: boolean;
    firstGenerationStudent: boolean;
  }

  const userTypes = useAppSelector((state) => state?.orgDetails?.data?.userTypes) || [];

  function createRequiredTest(fieldName: keyof OptionalFields, errorMessage: string) {
    return function (this: yup.TestContext, value: string | undefined) {
      if (optionalFields[fieldName]) {
        if (value) {
          return true; // the field is valid
        } else {
          // the field is invalid, so return a ValidationError object with an error message
          return this.createError({ message: errorMessage });
        }
      } else {
        return true; // the field is not required, so it's always valid
      }
    };
  }

  const currentDate = moment().format('YYYY-MM-DD');

  const schema = yup.object({
    firstName: yup
      .string()
      .required('First name is required')
      .test('no-empty-spaces', 'First name cannot be all empty spaces', (value) => {
        if (value) {
          return !/^[\s]+$/.test(value);
        }
        return true;
      })
      .min(3, 'Name must be at least 3 characters')
      .max(25, 'Maximum 25 characters'),
    lastName: yup
      .string()
      .required('Last name is required')
      .test('no-empty-spaces', 'Last name cannot be all empty spaces', (value) => {
        if (value) {
          return !/^[\s]+$/.test(value);
        }
        return true;
      })
      .min(3, 'Name must be at least 3 characters')
      .max(25, 'Maximum 25 characters'),

    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .test('is-valid-phone-number', 'Invalid phone number', async function (value) {
        const { path, createError } = this;
        const validationResult = await validatePhoneNumber(value, selectedCountry);
        if (validationResult) {
          const { isValid, error } = validationResult;
          return isValid || createError({ path, message: error });
        }
        return createError({ path, message: 'Validation error' });
      }),

    timezone: yup.string().required('Timezone is required'),
    category: yup
      .string()
      .nullable()
      .required('Category is required')
      .test('is-empty', 'Category is required', (value) => value !== ''),
    dob: yup
      .date()
      .nullable()
      .max(new Date(), 'Date of birth can not be in future')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      })
      .test('is-required', 'Date of birth is required', function (value) {
        if (optionalFields.dob) {
          if (value) {
            const isFutureDate = moment(value).isAfter(currentDate);
            if (isFutureDate) {
              return this.createError({
                message: 'Date of birth cannot be in the future'
              });
            }
            return true;
          }
          return this.createError({ message: 'Date of birth is required' });
        }
        return true; // the field is not required, so it's always valid
      }),
    country: yup
      .string()
      .test('is-required', 'Country is required', createRequiredTest('country', 'Country is required')),
    gender: yup.string().test('is-required', 'Gender is required', createRequiredTest('gender', 'Gender is required')),
    ethnicity: yup
      .string()
      .test('is-required', 'Ethnicity is required', createRequiredTest('ethnicity', 'Ethnicity is required')),
    firstGenStudent: yup
      .string()
      .test(
        'is-required',
        'First generation student is required',
        createRequiredTest('firstGenerationStudent', 'First generation student is required')
      )
  });

  const [loader, setLoader] = useState(false);
  const [headshot, setHeadshot] = useState<any>('');

  const selectedCountryObject: CountryType | undefined = countryCodeArray.find(
    (country) => country.dial_code === data.phonePrefix
  );

  const [selectedCountry, setSelectedCountry] = React.useState<CountryType | null>(selectedCountryObject || null);

  useEffect(() => {
    setSelectedCountry(() => selectedCountryObject || null);
  }, [selectedCountryObject]);

  const handleCountryChange = (value: CountryType | null) => {
    setSelectedCountry(value);
  };

  useEffect(() => {
    setHeadshot(data?.headshot);
  }, [data?.headshot]);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });
  const loginUserData = useAppSelector((state) => state?.userProfile?.data) || [];

  useEffect(() => {
    reset({
      ...data,
      category: userTypes.includes(data.category) ? data.category : null
    });
  }, [data]);

  useEffect(() => {
    const role = localStorage.getItem('role') || '';
    if (role !== ROLES.platAdmin) {
      dispatch(fetchOrgDetails(getUserDetails().orgId));
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { firstName, lastName, phoneNumber, category, firstGenStudent, timezone, gender, country, ethnicity } = data;
    const submitFormData = new FormData();
    const date = data.dob ? moment(data.dob).format('YYYY-MM-DD') : '';
    setLoader(true);
    const dataWithId: any = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phonePrefix: selectedCountry?.dial_code || _.get(loginUserData, 'phonePrefix', ''),
      phoneNumber,
      category,
      firstGenStudent,
      timezone,
      gender,
      country,
      image: headshot || _.get(loginUserData, 'headshot', ''),
      dob: date,
      ethnicity
    };

    const phoneNumberValidationResult = await validatePhoneNumber(data.phoneNumber, selectedCountry);
    if (phoneNumberValidationResult && !phoneNumberValidationResult.isValid) {
      // Handle invalid phone number...

      return;
    }

    const newData: any = {};
    for (let i in dataWithId) {
      if (i === 'disability') {
        newData[i] = JSON.stringify(dataWithId[i]?.join(','));
      } else {
        newData[i] = dataWithId[i];
      }
    }
    for (let i in newData) {
      submitFormData?.append(i, newData[i]);
    }

    try {
      const response = await API.updateUserProfile({
        orgId: getUserDetails().orgId,
        data: submitFormData
      });
      if (response.status === 200 && response.statusText === 'OK') {
        dispatch(userInfoUpdate(response.data));
        setLoader(false);
        setOpen(false);
        if (optionalFields.disabilityType && disability.length === 0) {
          dispatch(
            disabilityPopupActions.handleDisabilityPopup({
              open: true,
              disable: true
            })
          );
        }
      }
    } catch (e: any) {
      setLoader(false);
      toast.error('Something went wrong');
    }
  };

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const photo = event?.target?.files ? event?.target?.files[0] : null;
    if (photo && photo?.size <= 10 * 1024 * 1024) {
      setHeadshot(photo);
    } else if (photo && photo?.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds the 10 MB limit. Please choose a smaller file.');
      return headshot;
    }
  };

  const handleClose = () => {
    if (!disableClose) {
      setOpen(false);
      reset({
        ...data,
        category: userTypes.includes(data.category) ? data.category : null
      });
      setHeadshot(data?.headshot);
    }
  };

  const genderArray = [
    { name: 'Prefer not to say', value: 'Prefer not to say' },
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Non-binary', value: 'Non-binary' }
  ];

  // const categoryArray = [
  //   { label: "Student", value: "Student" },
  //   { label: "Alumni", value: "Alumni" },
  //   { label: "Faculty", value: "Faculty" },
  //   // { label: "Program friend", value: "Program friend" },
  //   { label: "Program Friend", value: "Program Friend" },
  // ];

  const ethnicityArray = [
    { label: 'Prefer not to say', value: 'Prefer not to say' },
    {
      label: 'American Indian or Alaska Native',
      value: 'American Indian or Alaska Native'
    },
    { label: 'Asian', value: 'Asian' },
    { label: 'Black or African American', value: 'Black or African American' },
    { label: 'Hispanic or Latino', value: 'Hispanic or Latino' },
    {
      label: 'Native Hawaiian or Other Pacific Islander',
      value: 'Native Hawaiian or Other Pacific Islander'
    },
    { label: 'White', value: 'White' }
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEnforceFocus
    >
      <DialogTitle id="alert-dialog-title" className="informationtext">
        Personal information
        <IconButton onClick={handleClose} style={{ float: 'right' }} disabled={disableClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent style={{ overflowX: 'hidden' }}>
        <Box sx={{ display: 'flex', columnGap: '20px', alignItems: 'center' }}>
          <Box>
            <IconButton>
              <label
                htmlFor="head"
                style={{
                  padding: 0,
                  margin: 0,
                  width: '80px',
                  height: '80px',
                  borderRadius: '80px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={typeof headshot === 'string' ? headshot : URL.createObjectURL(headshot)}
                  alt="Plz save"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: '80px',
                    height: '80px',
                    borderRadius: '80px',
                    cursor: 'pointer',
                    objectFit: 'cover'
                  }}
                />
                {/* <ChatAvatarComponent
                    image={
                      typeof headshot === "string"
                        ? headshot
                        : URL.createObjectURL(headshot)
                    }
                    firstLetter={getUserDetails().firstName.charAt(0)}
                    height="80px"
                    width="80px"
                    type="no status"
                  /> */}
              </label>
              <input
                id="head"
                name="headshot"
                hidden
                accept=".png,.jpeg,.jpg"
                type="file"
                onChange={handlePhotoChange}
                style={{
                  padding: 0,
                  margin: 0,
                  width: '80px',
                  height: '80px',
                  borderRadius: '80px',
                  cursor: 'pointer'
                }}
              />
            </IconButton>
          </Box>
          <Box>
            <Box
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '14px',
                fontWeight: '600',
                color: '#000',
                lineHeight: '19px'
              }}
            >
              Profile Image
            </Box>
            <Box
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '10px',
                fontWeight: '600',
                color: '#999999',
                lineHeight: '14px',
                marginTop: '5px'
              }}
            >
              * Only JPG, PNG, SVG or GIF (max. 800x800 px)
            </Box>
          </Box>
        </Box>
        <Box sx={{ paddingTop: '5px' }}>
          <Grid container spacing={2} className="editprofile">
            <Grid item xs={6}>
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
                First Name *
              </InputLabel>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="firstName"
                    value={value}
                    type="text"
                    placeholder="John"
                    variant="outlined"
                    style={{ width: '100%' }}
                    onChange={onChange}
                    error={checkError('firstName')}
                    helperText={getError('firstName')?.toString()}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
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
                Last Name *
              </InputLabel>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="lastName"
                    value={value}
                    type="text"
                    placeholder="Smith"
                    variant="outlined"
                    style={{ width: '100%', fontWeight: '600' }}
                    onChange={onChange}
                    error={checkError('lastName')}
                    helperText={getError('lastName')?.toString()}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} className="email-profile">
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
                Email *
              </InputLabel>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="email"
                    // value={value}
                    type="email"
                    placeholder="John@gmail.com"
                    defaultValue={getUserDetails().email}
                    variant="outlined"
                    style={{
                      width: '100%',
                      background: '#EFF0F4',
                      padding: '14.5px !important'
                    }}
                    onChange={onChange}
                    error={checkError('email')}
                    helperText={getError('email')?.toString()}
                    disabled
                  />
                )}
              />
            </Grid>
            {/* <Grid item md={6}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    marginBottom: "10px",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#68717A",
                  }}
                >
                  Phone Number *{" "}
                  <span>
                    {" "}
                    <HelpOutlineIcon
                      sx={{
                        width: "15px !important",
                        height: "15px !important",
                        color: "#ABB5BE",
                        marginLeft: "4px",
                      }}
                    />
                  </span>
                </InputLabel>
                <Grid container spacing={1}>
                  <Grid item md={5} className="editPhonePrefix">
                    <FormControl fullWidth>
                      <Autocomplete
                        id="country-select-demo"
                        sx={{ width: 300 }}
                        options={countryCodeArray}
                        autoHighlight
                        getOptionLabel={getOptionLabel}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                            {option.dial_code}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            style={{ width: "100px" }}
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "none",
                            }}
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: selectedCountry && (
                                <>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                                    alt=""
                                  />
                                </>
                              ),
                            }}
                          />
                        )}
                        onChange={handleCountryChange}
                        value={selectedCountry}
                        // disableClearable
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={7}>
                    <Controller
                      name={"phoneNumber"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          required
                          name="phoneNumber"
                          value={value}
                          type="text"
                          placeholder="1234567890"
                          variant="outlined"
                          style={{ width: "100%" }}
                          onChange={onChange}
                          error={Boolean(errors.phoneNumber)}
                          helperText={
                            errors.phoneNumber
                              ? String(errors.phoneNumber.message)
                              : ""
                          }
                          inputProps={{
                            maxLength: 15,
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid> */}

            <PhoneInput
              countryCodeArray={countryCodeArray}
              data={data}
              control={control}
              errors={errors}
              onChange={handleCountryChange}
              name="phoneNumber"
              showMark={true}
            />

            <Grid item md={6}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '15px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                Gender {optionalFields.gender && '*'}
              </InputLabel>
              <FormControl fullWidth className="country-field">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Autocomplete
                        fullWidth
                        id="tags-standard"
                        options={genderArray}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, option) => onChange(option ? option.value : '')}
                        value={genderArray.find((option) => option.value === value) || null}
                        autoHighlight
                        renderOption={(props, option) => {
                          return (
                            <Box component="li" {...props}>
                              {option.name}
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" size="small" placeholder="Choose Gender" />
                        )}
                      />
                    );
                  }}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('gender')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6}>
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
                Category *
              </InputLabel>
              <FormControl fullWidth className="country-field">
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Autocomplete
                        fullWidth
                        id="tags-standard"
                        options={userTypes}
                        getOptionLabel={(option) => option}
                        onChange={(_, option) => onChange(option ? option : '')}
                        value={value}
                        autoHighlight
                        isOptionEqualToValue={(option, value) => option === value || value === ''}
                        renderOption={(props, option) => {
                          return (
                            <Box component="li" {...props}>
                              {option}
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" size="small" placeholder="Choose Category" />
                        )}
                      />
                    );
                  }}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('category')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6}>
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
                DOB {optionalFields.dob && '*'}
              </InputLabel>
              <Controller
                name="dob"
                control={control}
                render={({ field: { onChange, value } }) => {
                  const currentDate = moment().format('YYYY-MM-DD');
                  const selectedDate = value ? moment(value).format('YYYY-MM-DD') : null;
                  // const isFutureDate =
                  //   selectedDate && moment(selectedDate).isAfter(currentDate);

                  return (
                    <TextField
                      name="dob"
                      className="profile-celender"
                      placeholder="MM/DD/YYYY"
                      value={selectedDate}
                      type="date"
                      variant="outlined"
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const isValidDate = selectedValue && moment(selectedValue).isSameOrBefore(currentDate);

                        if (isValidDate) {
                          onChange(selectedValue);
                        } else {
                          onChange(null);
                        }
                      }}
                      error={checkError('dob')}
                      helperText={getError('dob')?.toString()}
                      inputProps={{
                        max: currentDate // Prevent selecting future dates in the date picker
                      }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '10px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                  // paddingBottom: "8px",
                }}
              >
                Country {optionalFields.country && '*'}
              </InputLabel>
              <FormControl fullWidth className="country-field">
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Autocomplete
                        // autoComplete="off"
                        fullWidth
                        id="tags-standard"
                        options={sortedCountries}
                        getOptionLabel={(option) => option?.label}
                        onChange={(_, option) => onChange(option ? option.code : '')}
                        value={sortedCountries?.find((option) => option?.code === value) || null}
                        autoHighlight
                        renderOption={(props, option) => {
                          return (
                            <Box component="li" {...props}>
                              {option.label}
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="small"
                            placeholder="Choose Country"
                            autoComplete="off"
                          />
                        )}
                      />
                    );
                  }}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('country')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6}>
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
                Ethnicity {optionalFields.ethnicity && '*'}
              </InputLabel>
              <FormControl fullWidth className="ethnicity-field">
                <Controller
                  name="ethnicity"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Autocomplete
                        fullWidth
                        id="tags-standard"
                        options={ethnicityArray}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, option) => onChange(option ? option.value : '')}
                        value={ethnicityArray?.find((option) => option.value === value) || null}
                        autoHighlight
                        renderOption={(props, option) => {
                          return (
                            <Box component="li" {...props}>
                              {option.label}
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="small"
                            placeholder="Choose Ethnicity"
                            autoComplete="false"
                          />
                        )}
                      />
                    );
                  }}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('ethnicity')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6}>
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
                Time Zone *
              </InputLabel>
              <FormControl fullWidth className="ethnicity-field">
                <Controller
                  name="timezone"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Autocomplete
                        fullWidth
                        id="tags-standard"
                        options={timezones}
                        getOptionLabel={(option) => option?.text}
                        onChange={(_, option) => onChange(option ? option.value : '')}
                        value={timezones.find((option) => option.value === value) || null}
                        autoHighlight
                        renderOption={(props, option) => {
                          return (
                            <Box component="li" {...props}>
                              {option.text}
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" size="small" placeholder="Choose Timezone" />
                        )}
                      />
                    );
                  }}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('timezone')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6}>
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
                First generation student {optionalFields.firstGenerationStudent && '*'}
              </InputLabel>
              <FormControl fullWidth>
                <Controller
                  control={control}
                  name="firstGenStudent"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      name="firstGenStudent"
                      id="demo-simple-select"
                      value={value || ''}
                      onChange={onChange}
                      fullWidth
                      style={{ width: '100%' }}
                      required
                      error={checkError('firstGenStudent')}
                      displayEmpty
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText style={{ color: 'red' }}>{getError('firstGenStudent')?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions style={{ padding: '15px 0', justifyContent: 'center' }}>
        <LoadingButton
          style={
            loader
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
          onClick={handleSubmit(onSubmit)}
          loading={loader}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
