/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-invalid-this */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IconButton, Divider, Grid, InputLabel, TextField, Select, MenuItem, FormHelperText } from '@mui/material';

import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../../../redux/hooks';
import { groupUsersActions } from '../../../../../redux/slices/group-users/groupUsersSlice';
import _ from 'lodash';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import { API } from '../../../../../api';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import countryCodeArray from '../../../../../constants/countrycode';
import { validatePhoneNumber } from '../../../../../constants/PhoneNumberValidator';
import PhoneInput from '../../../../../constants/PhoneInput';
import { ValidationError } from 'yup';

interface Props {
  handleClose: any;
  data?: any;
  openDialog: boolean;
  setOpenDialog: any;
  type: string;
}

interface CountryType {
  name: string;
  dial_code: string;
  code: string;
}

const InviteUserDialog = ({ handleClose, data, openDialog, setOpenDialog, type }: Props) => {
  const grpId = useParams().id || '';
  const orgId = useParams().orgId || '';
  const [inviteUserLoading, setInviteUserLoading] = useState(false);
  const dispatch = useAppDispatch();

  const addUsersdetails = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .test('no-empty-spaces', 'First name cannot be all empty spaces', (value) => {
        if (value) {
          return !/^[\s]+$/.test(value);
        }
        return true;
      })
      .min(3, 'Name must be at least 3 characters')
      .max(25, 'Maximum 25 characters'),
    lastName: Yup.string()
      .required('First name is required')
      .test('no-empty-spaces', 'Last name cannot be all empty spaces', (value) => {
        if (value) {
          return !/^[\s]+$/.test(value);
        }
        return true;
      })
      .min(3, 'Name must be at least 3 characters')
      .max(25, 'Maximum 25 characters'),
    email: Yup.string()
      .transform((value) => value.trim())
      .matches(/^[A-Za-z0-9]/, 'Email must start with either Alphabet or number')
      .required('Email is required')
      .email('Email must be a valid email'),
    role: Yup.string().required('Role is required'),
    // mobileNumber: Yup.string().matches(
    //   /^(\d{10})?$/,
    //   "Enter 10 digit Mobile Number or be it Empty"
    // ),
    mobileNumber: Yup.string()
      .transform((value) => value.trim())
      .test('is-valid-phone-number', 'Invalid phone number', async function (value) {
        if (!value) {
          // Return true for empty phone number
          return true;
        }
        const { path, createError } = this;
        const validationResult = await validatePhoneNumber(value, selectedCountry);
        if (validationResult) {
          const { isValid, error } = validationResult;
          return isValid || createError({ path, message: error } as ValidationError);
        }
        return createError({
          path,
          message: 'Validation error'
        } as ValidationError);
      })
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(addUsersdetails)
  });

  const selectedCountryObject =
    data && data.phonePrefix ? countryCodeArray.find((country) => country.dial_code === data.phonePrefix) : null;

  // const [selectedCountry, setSelectedCountry] =
  //   React.useState<CountryType | null>(countryCodeArray[0] || null);

  const [selectedCountry, setSelectedCountry] = React.useState<CountryType | null>(selectedCountryObject || null);

  // console.log("selectedCountry", selectedCountry);

  const handleCountryChange = (value: CountryType | null) => {
    setSelectedCountry(value);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setInviteUserLoading(true);
    const formData = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      role: values.role,
      email: values.email.trim(),
      mobileNumber: values.mobileNumber ? values.mobileNumber.trim() : values.mobileNumber,
      // phonePrefix: selectedCountry,
      phonePrefix: selectedCountry?.dial_code
    };

    if (values.mobileNumber && selectedCountry) {
      const phoneNumberValidationResult = await validatePhoneNumber(values.mobileNumber, selectedCountry);
      if (phoneNumberValidationResult && !phoneNumberValidationResult.isValid) {
        // Handle invalid phone number...
        // console.log("Invalid phone number");
        return;
      }
    }

    try {
      const response = await API.inviteUserToAGroup({
        formData,
        orgId,
        grpId
      });
      if (response.status === 200 && response.statusText === 'OK') {
        if (response.data.userDetails) {
          dispatch(groupUsersActions.updateGroupUsers(response.data.userDetails));
        } else if (type === 'Add' && response.data.invitedUser) {
          dispatch(groupUsersActions.updateGroupInvitedUsers(response.data.invitedUser));
        } else {
          dispatch(groupUsersActions.updateInvitedUser(response.data.invitedUser));
        }
        handleCloseDialog();
        reset();
        setInviteUserLoading(false);
        handleClose();
        toast.success(_.get(response, 'data.message', 'Successful'));
      }
    } catch {
      setInviteUserLoading(false);
      toast.error('Could not invite the user');
    }
  };

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  useEffect(() => {
    if (type === 'Add') {
      reset();
    } else {
      reset(data);
    }
  }, [openDialog]);

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center !important' }}>
        <span style={{ fontWeight: '600', fontSize: '22px' }}>{type === 'Add' ? 'Add User' : 'Invite User'}</span>
        <IconButton onClick={handleCloseDialog} sx={{ float: 'right' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      <DialogContent>
        <DialogContentText id="alert-dialog-description" component="div">
          <Grid
            container
            spacing={2}
            className="editprofile"
            // component="span"
          >
            <Grid
              item
              xs={6}
              // component="span"
            >
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
                    type="text"
                    onChange={onChange}
                    value={value || ''}
                    error={checkError('firstName')}
                    helperText={getError('firstName')?.toString()}
                    placeholder="John"
                    variant="outlined"
                    style={{ width: '100%' }}
                  />
                )}
              />
              {/* <ErrorMessage name="firstName" /> */}
            </Grid>

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
                Last Name *
              </InputLabel>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="lastName"
                    type="text"
                    onChange={onChange}
                    value={value || ''}
                    error={checkError('lastName')}
                    helperText={getError('lastName')?.toString()}
                    placeholder="Smith"
                    variant="outlined"
                    style={{ width: '100%' }}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  marginBottom: '0px',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                User Role *
              </InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="role"
                    displayEmpty
                    onChange={onChange}
                    value={value || ''}
                    fullWidth
                    required
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="member">Mentee</MenuItem>
                    <MenuItem value="mentor">Mentor</MenuItem>
                    {/* <MenuItem value="programFriend">Program Friend</MenuItem> */}
                  </Select>
                )}
              />
              <FormHelperText style={{ color: '#d32f2f', paddingLeft: '10px' }}>
                {getError('role')?.toString()}
              </FormHelperText>
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  // marginBottom: "6px",
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
                    type="text"
                    placeholder="john.smith@gmail.com"
                    onChange={onChange}
                    error={checkError('email')}
                    helperText={getError('email')?.toString()}
                    value={value || ''}
                    variant="outlined"
                    style={{ width: '100%' }}
                    disabled={type !== 'Add'}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={6}>
            <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    marginTop: "-10px",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#68717A",
                    marginBottom: "10px",
                  }}
                >
                  Phone Number
                </InputLabel>
                <Grid container>
                <Grid item xs={5} className="countryHeight">
              <FormControl fullWidth>
                
                <Autocomplete
                  id="demo-simple-select"
                  options={countryCodeArray}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  getOptionLabel={(country) => `${country.dial_code}`}
                  style={{
                    // marginTop: "30px",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#68717A",
                    maxHeight: "2px",
                  }}
                  renderOption={(props, country) => (
                    <li {...props}>
                      <img
                        src={`https://flagcdn.com/64x48/${country.code.toLowerCase()}.png`}
                        alt={country.name}
                        style={{
                          padding: 0,
                          margin: 0,
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      />
                      <span>{country.dial_code}</span>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      placeholder="Choose Country"
                      value={
                        selectedCountry
                          ? `${selectedCountry.name} (${selectedCountry.dial_code})`
                          : ""
                      }
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: selectedCountry && (
                          <img
                            src={`https://flagcdn.com/64x48/${selectedCountry.code.toLowerCase()}.png`}
                            alt={selectedCountry.name}
                            // className={classes.flag}
                            style={{
                              padding: 0,
                              margin: 0,
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                              marginRight: "-7px",
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                  
                />
              </FormControl>
            </Grid>

            <Grid item xs={7}>
              
              <Controller
                name={"mobileNumber"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="mobileNumber"
                    type="number"
                    placeholder="Mobile Number"
                    variant="outlined"
                    onChange={onChange}
                    error={checkError("mobileNumber")}
                    helperText={getError("mobileNumber")?.toString()}
                    value={value || ""}
                    style={{ width: "100%", marginLeft: "8px" }}
                  />
                )}
              />
            </Grid>
                </Grid>
            </Grid> */}

            <Grid item xs={12}>
              <PhoneInput
                countryCodeArray={countryCodeArray}
                data={data}
                control={control}
                errors={errors}
                onChange={handleCountryChange}
                name="mobileNumber"
                showMark={false}
              />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>

      <DialogActions style={{ padding: '15px 0', justifyContent: 'center' }}>
        <LoadingButton
          style={
            inviteUserLoading
              ? { borderRadius: '8px', width: '560px', height: '50px' }
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
          loading={inviteUserLoading}
        >
          {type === 'Add' ? 'Add' : 'Resend Invite'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default InviteUserDialog;
