/* eslint-disable no-param-reassign */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable @typescript-eslint/no-invalid-this */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, FormControl, Grid, InputLabel } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, FormHelperText, TextField } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton/IconButton';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { API } from '../../../api';
import { getUserDetails } from '../../../utils/orgName';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userDisabilityUpdate } from '../../../redux/slices/user-profile/userProfieSlice';
import _ from 'lodash';
import { disabilityPopupActions } from '../../../redux/slices/disability/disabilityPopupSlice';

const DisabilityModal = () => {
  const userData = useAppSelector((state) => state.userProfile.data);
  const disabilityValue = userData?.personal_details?.disability || [];
  const { open, disable } = useAppSelector((state) => state.disabilityPopup);

  const [data, setData] = useState<string[]>(disabilityValue);
  const [disabilityLoader, setDisabilityLoader] = useState(false);
  const dispatch = useAppDispatch();

  const optionalFields = _.get(userData, 'settings', {
    gender: false,
    ethnicity: false,
    firstGenerationStudent: false,
    disabilityType: false,
    dob: false,
    country: false
  });

  const [error, setError] = useState(false);

  const schema = yup.object({
    disability: yup
      .array()
      .of(yup.string())
      .min(0, 'Please select at least one option')
      .test('is-required', 'Please select disability type', function (value) {
        if (optionalFields.disabilityType) {
          if (value) {
            return true; // the field is valid
          } else {
            // the field is invalid, so return a ValidationError object with an error message
            return this.createError({
              message: 'Please select disability type'
            });
          }
        } else {
          return true; // the field is not required, so it's always valid
        }
      })
  });
  const { handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    if (!disable) {
      setError(false);
      dispatch(
        disabilityPopupActions.handleDisabilityPopup({
          open: false,
          disable: false
        })
      );
    }
  };

  useEffect(() => {
    setValue('disability', disabilityValue);
    setData(disabilityValue);
  }, [open]);

  const submitForm = async () => {
    setDisabilityLoader(true);
    const { orgId } = getUserDetails();
    try {
      const response = await API.updateDisability({
        orgId,
        data: data
      });
      if (response.status === 200 && response.statusText === 'OK') {
        setDisabilityLoader(false);
        dispatch(
          disabilityPopupActions.handleDisabilityPopup({
            open: false,
            disable: false
          })
        );

        dispatch(userDisabilityUpdate(response.data));
        toast.success('Disability updated successfully');
      } else {
        toast.error('Something went wrong server');
      }
    } catch (e) {
      setDisabilityLoader(false);
      toast.error('Something went wrong');
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    // e.preventDefault();
    if (optionalFields.disabilityType) {
      if (data.length === 0) {
        setError(true);
      } else {
        setError(false);
        submitForm();
      }
    } else {
      setError(false);
      submitForm();
    }
  };

  const names = [
    'None',
    'Prefer not to say',
    'Autism Spectrum Disorder',
    'Deaf-Blindness',
    'Deafness',
    'Emotional Disturbance',
    'Hearing Impairment',
    'Intellectual Disability',
    'Multiple Disabilities',
    'Orthopedic Impairment',
    'Other Health Impairment',
    'Specific Learning Disability',
    'Speech or Language Impairment',
    'Traumatic Brain Injury',
    'Visual Impairment, including Blindness'
  ];

  const handelDisability = (event: any, value: string[]) => {
    const handle = () => {
      if (value?.includes('Prefer not to say')) {
        value = ['Prefer not to say'];
      } else if (value?.includes('None')) {
        value = ['None'];
      }
      setData(value);
    };
    if (optionalFields.disabilityType) {
      if (value.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    } else {
      setError(false);
    }
    handle();
  };

  // const handelDisability = (event:any, newValue: string[]) => {
  //   setSelectedOption(newValue);
  // }

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // sx={{ width: "600px" }}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            fontFamily: 'Open Sans',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '600',
            color: '#152536'
          }}
        >
          Disability
          <IconButton onClick={handleClose} sx={{ float: 'right' }} disabled={disable}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '15px 24px 10px', height: '125px' }}>
          <Box sx={{ padding: ' 10px 0' }}>
            <Grid container>
              <Grid item lg={12}>
                <InputLabel id="demo-simple-select-label" style={{ paddingBottom: '10px' }}>
                  Disability Type
                </InputLabel>
                <FormControl fullWidth>
                  <Autocomplete
                    className="hobbies-field"
                    multiple
                    options={names}
                    getOptionLabel={(option) => option}
                    value={data}
                    onChange={handelDisability}
                    disableCloseOnSelect
                    getOptionDisabled={(option) =>
                      (data?.includes('None') || data?.includes('Prefer not to say')) && option !== data[0]
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" size="small" placeholder="Select Disability" />
                    )}
                  />
                </FormControl>
                <FormHelperText sx={{ color: 'red', marginTop: '6px' }}>
                  {error && 'Please Select Disability'}
                </FormHelperText>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '50px',
            justifyContent: 'center',
            padding: ' 10px 24px',
            margin: '15px 0'
          }}
        >
          <LoadingButton
            style={
              disabilityLoader
                ? { borderRadius: '8px', width: '560px', height: '50px' }
                : {
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#fff',
                    background: '#152536',
                    borderRadius: '8px',
                    width: '560px',
                    height: '50px'
                  }
            }
            loading={disabilityLoader}
            onClick={handleSubmit(onSubmit)}
            // onClick={handleClose()}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DisabilityModal;
