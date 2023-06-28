/* eslint-disable guard-for-in */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { FormHelperText, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import pencil from '../../../assets/images/pencil.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  TextField
} from '@material-ui/core';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { API, Education1 } from '../../../api';
import { getUserDetails } from '../../../utils/orgName';
import { useAuth0 } from '@auth0/auth0-react';
import Autocomplete from '@mui/material/Autocomplete';

export interface Education {
  minor: string | null;
  major: string;
  graduation_date: string;
  university: string;
  department: string;
  _id: string;
}

export interface EducationError {
  minor: string;
  major: string;
  graduation_date: string;
  university: string;
  department: string;
  _id: string;
}

export interface graduationDateError {
  graduation_date?: string;
}

// const initialValues: Education = {
//   minor: null,
//   major: "",
//   graduation_date: "",
//   university: "",
//   department: "",
//   _id: "",
// };

const schema = yup.object({
  university: yup
    .string()
    .required('College/University is required')
    .test('no-empty-spaces', 'university name cannot be all empty spaces', (value) => {
      if (value) {
        return !/^[\s]+$/.test(value);
      }
      return true;
    }),
  major: yup
    .string()
    .required('Major/Degree is required')
    .test('no-empty-spaces', 'First name cannot be all empty spaces', (value) => {
      if (value) {
        return !/^[\s]+$/.test(value);
      }
      return true;
    }),
  minor: yup.string().nullable(),
  department: yup
    .string()
    .required('Department is required')
    .test('no-empty-spaces', 'First name cannot be all empty spaces', (value) => {
      if (value) {
        return !/^[\s]+$/.test(value);
      }
      return true;
    }),
  graduation_date: yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return null;
      }
      return value;
    })
    .typeError('Please Enter a Year')
    .test('no-empty-spaces', 'First name cannot be all empty spaces', (value) => {
      if (value) {
        return !/^[\s]+$/.test(String(value));
      }
      return true;
    })
    .required('Graduation date is required')
    .min(1900, 'Must be greater than 1900')
    .max(new Date().getFullYear(), `Must be less than ${new Date().getFullYear()}`)
});

interface AllListData {
  _id: string;
  oid: string;
  value: string;
  type: string;
  approved: boolean;
  __v: number;
}

const EducationAndSkills = () => {
  const { user } = useAuth0();
  const [data, setData] = useState<Education[]>([]);
  const [dataInAscendingDate, setDataInAscendingDate] = useState<Education[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [openEducationDetailed, setOpenEducationDetailed] = useState(false);
  const { userId, location } = getUserDetails();
  const [action, setAction] = useState('Add');
  const [openDelete, setDelete] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const orgId = user?.org_id || '';
  const [allListDepartment, setAllListDepartment] = useState<any>([]);
  const [uniqueDeptArr, setUniqueDeptArr] = useState<any>([]);
  const [allListUniversity, setAllListUniversity] = useState<AllListData[]>([]);
  const [allListMajorDegree, setAllListMajorDegree] = useState<AllListData[]>([]);
  const [allListMinor, setAllListMinor] = useState<AllListData[]>([]);
  const [universityValue, setUniversityValue] = useState('');
  const [majorDegreeValue, setMajorDegreeValue] = useState('');
  const [minorValue, setMinorValue] = useState<any>('');
  const typeU = 'University Name';
  const typeMD = 'Degree';
  const typeM = 'Minors';
  const valueU = universityValue;
  const valueMD = majorDegreeValue;
  const valueM = minorValue;
  const [dept, setDept] = useState<string>('');
  const [majorNewValue, setMajorNewValue] = useState<any>('');
  const getDeptObj: any = (newValue: any) => {
    setMajorNewValue(newValue);
  };

  const UniversityList: string[] = allListUniversity ? allListUniversity?.map((item) => item.value) : [];
  const MajorDegreeList: string[] = allListMajorDegree ? allListMajorDegree?.map((item) => item.value) : [];
  const MinorList: string[] = allListMinor ? allListMinor?.map((item) => item.value) : [];

  useEffect(() => {
    Array.isArray(data) && data.length > 0
      ? setDataInAscendingDate([...data]?.sort((a, b) => parseInt(a.graduation_date) - parseInt(b.graduation_date)))
      : setDataInAscendingDate([]);
  }, [data]);

  useEffect(() => {
    getEducationDetails();
    fetchDataDepartment();
  }, []);

  useEffect(() => {
    setUniqueDeptArr(allListDepartment?.map((each: any) => each.value));
  }, [allListDepartment]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchDataUnivercity();
    }, 300);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [universityValue]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchDataMajorDegree();
    }, 300);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [majorDegreeValue]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchDataMinor();
    }, 300);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [minorValue]);

  useEffect(() => {
    const deptObject: any = allListMajorDegree?.find((deg) => deg?.value === majorNewValue);
    setDept(deptObject?.department || '');
    setValue('department', deptObject?.department || '');
  }, [majorNewValue]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  const handleClickOpenEducationDetailed = () => {
    setOpenEducationDetailed(true);
  };

  const handleCloseEducationDetailed = () => {
    setUniversityValue('');
    setMajorDegreeValue('');
    setMinorValue('');
    setDept('');
    reset();
    setOpenEducationDetailed(false);
  };

  const handleDelete = async () => {
    setDeleteLoader(true);
    try {
      const response = await API.deleteEducation({
        userId,
        location,
        id: activeId
      });
      if (response.status === 200 && response.statusText === 'OK') {
        const newData = Array.isArray(data) && data?.length > 0 ? data?.filter((each) => each._id !== activeId) : [];
        setData(newData);
        setDelete(false);
        setOpenEducationDetailed(false);
        setActiveId('');
        setDeleteLoader(false);
        toast.success('Education Details deleted successfully');
        setOpenEducationDetailed(false);
        handleCloseEducationDetailed();
      }
    } catch (e: any) {
      toast.error('Failed to delete Education Details');
      setDeleteLoader(false);
    }
  };

  const handleEditEducation = (education: any) => {
    const x = { ...education };
    for (let i in x) {
      setValue(i, x[i]);
    }
    setActiveId(education._id);
    setAction('Edit');
    handleClickOpenEducationDetailed();
  };

  const getEducationDetails = async () => {
    setLoading(true);
    try {
      const response = await API.getEducationAndSkills({
        userId,
        location
      });
      if (response.status === 200 && response.statusText === 'OK') {
        setData(response?.data);
        setLoading(false);
      }
    } catch (e) {
      toast.error('Failed to get Education Details');
      setData([]);
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const requiredData: Education1 = {
      university: values.university,
      major: values.major,
      minor: values.minor,
      graduation_date: values.graduation_date.toString(),
      department: values.department
    };

    setSubmitLoader(true);
    const submitData = {
      userId: getUserDetails()?.userId,
      location: getUserDetails()?.location,
      formData: requiredData
    };
    if (action === 'Add') {
      try {
        const response = await API.addEducationAndSkills(submitData);
        if (response.status === 200 && response.statusText === 'OK') {
          setSubmitLoader(false);
          Array.isArray(data) && data?.length
            ? setData([...data, { ...requiredData, _id: response.data.response._id }])
            : setData([{ ...requiredData, _id: response.data.response._id }]);
          reset();
          handleCloseEducationDetailed();
          toast.success('Education Details Added Successfully');
        }
      } catch (e: any) {
        toast.error(`Failed to add Education Details`);
        setSubmitLoader(false);
      }
    }
    if (action === 'Edit') {
      const data2 = data?.map((each) => {
        if (each._id === activeId) {
          return { ...requiredData, _id: each._id };
        }
        return each;
      });
      const withoutId: any = {};
      const newData: any = submitData?.formData;
      for (let i in newData) {
        if (i !== '_id') {
          withoutId[i] = newData[i];
        }
      }
      try {
        const response = await API.updateEducationAndSkills({
          ...submitData,
          formData: withoutId,
          id: activeId
        });
        if (response.status === 200 && response.statusText === 'OK') {
          setSubmitLoader(false);
          setData(data2);
          toast.success('Education Details Updated Successfully');
        }
        reset();
        handleCloseEducationDetailed();
      } catch (e: any) {
        toast.error('Failed to Update Education Details');
        setSubmitLoader(false);
      }
    }
  };

  const fetchDataUnivercity = async () => {
    try {
      const responseUniversity = await API.getTagsListnew(orgId, location, typeU, valueU);
      setAllListUniversity(responseUniversity?.data?.tagListResponse);
    } catch (error) {
      toast.error("Failed to fetch university's List");
    }
  };

  const fetchDataMajorDegree = async () => {
    try {
      const responseMajorDegree = await API.getTagsListnew(orgId, location, typeMD, valueMD);
      setAllListMajorDegree(responseMajorDegree?.data?.tagListResponse);
    } catch (error) {
      toast.error("Failed to fetch Major's List");
    }
  };

  const fetchDataMinor = async () => {
    try {
      const responseMinor = await API.getTagsListnew(orgId, location, typeM, valueM);
      setAllListMinor(responseMinor?.data?.tagListResponse);
    } catch (error) {
      toast.error("Failed to fetch Minor's List");
    }
  };

  const fetchDataDepartment = async () => {
    try {
      const responseDepartment = await API.getTagsListnew(orgId, location, 'department', '');
      setAllListDepartment(responseDepartment?.data?.tagListResponse);
    } catch (error) {
      toast.error("Failed to fetch Department's List");
    }
  };

  const getDetails = () => {
    if (loading) {
      return (
        <Box padding={2}>
          <Typography>Loading....</Typography>
        </Box>
      );
    }
    if (dataInAscendingDate?.length > 0) {
      return (
        <>
          {dataInAscendingDate?.map((each: any, index: number) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginRight: '15px' }}>
                  {/* <IconButton>
                    <img
                      src={Universityicon}
                      alt="Universityicon"
                      style={{
                        padding: 0,
                        margin: 0,
                        width: "49px",
                        height: "49px",
                      }}
                    />
                  </IconButton> */}
                </Box>
                <Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '600',
                      fontSize: '16px',
                      lineHeight: '22px',
                      color: '#152536'
                    }}
                  >
                    {each.university}
                  </Box>

                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '19px',
                      color: '#68717A',
                      fontStyle: 'italic'
                    }}
                  >
                    {each.minor
                      ? each.major + ', ' + each.minor + ',' + each.department
                      : each.major + ', ' + each.department}
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'Open Sans',
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '19px',
                      color: '#68717A'
                    }}
                  >
                    {each.graduation_date}
                  </Box>
                </Box>
              </Box>

              <Box>
                <IconButton onClick={() => handleEditEducation(each)}>
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
          ))}
        </>
      );
    } else {
      return (
        <Box padding={2}>
          <Typography>No Education</Typography>
        </Box>
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          background: '#fff',
          // border: "1px solid #EFF0F4",
          borderRadius: '8px',
          marginTop: '10px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            marginRight: '12px'
          }}
        >
          <Box
            sx={{
              fontFamily: 'Open Sans',
              fontWeight: '600',
              fontSize: '14px',
              lineHeight: '22px',
              color: '#0082B6'
            }}
          >
            {' '}
            Education
          </Box>

          <IconButton
            sx={{ width: '20px', height: '20px' }}
            onClick={() => {
              reset();
              setAction('Add');
              handleClickOpenEducationDetailed();
            }}
          >
            <AddCircleOutlineIcon sx={{ color: '#0082B6' }} />
          </IconButton>
        </Box>
        {getDetails()}
      </Box>
      <Divider />

      <Dialog
        open={openEducationDetailed}
        onClose={handleCloseEducationDetailed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="informationtext">
          {action} Education
          <IconButton onClick={handleCloseEducationDetailed} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '20px 24px' }}>
          <Grid container spacing={2} className="educationDetails">
            <Grid item md={6}>
              <InputLabel id="demo-simple-select-label" style={{ paddingBottom: '10px' }}>
                College / University *
              </InputLabel>
              <Controller
                name="university"
                control={control}
                render={({ field }) => (
                  <>
                    {!UniversityList ? (
                      <p>Loading...</p>
                    ) : (
                      <Autocomplete
                        id="size-small-standard-multi"
                        size="small"
                        value={field.value || ''}
                        onChange={(event, newValue) => {
                          setValue('university', newValue || '');
                          errors['university'] = undefined;
                        }}
                        onInputChange={(event, newInputValue) => {
                          setUniversityValue(newInputValue || '');
                          setValue('university', newInputValue || '');
                          errors['university'] = undefined;
                        }}
                        filterOptions={(options, params) => {
                          if (!Array.isArray(options)) {
                            options = [];
                          }
                          const filtered = options?.filter(
                            (option) =>
                              typeof option === 'string' &&
                              option.toLowerCase().indexOf(params.inputValue.toLowerCase()) !== -1
                          );
                          if (params.inputValue !== '') {
                            filtered.push(`${params.inputValue}`);
                          }
                          return filtered;
                        }}
                        options={UniversityList || []}
                        getOptionLabel={(option) => option}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder={UniversityList ? 'College / University' : 'Loading...'}
                            className="ethnicity-field"
                            error={checkError('university')}
                          />
                        )}
                      />
                    )}
                  </>
                )}
              />
              <FormHelperText style={{ color: 'red' }}>{getError('university')?.toString()}</FormHelperText>
            </Grid>

            <Grid item md={6} className="graduation-date">
              <InputLabel id="demo-simple-select-label" style={{ paddingBottom: '10px' }}>
                Graduation year*
              </InputLabel>
              <Controller
                name="graduation_date"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    placeholder="YYYY"
                    name="graduation_date"
                    // type="number"
                    type="text"
                    variant="outlined"
                    style={{ width: '100%' }}
                    value={value || ''}
                    onChange={onChange}
                    error={checkError('graduation_date')}
                  />
                )}
              />
              <FormHelperText style={{ color: 'red' }}>{getError('graduation_date')?.toString()}</FormHelperText>
            </Grid>

            <Grid item md={6}>
              <InputLabel id="demo-simple-select-label" style={{ paddingBottom: '10px' }}>
                Major / Degree*
              </InputLabel>
              <Controller
                name="major"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    id="size-small-standard-multi"
                    size="small"
                    value={field.value || ''}
                    onChange={(event, newValue) => {
                      setValue('major', newValue || '');
                      getDeptObj(newValue);
                      errors['major'] = undefined;
                    }}
                    onInputChange={(event, newInputValue) => {
                      setValue('major', newInputValue || '');
                      getDeptObj(newInputValue);
                      setMajorDegreeValue(newInputValue);
                      errors['major'] = undefined;
                    }}
                    filterOptions={(options, params) => {
                      if (!Array.isArray(options)) {
                        options = [];
                      }
                      const filtered = options?.filter(
                        (option) =>
                          typeof option === 'string' &&
                          option.toLowerCase().indexOf(params.inputValue.toLowerCase()) !== -1
                      );

                      if (params.inputValue !== '') {
                        filtered?.push(`${params.inputValue}`);
                      }

                      return filtered;
                    }}
                    options={MajorDegreeList || []}
                    getOptionLabel={(option) => option}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder=" Major / Degree "
                        className="ethnicity-field"
                        error={checkError('major')}
                      />
                    )}
                  />
                )}
              />
              <FormHelperText style={{ color: 'red' }}>{getError('major')?.toString()}</FormHelperText>
            </Grid>

            <Grid item md={6}>
              <InputLabel id="demo-simple-select-label" style={{ paddingBottom: '10px' }}>
                Minor
              </InputLabel>
              <Controller
                name="minor"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    id="size-small-standard-multi"
                    size="small"
                    value={field.value || ''}
                    onChange={(event, newValue) => {
                      if (!newValue) {
                        setValue('minor', '');
                        errors['minor'] = undefined;
                      } else {
                        setValue('minor', newValue);
                        errors['minor'] = undefined;
                      }
                    }}
                    onInputChange={(event, newInputValue) => {
                      setMinorValue(newInputValue);
                      errors['minor'] = undefined;
                    }}
                    filterOptions={(options, params) => {
                      if (!Array.isArray(options)) {
                        options = [];
                      }
                      const filtered = options?.filter(
                        (option) =>
                          typeof option === 'string' &&
                          option.toLowerCase().indexOf(params.inputValue.toLowerCase()) !== -1
                      );

                      if (params.inputValue !== '') {
                        filtered?.push(`${params.inputValue}`);
                      }

                      return filtered;
                    }}
                    options={MinorList || []}
                    getOptionLabel={(option) => option}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder=" Minor "
                        className="ethnicity-field"
                        error={checkError('minor')}
                      />
                    )}
                  />
                )}
              />
              <FormHelperText style={{ color: 'red' }}>{getError('minor')?.toString()}</FormHelperText>
            </Grid>

            <Grid item md={6}>
              <InputLabel id="demo-simple-select-label" style={{ paddingBottom: '10px' }}>
                Department*
              </InputLabel>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    id="size-small-standard-multi"
                    size="small"
                    value={field.value || dept}
                    onChange={(event, newValue) => {
                      setValue('department', newValue || '');
                    }}
                    onInputChange={(event, newInputValue) => {
                      setValue('department', newInputValue || '');
                    }}
                    options={uniqueDeptArr || []}
                    getOptionLabel={(option) => option}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Department "
                        className="ethnicity-field"
                        error={checkError('department')}
                      />
                    )}
                  />
                )}
              />
              <FormHelperText style={{ color: 'red' }}>{getError('department')?.toString()}</FormHelperText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '50px',
            justifyContent: 'center',
            padding: '0px 24px 15px'
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
              Save
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
                width: '560px',
                height: '45px'
              }}
              onClick={handleSubmit(onSubmit)}
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
            <CloseIcon sx={{ float: 'right' }} />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '15px 24px 10px' }}>
          <Typography>Are you sure to remove this education details?</Typography>
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
              height: '45px'
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
                height: '45px'
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

export default EducationAndSkills;
