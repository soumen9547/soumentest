/* eslint-disable prefer-destructuring */
/* eslint-disable radix */
/* eslint-disable no-duplicate-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, ChangeEvent, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
import { useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../../../../../redux/hooks';
import { AppLoader } from '../../../../../../../components/AppLoader';
import { API } from '../../../../../../../api';
import { useLocation, useParams } from 'react-router-dom';
import { grpDetailsActions } from '../../../../../../../redux/slices/group-details/groupDetails';
import { breadCrumbsActions } from '../../../../../../../redux/slices/breadcrumbs/breadcrumbsSlice';
import upload from '../../../../../../../assets/images/upload.svg';
import { groupActions } from '../../../../../../../redux/slices/getAllGroups/getAllGroupsSlice';
import ChatAvatarComponent from '../../../../chat/ChatAvatarComponent';
import {
  Controller,
  // FieldValues,
  // SubmitHandler,
  useForm
} from 'react-hook-form';
import { Divider, Grid, InputLabel, TextField, IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  basicSettingHeading: {
    color: '#152536 !important',
    fontSize: '18px !important',
    fontFamily: 'Open Sans !important',
    padding: '16px !important'
  },
  inputLabelHeading: {
    marginBottom: '10px',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    fontWeight: '400',
    color: '#68717A'
  },
  optionalFieldHeading: {
    color: '#152536 !important',
    fontSize: '16px !important',
    fontFamily: 'Open Sans !important'
  }
});

const BasicSettings = () => {
  const dispatch = useAppDispatch();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  // const { orgId = "", grpId = "" } = useParams();
  const grpId = useParams().id || '';
  const orgId = useParams().orgId || '';

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saveLoader, setSaveLoader] = useState(false);
  const [optional, setOptional] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<any>(false);
  const [tempImage, setTempImage] = useState<any>(null);
  const [inputFields, setInputFields] = useState<any>({
    nam: false,
    end: false,
    logo: false,
    mentee: false,
    mentor: false
  });
  const { nam, end, logo, mentee, mentor } = inputFields;
  const groupData = useAppSelector((state) => state.groupDetails);
  const { state } = useLocation();
  const classes = useStyles();
  const nameFirstTimeRender = useRef(true);
  const maxMatchFirstTimeRender = useRef(true);
  const optionalFirstTimeRender = useRef(true);

  const optionalFieldsArray = [
    {
      label: 'Gender',
      name: 'gender'
    },
    {
      label: 'Ethnicity',
      name: 'ethnicity'
    },
    {
      label: 'First Generation Student',
      name: 'firstGenerationStudent'
    },
    {
      label: 'Disability Type',
      name: 'disabilityType'
    },
    {
      label: 'DOB',
      name: 'dob'
    },
    {
      label: 'Country',
      name: 'country'
    }
  ];

  const yupFieldRequirements = Yup.object({
    name: Yup.string()
      .required('Program Name is required')
      .test('no-empty-spaces', 'Program Name cannot be all empty spaces', (value) => {
        if (value) {
          return !/^[\s]+$/.test(value);
        }
        return true;
      })
      .min(3, 'Program Name must be at least 3 characters')
      .max(25, 'Maximum 25 characters'),
    endDate: Yup.date()
      .nullable()
      .min(new Date(new Date().setDate(new Date().getDate() - 1)), 'Event date must be in the future or today')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      })
      .typeError('End date must be a valid date'),
    logo: Yup.mixed()
      .test('fileValidation', '', (value, { createError }) => {
        if (!value || !(value instanceof File)) {
          return true;
        }
        if (value.size > 5 * 1024 * 1024) {
          return createError({ message: 'File size must not exceed 5MB' });
        }
        if (!/\.(jpg|jpeg|png|svg|gif)$/i.test(value.name)) {
          return createError({
            message: 'Only jpg, png, svg, and gif files are allowed'
          });
        }
        return true;
      })
      .nullable(),
    maxMatchesPerMentee: Yup.number()
      .required('Maximum matches per mentee required')
      .min(1, 'Max matches per mentee should not be less than 1')
      .transform((value, originalValue) => {
        // If the original value is an empty string, return null to allow it as a valid value
        if (originalValue === '') {
          return null;
        }
        return value;
      })
      .typeError('Please Enter a Number'),
    maxMatchesPerMentor: Yup.number()
      .required('Maximum matches per mentor required')
      .min(1, 'Max matches per mentor should not be less than 1')
      .transform((value, originalValue) => {
        // If the original value is an empty string, return null to allow it as a valid value
        if (originalValue === '') {
          return null;
        }
        return value;
      })
      .typeError('Please Enter a Number')
  });

  const {
    control,
    // handleSubmit,
    formState: { errors },
    reset,
    getValues,
    trigger
  } = useForm({
    resolver: yupResolver(yupFieldRequirements)
  });

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, fieldOnChange: (file: File | null) => void) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      fieldOnChange(droppedFile);
      event.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    if (groupData?.data) {
      const { name, logo, endDate } = groupData.data;
      const formattedEndDate = endDate ? moment.unix(endDate).format('yyyy-MM-DD') : '';
      const {
        gender = false,
        country = false,
        firstGenerationStudent = false,
        dob = false,
        ethnicity = false,
        disabilityType = false
      } = groupData.data.optionalFields || {};

      const { maxMatchesPerMentee = 1, maxMatchesPerMentor = 1 } = groupData?.data?.matchesSettings || {
        maxMatchesPerMentee: 1,
        maxMatchesPerMentor: 1
      };

      const initialData = {
        name,
        logo,
        endDate: formattedEndDate,
        gender,
        country,
        firstGenerationStudent,
        dob,
        ethnicity,
        disabilityType,
        maxMatchesPerMentee,
        maxMatchesPerMentor
      };
      reset(initialData);
    }
  }, [groupData?.data]);

  useEffect(() => {
    if (nameFirstTimeRender.current) {
      nameFirstTimeRender.current = false;
      return;
    }
    BasicsSettingsDispatch();
  }, [nam, end, logo]);

  useEffect(() => {
    if (optionalFirstTimeRender.current) {
      optionalFirstTimeRender.current = false;
      return;
    }
    const ClearOut = setTimeout(() => {
      OptionalFeildsDispatch();
      // maxMatchesPerDispatch();
      // BasicsSettingsDispatch();
    }, 0);
    return () => {
      clearTimeout(ClearOut);
    };
  }, [optional]);

  useEffect(() => {
    if (maxMatchFirstTimeRender.current) {
      maxMatchFirstTimeRender.current = false;
      return;
    }
    const ClearOut = setTimeout(() => {
      maxMatchesPerDispatch();
    }, 0);
    return () => {
      clearTimeout(ClearOut);
    };
  }, [mentor, mentee]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      callAllUpdateApi();
      event.preventDefault();
      event.returnValue = '';
      return 'Are you sure you want to leave?';
    };
    const handleUnload = () => {};

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      if (state?.noUpdateAPICall === undefined) {
        callAllUpdateApi();
      } else {
        state.noUpdateAPICall = undefined;
      }
    };
  }, []);

  const callAllUpdateApi = () => {
    BasicsSettingsUpdate();
    optionalFieldUpdate();
    maxMatchesPerUpdate();
  };

  const submitForm = async (data: any) => {
    if (imageUploaded) {
      setSaveLoader(true);
      data.endDate = data.endDate ? moment(data.endDate).format('yyyy-MM-DD') : '';
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      try {
        const response = await API.updateGroupInfo({
          orgId,
          grpId,
          formData
        });
        if (response.status === 200 && response.statusText === 'OK') {
          setSaveLoader(false);
          toast.success('Image Uploaded Successfully');
          const { name, endDate, logo } = response.data.groupDetails;
          dispatch(grpDetailsActions.updateGroupInfo({ name, endDate, logo }));
          dispatch(
            breadCrumbsActions.updateBreadCrumbName({
              id: grpId,
              name
            })
          );
          dispatch(groupActions.updateMainGroupName(name));
          callAllUpdateApi();
          setImageUploaded(false);
          setTempImage(null);
        }
      } catch (e) {
        setSaveLoader(false);
        toast.error("Couldn't update Image");
        setImageUploaded(false);
        setTempImage(null);
      }
    }
  };

  const BasicsSettingsDispatch = async () => {
    if (
      !checkError('name') &&
      !checkError('endDate') &&
      !checkError('logo') &&
      !checkError('maxMatchesPerMentee') &&
      !checkError('maxMatchesPerMentor')
    ) {
      if (groupData?.data) {
        const data = {
          endDate: !checkError('endDate')
            ? getValues('endDate')
            : moment.unix(groupData?.data?.endDate).format('yyyy-MM-DD'),
          name: !checkError('name') ? getValues('name') : groupData?.data?.name,
          logo: !checkError('logo') ? getValues('logo') : groupData?.data?.logo
        };

        data.endDate = data.endDate ? moment(data.endDate).unix() : 0;
        dispatch(grpDetailsActions.updateGroupInfo({ ...data }));
      }
    }
  };

  const BasicsSettingsUpdate = async () => {
    if (groupData?.data && !imageUploaded) {
      const data: any = {
        endDate: getValues('endDate'),
        name: getValues('name'),
        logo: tempImage ? tempImage : getValues('logo')
      };
      setSaveLoader(true);
      data.endDate = data.endDate ? moment(data.endDate).format('yyyy-MM-DD') : '';
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      try {
        const response = await API.updateGroupInfo({
          orgId,
          grpId,
          formData
        });
        if (response.status === 200 && response.statusText === 'OK') {
          setSaveLoader(false);
          const { name } = response.data.groupDetails;
          dispatch(grpDetailsActions.updateGroupInfo(response.data.groupDetails));
          dispatch(
            breadCrumbsActions.updateBreadCrumbName({
              id: grpId,
              name
            })
          );
          dispatch(groupActions.updateMainGroupName(name));
        }
      } catch (e) {
        setSaveLoader(false);
      }
    }
  };

  const maxMatchesPerDispatch = async () => {
    if (
      !checkError('name') &&
      !checkError('endDate') &&
      !checkError('logo') &&
      !checkError('maxMatchesPerMentee') &&
      !checkError('maxMatchesPerMentor')
    ) {
      if (groupData?.data) {
        try {
          const { maxMatchesPerMentee = 1, maxMatchesPerMentor = 1 } = getValues();
          const matchesSettings = { maxMatchesPerMentee, maxMatchesPerMentor };
          dispatch(grpDetailsActions.updateGroupInfo({ matchesSettings }));
        } catch (e) {
          setSaveLoader(false);
        }
      }
    }
  };

  const maxMatchesPerUpdate = async () => {
    // if(!checkError("maxMatchesPerMentee") && !checkError("maxMatchesPerMentor") ){
    if (groupData?.data) {
      try {
        const { maxMatchesPerMentee = 1, maxMatchesPerMentor = 1 } = getValues();
        const response = await API.updateAllMatches({
          grpId,
          orgId,
          data: { maxMatchesPerMentee, maxMatchesPerMentor }
        });
        if (response?.status === 200) {
          setSaveLoader(false);
          // toast.success("MaxMatches Uploaded Successfully");
          // setSaveLoader(false);
          // toast.success("End Date Uploaded Successfully");
          const { name } = response.data.data;
          const matchesSettings = { ...response.data.data.matchesSettings };
          dispatch(grpDetailsActions.updateGroupInfo({ matchesSettings }));
          dispatch(
            breadCrumbsActions.updateBreadCrumbName({
              id: grpId,
              name
            })
          );
          dispatch(groupActions.updateMainGroupName(name));
        }
      } catch (e) {
        setSaveLoader(false);
        // toast.error("Couldn't update MaxMatches");
      }
    }
    // }
  };

  const OptionalFeildsDispatch = async () => {
    // if(!checkError("name") && !checkError("endDate") && !checkError("logo") ){
    if (groupData?.data) {
      try {
        const optionalFields = {
          gender: getValues('gender'),
          ethnicity: getValues('ethnicity'),
          country: getValues('country'),
          firstGenerationStudent: getValues('firstGenerationStudent'),
          dob: getValues('dob'),
          disabilityType: getValues('disabilityType')
        };
        dispatch(
          grpDetailsActions.updateGroupInfo({
            optionalFields: optionalFields
          })
        );
      } catch (e) {
        setSaveLoader(false);
      }
    }
  };

  const optionalFieldUpdate = async () => {
    if (groupData?.data) {
      try {
        const optionalFields = {
          gender: getValues('gender'),
          ethnicity: getValues('ethnicity'),
          country: getValues('country'),
          firstGenerationStudent: getValues('firstGenerationStudent'),
          dob: getValues('dob'),
          disabilityType: getValues('disabilityType')
        };
        const response = await API.updateOptionalFields({
          grpId,
          data: optionalFields
        });
        if (response.status === 200) {
          setSaveLoader(false);
          const updatedOptionalFields = { ...response?.data?.optionalFields };
          dispatch(
            grpDetailsActions.updateGroupInfo({
              optionalFields: updatedOptionalFields
            })
          );
        }
      } catch (e) {
        setSaveLoader(false);
      }
    }
  };

  const uploadImage = () => {
    if (groupData?.data && imageUploaded) {
      const data = {
        endDate: getValues('endDate'),
        name: getValues('name'),
        logo: tempImage ? tempImage : getValues('logo')
      };
      if (
        imageUploaded &&
        data.logo &&
        !checkError('name') &&
        !checkError('endDate') &&
        !checkError('logo') &&
        !checkError('maxMatchesPerMentee') &&
        !checkError('maxMatchesPerMentor')
      ) {
        submitForm(data);
      }
    }
  };

  if (groupData.loading) {
    return <AppLoader />;
  }

  if (groupData.error) {
    return <div>{groupData.errorText}</div>;
  }

  if (groupData.data) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            sx={{
              background: '#fff',
              border: '1px solid #EFF0F4',
              borderRadius: '8px'
            }}
          >
            <Typography sx={{ fontWeight: '600 !important' }} className={classes.basicSettingHeading}>
              Basic Settings
            </Typography>
            <Divider />
            <Box sx={{ padding: '20px' }}>
              <Grid container spacing={2} className="basicSettings">
                <Grid item xs={12}>
                  <InputLabel className={classes.inputLabelHeading} id="demo-simple-select-label">
                    Program Name *
                  </InputLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="outlined"
                        required
                        type="text"
                        name="name"
                        onChange={(e) => {
                          onChange(e.target.value);
                          trigger('name');
                        }}
                        value={value || ''}
                        onBlur={() => {
                          trigger('name');
                          if (!checkError('name')) {
                            setInputFields({ ...inputFields, nam: !nam });
                          }
                        }}
                        error={checkError('name')}
                        helperText={getError('name')?.toString()}
                        placeholder="John"
                        style={{ width: '100%' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel className={classes.inputLabelHeading} id="demo-simple-select-label">
                    End Date
                  </InputLabel>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        type="date"
                        name="endDate"
                        placeholder="Select Date"
                        onChange={(e) => {
                          onChange(e.target.value);
                          trigger('endDate');
                        }}
                        error={checkError('endDate')}
                        helperText={getError('endDate')?.toString()}
                        onBlur={() => {
                          trigger('endDate');
                          if (!checkError('endDate')) {
                            setInputFields({ ...inputFields, end: !end });
                          }
                        }}
                        value={value || ''}
                        variant="outlined"
                        style={{ width: '100%' }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider />

            <Box sx={{ padding: '20px' }}>
              <Typography sx={{ fontWeight: '600 !important' }} className={classes.optionalFieldHeading}>
                Optional Fields
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  columnGap: '20px',
                  paddingTop: '10px'
                }}
              >
                <Box display="flex" flexWrap="wrap" width="100%">
                  {optionalFieldsArray.map((each, index: any) => {
                    return (
                      <Controller
                        key={index}
                        name={each.name}
                        control={control}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '50%'
                              }}
                            >
                              <Switch
                                {...label}
                                checked={!!value}
                                onChange={(e) => {
                                  onChange(e.target.checked);
                                  setOptional(!optional);
                                }}
                                name={each.name}
                              />
                              <Typography>{each.label} </Typography>
                            </Box>
                          );
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: '20px', paddingTop: '0px' }}>
              <Typography sx={{ fontWeight: '600 !important' }} className={classes.optionalFieldHeading}>
                Matches Settings
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  columnGap: '20px',
                  paddingTop: '17px'
                }}
              >
                <Grid item xs={6}>
                  <InputLabel className={classes.inputLabelHeading} id="demo-simple-select-label">
                    Maximum matches per mentee *
                  </InputLabel>
                  <Controller
                    control={control}
                    name="maxMatchesPerMentee"
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        onBlur={() => {
                          trigger('maxMatchesPerMentee');
                          if (!checkError('maxMatchesPerMentee')) {
                            setInputFields({ ...inputFields, mentee: !mentee });
                          }
                        }}
                        type="number"
                        placeholder="0"
                        variant="outlined"
                        style={{ width: '100%' }}
                        onChange={(e) => {
                          const inputValue = e.target.value.trim() === '' ? '' : parseInt(e.target.value);
                          onChange(inputValue);
                          trigger('maxMatchesPerMentee');
                        }}
                        // onChange={onChange}
                        name="maxMatchesPerMentee"
                        value={value || ''}
                        // inputProps={{ min: 1 }}
                        error={checkError('maxMatchesPerMentee')}
                        helperText={getError('maxMatchesPerMentee')?.toString()}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel className={classes.inputLabelHeading} id="demo-simple-select-label">
                    Maximum matches per mentor *
                  </InputLabel>
                  <Controller
                    control={control}
                    name="maxMatchesPerMentor"
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        onBlur={() => {
                          trigger('maxMatchesPerMentor');
                          if (!checkError('maxMatchesPerMentor')) {
                            setInputFields({ ...inputFields, mentee: !mentee });
                          }
                        }}
                        type="number"
                        placeholder="0"
                        variant="outlined"
                        style={{ width: '100%' }}
                        onChange={(e) => {
                          const inputValue = e.target.value.trim() === '' ? '' : parseInt(e.target.value);
                          onChange(inputValue);
                          trigger('maxMatchesPerMentor');
                        }}
                        value={value || ''}
                        name="maxMatchesPerMentor"
                        // inputProps={{ min: 1 }}
                        error={checkError('maxMatchesPerMentor')}
                        helperText={getError('maxMatchesPerMentor')?.toString()}
                      />
                    )}
                  />
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              background: '#fff',
              border: '1px solid #EFF0F4',
              borderRadius: '8px',
              height: 'calc(100vh - 60px)',
              position: 'relative'
            }}
          >
            <Typography sx={{ fontWeight: '600 !important' }} className={classes.basicSettingHeading}>
              Program Logo
            </Typography>
            <Divider />
            <Box sx={{ padding: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '25px'
                }}
              >
                <Box sx={{ marginRight: '6px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        height: '50px',
                        background: '#fff',
                        borderRadius: '50%'
                      }}
                    >
                      <ChatAvatarComponent
                        firstLetter={_.get(groupData, 'data.name', '')
                          .split(' ')
                          .map((each: string) => each[0])
                          .join('')
                          .toUpperCase()}
                        width="50px"
                        height="50px"
                        image={_.get(groupData, 'data.logo', '')}
                        type="no status"
                        fontSize="16x"
                      />
                      {/* <img
                        src={womenimg}
                        alt="womencircle"
                        style={{
                          padding: 0,
                          margin: 0,
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      /> */}
                    </Box>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    color: '#152536'
                  }}
                >
                  Upload Logo
                </Typography>
              </Box>
              <Controller
                name="logo"
                control={control}
                render={({ field: { onChange, value } }) => {
                  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files?.length) {
                      setImageUploaded(true);
                      setTempImage(event.target.files?.[0]);
                      setInputFields({ ...inputFields, logo: !logo });
                    } else if (event.target.value === '') {
                      setImageUploaded(false);
                    }
                  };
                  return (
                    <>
                      <Box
                        sx={{
                          background: '#FFFFFF',
                          border: '1px dashed #DEDFDF',
                          borderRadius: '8px',
                          padding: '5px 22px 15px',
                          margin: '25px 0',
                          cursor: 'pointer'
                        }}
                        onDrop={(event) => handleDrop(event, onChange)}
                        onDragOver={handleDragOver}
                        onClick={handleImageClick}
                      >
                        <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
                          <IconButton>
                            <img
                              src={upload}
                              alt="upload"
                              style={{
                                padding: 0,
                                margin: 0,
                                width: '25px',
                                height: '25px'
                              }}
                            />
                          </IconButton>
                          <input
                            id="selectedImage"
                            ref={fileInputRef}
                            name="logo"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                          />

                          <Typography color="error" variant="body2" style={{ fontSize: '12px' }}>
                            {getError('logo')?.toString()}
                          </Typography>

                          <Box
                            sx={{
                              fontFamily: 'Open Sans',
                              fontWeight: '600',
                              fontSize: '12px',
                              color: ' #999999'
                            }}
                          >
                            <span style={{ color: '#3D8BFD', fontSize: '14' }}> Click to upload </span>
                            or drag and drop
                            <br />
                            JPG, PNG, SVG or GIF
                            <br />
                            (max. 800x800 px)
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Open Sans',
                            fontWeight: '600',
                            fontSize: '10px',
                            // color: " #999999",
                            color: 'green',
                            marginLeft: '20px'
                          }}
                        >
                          <Typography variant="body1" style={{ fontSize: '13px' }}>
                            {tempImage?.name}
                          </Typography>

                          {typeof tempImage !== 'string' && imageUploaded && (
                            <span onClick={(event) => event.stopPropagation()}>
                              <IconButton
                                onClick={(event) => {
                                  setTempImage('');
                                  setImageUploaded(false);
                                }}
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            </span>
                          )}
                        </Box>
                        <Box
                          sx={{
                            width: '100px',
                            height: '100px',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '20px 0',
                            marginTop: '0px'
                          }}
                        >
                          {typeof tempImage !== 'string' && imageUploaded && (
                            <img
                              src={tempImage ? URL.createObjectURL(tempImage) : ''}
                              alt="preview"
                              style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '60%',
                                marginBottom: '20px'
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </>
                  );
                }}
              />
            </Box>

            <Box
              sx={{
                padding: '20px',
                // textAlign: "center",
                position: 'absolute',
                right: '0',
                bottom: '0'
              }}
            >
              <LoadingButton
                style={
                  saveLoader
                    ? {
                        borderRadius: '8px',
                        width: '146px',
                        height: '50px'
                        // border: "1px solid #152536",
                      }
                    : {
                        width: '146px',
                        height: '50px',
                        background: '#152536',
                        borderRadius: '8px',
                        fontFamily: 'Open Sans',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#fff'
                      }
                }
                onClick={() => {
                  uploadImage();
                }}
                loading={saveLoader}
              >
                Save
              </LoadingButton>
              <button hidden ref={buttonRef}>
                Save
              </button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default BasicSettings;
