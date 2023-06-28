/* eslint-disable radix */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import pencil from '../../../assets/images/pencil.svg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth0 } from '@auth0/auth0-react';
import { API } from '../../../api';
import { getUserDetails } from '../../../utils/orgName';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
// import _ from "lodash";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchUserWorkHistory } from '../../../redux/slices/user-work/userWorkHistorySlice';
import { Autocomplete, FormControl, IconButton, Typography, createFilterOptions } from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

export interface IWorkHistory {
  company_name: string;
  title: string;
  start_date: string | null;
  end_date: string | null;
  industry: string;
  currentlyWorking: boolean;
}

export interface IWorkHistoryError {
  company_name?: string;
  title?: string;
  start_date?: string;
  end_date?: string | null;
  industry?: string;
  currentlyWorking?: boolean;
}

export interface endDateError {
  end_date?: string | null;
}

export interface startDateError {
  start_date?: string | null;
}

interface FilmOptionType {
  inputValue?: string;
  value?: string;
  type?: string;
}

const divStyle = {
  color: '#68717A',
  fontSize: '14px',
  fontFamily: 'Open Sans',
  fontWeigth: '400',
  marginBottom: '10px'
};

const initialValues: IWorkHistory = {
  company_name: '',
  title: '',
  start_date: null,
  end_date: null,
  industry: '',
  currentlyWorking: true
};

const filter = createFilterOptions<FilmOptionType>();

const WorkHistory = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth0();
  const orgId = user?.org_id || '';

  const [openWorkHistory, setOpenRoleWorkHistory] = React.useState(false);
  const [action, setAction] = useState('Add');
  const [startDateError, setStartDateError] = useState<startDateError>({});
  const [openDelete, setDelete] = useState(false);
  const [values, setValues] = useState<IWorkHistory>(initialValues);
  const [activeId, setActiveId] = useState('');
  const { userId, location } = getUserDetails();
  const [submitLoader, setSubmitLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [iWorkHistoryError, setIWorkHistoryError] = useState<IWorkHistoryError>({});
  const [endDateError, setEndDateError] = useState<endDateError>({});
  const [dataInAscendingDate, setDataInAscendingDate] = useState<IWorkHistory[]>([initialValues]);
  const [allCompanyList, setAllCompanyList] = useState<any[]>([]);
  const [allRoleList, setAllRoleList] = useState<any[]>([]);
  const [companyKeyword, setCompanyKeyword] = useState<string>('');
  const [roleKeyword, setRoleKeyword] = useState<string>('');
  const [industryUniqueList, setIndustryUniqueList] = useState<any[]>([]);
  // const [status, setStatus] = useState<any>(false);

  const { updated_data: data } = useAppSelector((state) => state.userWorkHistory);

  useEffect(() => {
    data && data?.length > 0
      ? setDataInAscendingDate([...data]?.sort((a: any, b: any) => parseInt(b.start_date) - parseInt(a.start_date)))
      : setDataInAscendingDate([]);
  }, [data]);

  // useEffect(() => {
  //   dispatch(fetchUserWorkHistory(userId));
  // }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchAllCompanyList();
    }, 400);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [companyKeyword]);

  useEffect(() => {
    fetchAllIndustryList();
  }, []);

  useEffect(() => {
    if (action === 'Add') {
      const ind: any = allCompanyList?.find((c: any) => c.value === values?.company_name);
      setValues({ ...values, industry: ind?.industry || '' });
      setIWorkHistoryError({
        ...iWorkHistoryError,
        industry: undefined
      });
    }
  }, [companyKeyword]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchAllRoleList();
    }, 400);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [roleKeyword]);

  useEffect(() => {
    getWorkHistory();
  }, []);

  const handleClickOpenWorkHistory = () => {
    setOpenRoleWorkHistory(true);
  };

  const handleCloseWorkHistory = () => {
    setValues(initialValues);
    setRoleKeyword('');
    setCompanyKeyword('');
    setOpenRoleWorkHistory(false);
    setIWorkHistoryError({});

    setStartDateError({
      ...startDateError,
      start_date: undefined
    });
    setEndDateError({
      ...endDateError,
      end_date: undefined
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const regex = /^[0-9\b]+$/;
    if (name === 'start_date') {
      if (value === '' || regex.test(value)) {
        setValues({ ...values, [name]: value });
        setIWorkHistoryError({
          ...iWorkHistoryError,
          [event.target.name]: undefined
        });
      } else {
        setIWorkHistoryError({
          ...iWorkHistoryError,
          [event.target.name]: 'Please Enter Numbers'
        });
        setValues({ ...values, start_date: '' });
      }
    } else if (name === 'end_date') {
      if (value === '' || regex.test(value)) {
        setValues({ ...values, [name]: value });
        setIWorkHistoryError({
          ...iWorkHistoryError,
          [event.target.name]: undefined
        });
      } else {
        setIWorkHistoryError({
          ...iWorkHistoryError,
          [event.target.name]: 'please enter numbers'
        });
        setValues({ ...values, end_date: '' });
      }
    } else {
      setValues({ ...values, [name]: value });
      setIWorkHistoryError({
        ...iWorkHistoryError,
        [event.target.name]: undefined
      });
    }
  };

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setValues({ ...values, [name]: checked });
  };

  const handleValidation = () => {
    const { company_name, industry, start_date, end_date, title } = values;
    const newErrors: IWorkHistoryError = {};
    const endDateError: endDateError = {};
    const startDateError: startDateError = {};

    if (!company_name) {
      newErrors.company_name = 'Please Enter Company Name';
    }
    if (!industry) {
      newErrors.industry = 'Please Enter Industry';
    }

    if (!title) {
      newErrors.title = 'Please Enter Role';
    }

    if (!start_date) {
      newErrors.start_date = 'Please Enter Start Year';
    }

    if (Number(start_date) < Number(new Date().getFullYear()) && Number(start_date) > 1900) {
      startDateError.start_date = undefined;

      setValues({ ...values, start_date: start_date });
      setStartDateError({
        ...startDateError,
        start_date: undefined
      });
    }

    if (Number(start_date) < 1900 || Number(start_date) > Number(new Date().getFullYear())) {
      startDateError.start_date = `Must be between 1900 and ${new Date().getFullYear()}`;
      newErrors.start_date = `Must be between 1900 and ${new Date().getFullYear()}`;
      setValues({ ...values, start_date: '' });
      setStartDateError({
        ...startDateError,
        start_date: startDateError?.start_date
      });
    } else {
      setValues({ ...values, start_date: start_date });
      setStartDateError({
        ...startDateError,
        start_date: undefined
      });
    }

    if (!values.currentlyWorking && start_date && !end_date) {
      newErrors.end_date = 'Please Enter End Year ';
    }

    if (!values.currentlyWorking && start_date && Number(end_date) < Number(start_date)) {
      endDateError.end_date = `End Date cannot be before Start Date`;
      newErrors.end_date = `End Date cannot be before Start Date`;
      setValues({ ...values, end_date: '' });
      setEndDateError({
        ...endDateError,
        end_date: endDateError.end_date
      });
    }

    if (
      !values.currentlyWorking &&
      start_date &&
      (Number(end_date) < Number(start_date) || Number(end_date) > Number(new Date().getFullYear()))
    ) {
      endDateError.end_date = `Must be between ${start_date} and ${new Date().getFullYear()}`;
      newErrors.end_date = `Must be between ${start_date} and ${new Date().getFullYear()}`;
      setValues({ ...values, end_date: '' });
      setEndDateError({
        ...endDateError,
        end_date: endDateError.end_date
      });
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const handleValidationObject = handleValidation();
    if (Object.keys(handleValidationObject)?.length > 0) {
      setIWorkHistoryError(handleValidationObject);
    } else {
      setSubmitLoader(true);
      let { end_date } = values;
      if (values.currentlyWorking) {
        end_date = null;
      }
      if (action === 'Add') {
        try {
          const response = await API.addWorkHistory({
            userId,
            location,
            formData: { ...values, end_date }
          });
          if (response.status === 200 && response.statusText) {
            setSubmitLoader(false);
            setData();
            setValues(initialValues);
            setRoleKeyword('');
            setCompanyKeyword('');
          }
          handleCloseWorkHistory();
        } catch (e: any) {
          toast.error('Failed to add WorkHistory');
          setSubmitLoader(false);
        }
      }
      if (action === 'Edit') {
        const values2: any = values;
        const withoutId: any = {};
        for (let i in values2) {
          if (i !== '_id') {
            withoutId[i] = values2[i];
          }
        }
        try {
          const response = await API.updateWorkHistory({
            userId,
            location,
            formData: { ...withoutId, end_date },
            id: activeId
          });

          if (response.status === 200 && response.statusText) {
            setSubmitLoader(false);
            setData();
            setValues(initialValues);
            setRoleKeyword('');
            setCompanyKeyword('');
          }
          handleCloseWorkHistory();
        } catch (e: any) {
          toast.error('Failed to Edit WorkHistory');
          setSubmitLoader(false);
        }
      }
    }
  };

  const handleDelete = async () => {
    setDeleteLoader(true);
    try {
      const response = await API.deleteWorkHistory({
        userId,
        id: activeId,
        location
      });
      if (response?.status === 200 && response?.statusText === 'OK') {
        setData();
        setDeleteLoader(false);
        setValues(initialValues);
        setRoleKeyword('');
        setCompanyKeyword('');
        setOpenRoleWorkHistory(false);
        setIWorkHistoryError({});
        toast.success(' Work History Deleted Successfully');
      }
      setDelete(false);
      setOpenRoleWorkHistory(false);
    } catch (e: any) {
      toast.error('Failed to delete WorkHistory');
      setDeleteLoader(false);
    }
  };

  const setData = () => {
    dispatch(fetchUserWorkHistory(userId));
  };
  const fetchAllCompanyList = () => {
    API.getTagsListnew(orgId, location, 'Company', companyKeyword).then((res) => {
      if (res.data?.tagListResponse) {
        setAllCompanyList(res.data?.tagListResponse);
      }
    });
  };

  const fetchAllIndustryList: any = useCallback(() => {
    API.getTagsListnew(orgId, location, 'industry', '', true).then((res) => {
      if (res?.data?.tagListResponse) {
        setIndustryUniqueList(res?.data?.tagListResponse);
      } else {
        // setIndustryUniqueList([]);
      }
    });
  }, [data]);

  const fetchAllRoleList = useCallback(() => {
    API.getTagsListnew(orgId, location, 'Function/Role', roleKeyword)
      .then((res) => {
        if (res.data?.tagListResponse) {
          setAllRoleList(res.data?.tagListResponse);
        }
      })
      .catch((e) => {
        setAllCompanyList([]);
        setIndustryUniqueList([]);
      });
  }, []);

  const getWorkHistory = async () => {
    try {
      const response = await API.getWorkHistory({
        userId: userId,
        location: location
      });
      if (response.status === 200 && response.statusText === 'OK') {
        setData();
        // setStatus(true);
      } else {
        // setStatus(false);
      }
    } catch (e: any) {
      // setStatus(false);
      toast.error('Failed to get workHistory');
    }
  };

  const renderDetails = () => {
    if (Array.isArray(data) && data?.length > 0) {
      return (
        <Box sx={{ padding: '14px' }}>
          {dataInAscendingDate?.map((each: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'cente',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <IconButton />
                    </Box>
                    <Box sx={{}}>
                      <Box sx={{ marginBottom: '10px' }}>
                        <Box
                          sx={{
                            fontFamily: 'Open Sans',
                            fontWeight: '600',
                            fontSize: '16px',
                            lineHeight: '22px',
                            color: '#152536'
                          }}
                        >
                          {each.company_name}
                        </Box>
                        <Box
                          sx={{
                            fontFamily: 'Open Sans',
                            fontWeight: '400',
                            fontSize: '14px',
                            lineHeight: '22px',
                            color: ' #68717A',
                            fontStyle: 'italic'
                          }}
                        >
                          {each.industry + ', ' + each.title}
                        </Box>
                        <Box
                          sx={{
                            fontFamily: 'Open Sans',
                            fontWeight: '400',
                            fontSize: '14px',
                            lineHeight: '22px',
                            color: '#68717A',
                            fontStyle: 'italic'
                          }}
                        >
                          {each.start_date} to {each.currentlyWorking ? 'Present' : each.end_date}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setAction('Edit');
                        setActiveId(each._id);
                        setValues(each);
                        handleClickOpenWorkHistory();
                      }}
                    >
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
                <Divider sx={{ margin: '15px 0' }} />
              </React.Fragment>
            );
          })}
        </Box>
      );
    } else if (Array.isArray(data) && data?.length === 0) {
      return (
        <Box sx={{ padding: '14px' }}>
          <Typography>No Work History</Typography>
        </Box>
      );
    }
  };

  return (
    <>
      <Grid item xs>
        <Box sx={{ height: 'calc(100vh - 110px)', overflow: 'hidden auto' }}>
          <Box
            sx={{
              minHeight: '200px',
              background: '#fff',
              border: '1px solid #EFF0F4',
              borderRadius: '8px',
              marginTop: '20px',
              marginRight: '15px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px'
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: '600',
                  fontSize: '16px',
                  lineHeight: '22px',
                  color: ' #152536'
                }}
              >
                {' '}
                Work history
              </Box>
              <IconButton
                sx={{ width: '20px', height: '20px' }}
                onClick={() => {
                  setAction('Add');
                  setValues(initialValues);
                  handleClickOpenWorkHistory();
                }}
              >
                <AddCircleOutlineIcon sx={{ color: '#0082B6' }} />
              </IconButton>
            </Box>
            <Divider />
            {data ? renderDetails() : null}
          </Box>
        </Box>
      </Grid>
      <Dialog
        open={openWorkHistory}
        onClose={handleCloseWorkHistory}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="informationtext">
          {action} Work History
          <IconButton onClick={handleCloseWorkHistory} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '15px 24px 10px', marginBottom: '20px' }}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <InputLabel id="demo-simple-select-label" style={divStyle}>
                Company *
              </InputLabel>
              <FormControl fullWidth className="ethnicity-field">
                <Autocomplete
                  sx={{ width: '100%', size: 'small' }}
                  value={values.company_name}
                  // onInputChange={(e, v) => {
                  //   setCompanyKeyword(v);
                  // }}
                  onChange={(event, newValue) => {
                    setCompanyKeyword(newValue);
                    if (typeof newValue === 'string') return;

                    if (newValue && newValue.value) {
                      setValues({
                        ...values,
                        company_name: newValue?.value || ''
                      });
                    } else {
                      setValues({
                        ...values,
                        company_name: newValue?.value || ''
                      });
                    }

                    setIWorkHistoryError({
                      ...iWorkHistoryError,
                      company_name: undefined
                    });
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                      let existingOptionArr = options.filter((option) =>
                        option.value.toLowerCase().includes(params.inputValue.toLowerCase())
                      );
                      if (existingOptionArr.length === 0) {
                        filtered?.push({
                          inputValue: params.inputValue,
                          value: `${params.inputValue}`
                        });
                      }
                    }

                    return filtered;
                  }}
                  id="free-solo-dialog-demo"
                  options={allCompanyList?.sort((a: any, b: any) => {
                    return a.value.localeCompare(b.value);
                  })}
                  getOptionLabel={(option) => {
                    if (!option) {
                      return '';
                    } else if (typeof option === 'string') {
                      return option;
                    } else if (option.inputValue) {
                      return option.inputValue;
                    } else {
                      return option.value ?? '';
                    }
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => (
                    <li key={option.value} {...props}>
                      {option.value}
                    </li>
                  )}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      placeholder="Select one from the List *"
                      error={Boolean(iWorkHistoryError.company_name)}
                    />
                  )}
                />
              </FormControl>
              <span className="text-danger">{iWorkHistoryError && iWorkHistoryError?.company_name}</span>
            </Grid>
            <Grid item md={6}>
              <InputLabel id="demo-simple-select-label" style={divStyle}>
                Industry *
              </InputLabel>
              <FormControl fullWidth className="ethnicity-field">
                <Autocomplete
                  sx={{ width: '100%', size: 'small' }}
                  value={values.industry}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') return;
                    if (newValue && newValue.value) {
                      setValues({ ...values, industry: newValue?.value || '' });
                    } else {
                      const ind: any = industryUniqueList?.find((c: any) => c?.value === newValue?.value);
                      setValues({ ...values, industry: ind });
                    }
                    setIWorkHistoryError({
                      ...iWorkHistoryError,
                      industry: undefined
                    });
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                      let existingOptionArr = options.filter((each) => {
                        return each.value.toLowerCase().includes(params.inputValue.toLowerCase());
                      });
                      if (existingOptionArr.length === 0) {
                        filtered?.push({
                          inputValue: params.inputValue,
                          value: `${params.inputValue}`
                        });
                      }
                    }
                    return filtered;
                  }}
                  id="free-solo-dialog-demo"
                  options={industryUniqueList?.sort((a: any, b: any) => {
                    return a.value.localeCompare(b.value);
                  })}
                  getOptionLabel={(option) => {
                    if (!option) {
                      return '';
                    } else if (typeof option === 'string') {
                      return option;
                    } else if (option.inputValue) {
                      return option.inputValue;
                    } else {
                      return option.value ?? '';
                    }
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => (
                    <li key={option.value} {...props}>
                      {option.value}
                    </li>
                  )}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      placeholder="Select One from the list *"
                      error={Boolean(iWorkHistoryError?.industry)}
                    />
                  )}
                />
              </FormControl>
              <span className="text-danger">{iWorkHistoryError && iWorkHistoryError?.industry}</span>
            </Grid>
            <Grid item md={12}>
              <FormGroup
                style={{
                  fontSize: '14px',
                  fontFamily: 'Open Sans',
                  fontWeight: '400',
                  color: '#68717A'
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox checked={values.currentlyWorking} name="currentlyWorking" onChange={handleCheckbox} />
                  }
                  label="I currently work here"
                />
              </FormGroup>
            </Grid>
            <Grid item md={6}>
              <InputLabel id="demo-simple-select-label" style={divStyle}>
                Start year (YYYY) *
              </InputLabel>
              <TextField
                className="ethnicity-field"
                name="start_date"
                type="text"
                placeholder="YYYY"
                variant="outlined"
                style={{
                  width: '100%',
                  fontWeight: '600',
                  color: '#152536',
                  fontSize: '14px !important'
                }}
                size="small"
                value={values?.start_date || ''}
                onChange={handleChange}
                error={Boolean(iWorkHistoryError?.start_date)}
              />
              <span className="text-danger">{iWorkHistoryError && iWorkHistoryError?.start_date}</span>
            </Grid>
            {!values?.currentlyWorking && (
              <Grid item md={6}>
                <InputLabel id="demo-simple-select-label" style={divStyle}>
                  End year (YYYY) *
                </InputLabel>
                <TextField
                  className="ethnicity-field"
                  name="end_date"
                  type="text"
                  placeholder="YYYY"
                  variant="outlined"
                  style={{
                    width: '100%',
                    fontWeight: '600',
                    color: '#152536',
                    fontSize: '14px !important'
                  }}
                  size="small"
                  value={values.end_date || ''}
                  onChange={handleChange}
                  error={Boolean(iWorkHistoryError?.end_date)}
                />
                <span className="text-danger">{iWorkHistoryError && iWorkHistoryError?.end_date}</span>
              </Grid>
            )}
            <Grid item md={12}>
              <InputLabel style={divStyle} id="demo-simple-select-label">
                Role type *
              </InputLabel>
              <FormControl fullWidth className="ethnicity-field">
                <Autocomplete
                  sx={{ width: '100%', size: 'small' }}
                  value={values.title}
                  onInputChange={(e, v) => {
                    setRoleKeyword(v);
                  }}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') return;
                    if (newValue && newValue.value) {
                      setValues({ ...values, title: newValue?.value || '' });
                    } else {
                      setValues({ ...values, title: newValue?.value || '' });
                    }
                    setIWorkHistoryError({
                      ...iWorkHistoryError,
                      title: undefined
                    });
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                      let existingOptionArr = options.filter((option) =>
                        option.value.toLowerCase().includes(params.inputValue.toLowerCase())
                      );
                      if (existingOptionArr.length === 0) {
                        filtered?.push({
                          inputValue: params.inputValue,
                          value: `${params.inputValue}`
                        });
                      }
                    }
                    return filtered;
                  }}
                  id="free-solo-dialog-demo"
                  options={allRoleList}
                  getOptionLabel={(option) => {
                    if (!option) {
                      return '';
                    } else if (typeof option === 'string') {
                      return option;
                    } else if (option.inputValue) {
                      return option.inputValue;
                    } else {
                      return option.value ?? '';
                    }
                  }}
                  selectOnFocus
                  handleHomeEndKeys
                  renderOption={(props, option) => (
                    <li key={option.value} {...props}>
                      {option.value}
                    </li>
                  )}
                  freeSolo
                  // popupPlacement="bottom-start"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      placeholder="Your Role *"
                      error={Boolean(iWorkHistoryError.title)}
                    />
                  )}
                />
              </FormControl>
              <span className="text-danger">{iWorkHistoryError && iWorkHistoryError?.title}</span>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '45px',
            justifyContent: 'center',
            padding: '5px 24px 20px',
            marginBottom: '10px'
          }}
        >
          {action === 'Edit' && (
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
                height: '45px'
              }}
              fullWidth
              onClick={() => setDelete(true)}
            >
              Remove
            </Button>
          )}
          {submitLoader ? (
            <LoadingButton loading={submitLoader} sx={{ width: 500 }}>
              Loading...
            </LoadingButton>
          ) : (
            <Button
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: '700',
                color: '#fff',
                background: '#152536',
                borderRadius: '8px',
                height: '45px'
              }}
              fullWidth
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </Button>
          )}
        </DialogActions>
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
            color: '#152536'
          }}
        >
          Confirmation
          <IconButton onClick={() => setDelete(false)} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '24px', textAlign: 'center' }}>
          <Typography
            style={{
              fontSize: '16px',
              fontFamily: 'Open Sans',
              fontWeight: '600'
            }}
          >
            Are you sure to remove this work history?
          </Typography>
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '45px',
            justifyContent: 'center',
            padding: '5px 24px 20px'
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
              height: '40px'
            }}
            fullWidth
            onClick={() => setDelete(false)}
          >
            No
          </Button>

          {deleteLoader ? (
            <LoadingButton loading={deleteLoader} sx={{ width: 200 }}>
              Yes, Remove
            </LoadingButton>
          ) : (
            <Button
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: '700',
                color: '#fff',
                background: '#152536',
                borderRadius: '8px',
                height: '40px'
              }}
              fullWidth
              onClick={() => {
                handleDelete();
              }}
            >
              Yes, Remove
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkHistory;
