import React from 'react';
import {
  Box,
  Grid,
  //   Stack,
  Button,
  //   Dialog,
  Divider,
  Typography
  //   IconButton,
  //   DialogTitle,
  //   DialogActions,
  //   DialogContent,
} from '@mui/material';
import {
  MyTextField,
  MyInputLabel,
  // MyCheckbox,
  // MyCheckboxBox,
  MyAutocomplete,
  MyTextareaField
} from '../../../style-components/FormInput';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../../../redux/hooks';
import { ThemeProvider } from '@mui/material/styles';
import { SaveBtn } from '../../../../../utils/theme';
// import { addTaskActions } from "../../../../../redux/slices/custom-program/addTaskSlice";
import { GoalSettingsStyle } from '../../../../new-designs/tabs/Program/components/program tabs/settings components/GoalSettingsStyling';

const AddTask = () => {
  const classes = GoalSettingsStyle();
  const dispatch = useAppDispatch();
  const options = ['label 1', 'label 2', 'label 3', 'label 4', 'label 5'];
  const MenteeAnswersTypes = [
    '1 - 5 Rating',
    'List of Industries',
    'List of Roles',
    'Yes, No',
    'Yes, No, I Don’t Know',
    'Add Answer Manually',
    'Open inout fields'
  ];
  return (
    <Box>
      <Box sx={{ textAlign: 'right' }}>
        <CloseIcon />
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
          <Grid container spacing={2}>
            <Grid item sm={12} md={6} lg={3}>
              <MyInputLabel>Level *</MyInputLabel>
              <MyAutocomplete
                options={options}
                renderInput={(params) => <MyTextField {...params} placeholder="Level" />}
              />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              <MyInputLabel>Level *</MyInputLabel>
              <MyTextField fullWidth />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              <MyInputLabel>Task Position *</MyInputLabel>
              <MyTextField fullWidth />
            </Grid>
            <Grid item sm={12} md={6} lg={3}>
              <MyInputLabel>Tags *</MyInputLabel>
              <MyAutocomplete
                multiple
                limitTags={2}
                options={options}
                renderInput={(params) => <MyTextField {...params} placeholder="Tags" />}
              />
            </Grid>
            <Grid item sm={12}>
              <MyInputLabel>Task name *</MyInputLabel>
              <MyTextField fullWidth />
            </Grid>
            <Grid item sm={12}>
              <MyInputLabel>Task Description *</MyInputLabel>
              <MyTextareaField maxRows={3} fullWidth />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <MyInputLabel>Mentee Question *</MyInputLabel>
              <MyAutocomplete
                options={options}
                renderInput={(params) => <MyTextField {...params} placeholder="Level" />}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <MyInputLabel>Mentee Answers Type *</MyInputLabel>
              <MyAutocomplete
                options={MenteeAnswersTypes}
                renderInput={(params) => <MyTextField {...params} placeholder="Level" />}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <MyInputLabel>Mentor Question *</MyInputLabel>
              <MyAutocomplete
                options={options}
                renderInput={(params) => <MyTextField {...params} placeholder="Level" />}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <MyInputLabel>Mentor Answers Type *</MyInputLabel>
              <MyAutocomplete
                options={MenteeAnswersTypes}
                renderInput={(params) => <MyTextField {...params} placeholder="Level" />}
              />
            </Grid>
          </Grid>
        </Box>
        <Box p={2} sx={{ textAlign: 'right' }}>
          <ThemeProvider theme={SaveBtn}>
            <Button color="primary" variant="contained" size="medium">
              Save
            </Button>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTask;
