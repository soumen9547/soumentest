import React, { useState } from 'react';
import {
  Box,
  Grid,
  // Paper,
  Stack,
  Button,
  Dialog,
  // Popover,
  Divider,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import {
  MyTextField,
  MyInputLabel,
  // MyCheckbox,
  // MyCheckboxBox,
  MyAutocomplete
  // MyTextareaField,
} from '../../../style-components/FormInput';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../../../redux/hooks';
import { ThemeProvider } from '@mui/material/styles';
import { SaveBtn } from '../../../../../utils/theme';
import pluscircle from '../../../../../assets/images/pluscircle.svg';
import { customProgramActions } from '../../../../../redux/slices/custom-program/customProgramSlice';
import { GoalSettingsStyle } from '../../../../new-designs/tabs/Program/components/program tabs/settings components/GoalSettingsStyling';
import * as yup from 'yup';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { API, IGoalData } from '../../../../../api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddLevels, AllLevels } from './AddLevels';

const CustomProgram = () => {
  const classes = GoalSettingsStyle();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const grpId = useParams().id || '';

  /** Add Levels Modal */
  const [Levels, setOpenLevels] = React.useState(false);
  // const handleClickLevels = () => {
  //   setOpenLevels(true);
  // };
  const handleCloseLevels = () => {
    setOpenLevels(false);
  };

  const programTypeSchema = yup.object({
    programType: yup.string().required('Program type is required'),
    programKPIS: yup.string().required('Program KPI required'),
    goalName: yup.string().required('Goal name is required')
  });

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(programTypeSchema)
  });

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  /** Fields options */
  //   const ProgramGoalTypeOptions = [
  //     "FYE",
  //     "Undergrad",
  //     "Careers",
  //     "MBA",
  //     "Finance",
  //   ];

  //   "Retained", "Employed", "Achieved personal goal"
  const ProgramKPIsOptions: { label: string; value: string }[] = [
    { label: 'Retained', value: 'retained' },
    { label: 'Employed', value: 'employed' },
    { label: 'Achieved personal goal', value: 'achieved personal goal' }
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const goalData: IGoalData = data as IGoalData;
    setLoading(true);
    try {
      const response = await API.createGoal({
        grpId,
        goalData: { ...goalData, new: true }
      });
      if (response.status === 200 && response.statusText === 'OK') {
        // console.log(response.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      toast.error("Couldn't create goal");
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ textAlign: 'right' }}>
          <CloseIcon onClick={() => dispatch(customProgramActions.updateCustomProgramFlag(false))} />
        </Box>
        <Box
          sx={{
            background: '#fff',
            border: '1px solid #EFF0F4',
            borderRadius: '8px'
          }}
        >
          <Box p={2}>
            <Typography className={classes.goalHeading}>Custom Program</Typography>
          </Box>
          <Divider />
          <Box p={2}>
            <Box>
              <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item lg={4} md={6} sm={6}>
                  <MyInputLabel>Program Type *</MyInputLabel>
                  {/* <MyAutocomplete
                    disablePortal
                    options={ProgramGoalTypeOptions}
                    renderInput={(params) => (
                      <MyTextField {...params} placeholder="Program Type" />
                    )}
                  /> */}
                  <Controller
                    name="programType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MyTextField
                        fullWidth
                        name="programType"
                        placeholder="Program Type"
                        onChange={onChange}
                        value={value}
                        error={checkError('programType')}
                        helperText={getError('programType')?.toString()}
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={4} md={6} sm={6}>
                  <MyInputLabel>Program KPI’s *</MyInputLabel>
                  <Controller
                    name="programKPIS"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MyAutocomplete
                        disablePortal
                        options={ProgramKPIsOptions}
                        getOptionLabel={(option: any) => option.label}
                        onChange={(_, option: any) => onChange(option ? option.value : '')}
                        value={ProgramKPIsOptions.find((option) => option.value === value) || null}
                        renderInput={(params) => (
                          <MyTextField
                            {...params}
                            placeholder="Program KPI’s"
                            error={checkError('programKPIS')}
                            helperText={getError('programKPIS')?.toString()}
                          />
                        )}
                      />
                    )}
                  />
                  {/* <FormHelperText style={{ color: "#d32f2" }}>
                    {getError("programKPIS")?.toString()}
                  </FormHelperText> */}
                </Grid>
                <Grid item lg={4} md={6} sm={6}>
                  <MyInputLabel>Goal name</MyInputLabel>
                  <Controller
                    name="goalName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MyTextField
                        fullWidth
                        name="goalName"
                        placeholder="Goal Name"
                        onChange={onChange}
                        value={value}
                        error={checkError('goalName')}
                        helperText={getError('goalName')?.toString()}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            {/*  */}
            <Box py={2} sx={{ textAlign: 'right' }}>
              <ThemeProvider theme={SaveBtn}>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={handleSubmit(onSubmit)}
                  loading={isLoading}
                >
                  Save
                </LoadingButton>
              </ThemeProvider>
            </Box>
          </Box>
          <Divider />
          <Grid container height={450}>
            <Grid item sm={12} md={4} p={2} sx={{ borderRight: '1px solid #EFF0F4' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#152536',
                    textAlign: 'left'
                  }}
                >
                  Custom Program
                </Typography>
                <IconButton disabled>
                  <img
                    src={pluscircle}
                    alt="pluscircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '34px',
                      height: '34px',
                      cursor: 'pointer'
                    }}
                  />
                </IconButton>
              </Stack>
              <Box mt={2}>
                <AllLevels />
              </Box>

              {/* <Box mt={6}>
                <Typography sx={{ textAlign: "center" }}>
                  No Levels right now, you can add your level by clicking below
                  add button.
                </Typography>
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <ThemeProvider theme={SaveBtn}>
                    <Button
                      color="primary"
                      onClick={handleClickLevels}
                      variant="contained"
                      size="medium"
                    >
                      Add Level
                    </Button>
                  </ThemeProvider>
                </Box>
              </Box> */}
            </Grid>
            <Grid item sm={12} md={8} p={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#152536',
                    textAlign: 'left'
                  }}
                >
                  Tasks
                </Typography>
                <IconButton>
                  <img
                    src={pluscircle}
                    alt="pluscircle"
                    style={{
                      padding: 0,
                      margin: 0,
                      width: '34px',
                      height: '34px',
                      cursor: 'pointer',
                      opacity: 0.5
                    }}
                  />
                </IconButton>
              </Stack>
              <Box pt={6}>
                <Typography sx={{ textAlign: 'center' }}>
                  There is no task without define any levels, so first create your
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>levels and then add task inside that levels</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Add levels */}
      <Dialog
        open={Levels}
        onClose={handleCloseLevels}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontFamily: 'Open Sans',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '600',
            color: '#152536'
          }}
        >
          Add Levels
          <IconButton style={{ float: 'right' }} onClick={handleCloseLevels}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <AddLevels />
        </DialogContent>
        <DialogActions>
          <Button> Save </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomProgram;
