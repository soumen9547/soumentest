/* eslint-disable react/jsx-key */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Box, Chip, Divider, FormControl, Grid, InputLabel, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useAuth0 } from '@auth0/auth0-react';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton/IconButton';
import pencil from '../../../assets/images/pencil.svg';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAllTags } from '../../../redux/slices/tags/alltagslistSlice';
import { API } from '../../../api';
import { toast } from 'react-toastify';
import { getUserDetails } from '../../../utils/orgName';
import { useQueryClient } from '@tanstack/react-query';
import { userHobbiesUpdate } from '../../../redux/slices/user-profile/userProfieSlice';
import ROLES from '../../../utils/roles';

interface Props {
  hobbiesValue: string[];
}

interface HobbyAndInterest {
  _id: string;
  oid: string;
  value: string;
  type: string;
  approved: boolean;
  __v: number;
}

const Hobbies = ({ hobbiesValue }: Props) => {
  const { user } = useAuth0();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<string[]>(hobbiesValue);
  const [data, setData] = useState<string[]>(hobbiesValue);
  const [hobbiesAndInterests, setHobbiesAndInterests] = useState<HobbyAndInterest[]>([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const orgId = user?.org_id || '';
  const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens') || '') : {};

  const { location } = getUserDetails();
  let role = localStorage.getItem('role') || '';

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (role !== ROLES.platAdmin) {
      dispatch(
        fetchAllTags({
          orgId: orgId,
          location: location
        })
      );
    }
  }, []);

  useEffect(() => {
    setData(hobbiesValue);
    setValues(hobbiesValue);
  }, [hobbiesValue]);

  const list = useAppSelector((state) => state?.alltags?.data);

  useEffect(() => {
    if (Array.isArray(list) && list?.length > 0) {
      setHobbiesAndInterests(list);
    }
  }, [list]);

  const filteredData = Array.isArray(hobbiesAndInterests)
    ? hobbiesAndInterests?.filter((item) => item?.type === 'Hobbies and Interests')
    : [];
  const names: string[] = filteredData?.map((item: any) => item?.value);

  const handelHobbies = (event: any, value: string[]) => {
    if (value?.includes('Prefer not to say (default)')) {
      value = ['Prefer not to say (default)'];
    }
    setValues(value);
  };

  const onSubmit = async () => {
    // setDisabilityLoader(true);
    setLoading(true);
    const { orgId } = getUserDetails();
    try {
      const response = await API.updateHobbies({
        orgId,
        token: tokens.access_token,
        idtoken: tokens.id_token,
        data: values
      });
      if (response.status === 200) {
        setLoading(false);
        setOpen(false);
        setData(response.data.hobbies);

        dispatch(userHobbiesUpdate(response.data.hobbies));
        // setDisabilityLoader(false);
        // setOpenDisability(false);
        queryClient.fetchQuery({ queryKey: ['getUserDetails'] });
        toast.success('Hobbies updated successfully');
      } else {
        toast.error('Something went wrong server');
      }
    } catch (e) {
      // setDisabilityLoader(false);
      toast.error('Something went wrong');
    }
  };
  const getHobbies = () => (
    <Dialog
      open={open}
      onClose={handleClose}
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
          color: '#152536'
        }}
      >
        Hobbies
        <IconButton sx={{ float: 'right' }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent style={{ padding: '15px 24px 10px' }}>
        <Box>
          <Grid container>
            <Grid item lg={12}>
              <InputLabel id="demo-simple-select-label" style={{ paddingBottom: '10px' }}>
                Hobbies
              </InputLabel>
              <FormControl fullWidth>
                <Autocomplete
                  className="hobbies-field"
                  multiple
                  clearOnBlur
                  selectOnFocus
                  handleHomeEndKeys
                  options={names}
                  getOptionLabel={(option) => option}
                  value={values}
                  onChange={handelHobbies}
                  disableCloseOnSelect
                  getOptionDisabled={(option) =>
                    option !== 'Prefer not to say (default)' && values?.includes('Prefer not to say (default)')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      placeholder={values.length ? '' : 'Select Hobbies'}
                      // label="Select Hobbies"
                    />
                  )}
                  freeSolo // Enable free input of custom values
                  renderTags={(value, getTagProps) =>
                    value?.map((option, index) => {
                      return (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          // key={index}
                        />
                      );
                    })
                  }
                  // style={{ width: "500px" }} // Set the desired width
                />
              </FormControl>
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
          margin: '10px 0 15px'
        }}
      >
        <LoadingButton
          style={
            loading
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
          loading={loading}
          onClick={onSubmit}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );

  return role !== ROLES.platAdmin ? (
    <Box sx={{ padding: '10px 20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Open Sans',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '19px',
            color: '#0082B6'
          }}
        >
          Hobbies
        </Typography>

        <Box>
          <IconButton onClick={handleOpen}>
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
      {data && data?.length > 0 ? (
        data?.length === 1 ? (
          <Typography>{data[0]}</Typography>
        ) : (
          <ul style={{ margin: 0 }}>
            {data?.map((each, index) => (
              // return (
              <li key={index}>
                <Typography
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#152536'
                  }}
                >
                  {each}
                </Typography>
              </li>
            ))}
          </ul>
        )
      ) : (
        <Box sx={{ padding: '8px 0' }}>
          <Typography>No Hobbies</Typography>
        </Box>
      )}
      <Box>{getHobbies()}</Box>
    </Box>
  ) : null;
};

export default Hobbies;
