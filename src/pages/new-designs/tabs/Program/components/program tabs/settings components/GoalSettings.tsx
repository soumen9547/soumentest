/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  Select,
  Button,
  Dialog,
  Popover,
  Divider,
  TableRow,
  MenuItem,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  IconButton,
  DialogTitle,
  TableContainer,
  DialogActions,
  DialogContent
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import previewicon from '../../../../../../../assets/images/previewicon.svg';
import pencil from '../../../../../../../assets/images/pencil.svg';
import delecticon from '../../../../../../../assets/images/delecticon.svg';
import pluscircle from '../../../../../../../assets/images/pluscircle.svg';
import { ThemeProvider } from '@mui/material/styles';
import { SaveBtn } from '../../../../../../../utils/theme';
import {
  MyTextField,
  MyInputLabel,
  MyCheckbox,
  MyCheckboxBox,
  MyAutocomplete,
  MyTextareaField
} from '../../../../../style-components/FormInput';
import { ButtonFull, MyDialogActions } from '../../../../../style-components/DialogStyling';
import { tableStyle, GoalSettingsStyle } from './GoalSettingsStyling';
import LevelsDialog from './Dialog/LevelsDialog';
import { useAppDispatch } from '../../../../../../../redux/hooks';
import { customProgramActions } from '../../../../../../../redux/slices/custom-program/customProgramSlice';

const GoalSettings = () => {
  const classes = GoalSettingsStyle();
  const dispatch = useAppDispatch();

  /** Levels Modal */
  const [Levels, setOpenLevels] = React.useState(false);
  const handleClickLevels = () => {
    setOpenLevels(true);
  };
  const handleCloseLevels = () => {
    setOpenLevels(false);
  };

  /** Preview */
  const [open, setOpen] = React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  /** Add popupcode */
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  //* * Action preview */
  const [openPreview, setOpenPreview] = React.useState(false);
  const handleClickOpenPreview = () => {
    setOpenPreview(true);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  /** Edit */
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenPreview(false);
  };

  /** Delete popup code */
  // const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = () => {
    setOpenEdit(true);
  };
  const handleCloseDelete = () => {
    setOpenPreview(false);
  };

  /** Popover code */
  const [anchorElopenMore, setAnchorElopenMore] = React.useState<HTMLButtonElement | null>(null);
  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElopenMore(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorElopenMore(null);
  };
  const openMore = Boolean(anchorElopenMore);
  const idMore = openMore ? 'simple-popover' : undefined;

  /** Custom program btn */
  const [anchorElCustomProgram, setAnchorElCustomProgram] = React.useState<HTMLButtonElement | null>(null);
  const handleClickCustomProgram = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCustomProgram(event.currentTarget);
  };
  const handleCloseCustomProgram = () => {
    setAnchorElCustomProgram(null);
  };
  const customProgram = Boolean(anchorElCustomProgram);
  const idCustomProgram = customProgram ? 'simple-popover' : undefined;

  /** Fields options */
  const options = ['label 1', 'label 2'];
  const ProgramGoalTypeOptions = ['FYE', 'Undergrad', 'Careers', 'MBA', 'Finance'];
  const ProgramKPIsOptions = ['Retained', 'Employed', 'Achieved personal goal'];
  const MenteeAnswersTypes = [
    '1 - 5 Rating',
    'List of Industries',
    'List of Roles',
    'Yes, No',
    'Yes, No, I Don’t Know',
    'Add Answer Manually',
    'Open inout fields'
  ];

  /** Mentee answers section */
  const MenteeAnswers = () => {
    const answers = ['Answer 1', 'Answer 2', 'Answer 3']; // Replace with your actual answers array
    const totalAnswers = answers.length;
    const showDivider = totalAnswers > 1;

    return (
      <>
        {answers.map((answer, index) => (
          <React.Fragment key={index}>
            <Stack direction="row" spacing={1} py={2}>
              <DragHandleIcon
                sx={{
                  color: '#ABB5BE'
                }}
              />
              <Stack
                sx={{
                  width: '100%'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px !important',
                    fontFamily: 'Open Sans !important',
                    fontWeight: '600 !important',
                    color: '#ABB5BE',
                    marginBottom: '16px'
                  }}
                >
                  Number {index + 1}
                </Typography>
                <Box>
                  <MyInputLabel>Answer</MyInputLabel>
                  <MyTextField fullWidth placeholder={answer} />
                </Box>
              </Stack>
            </Stack>
            {showDivider && index !== totalAnswers - 1 && <Divider />}
          </React.Fragment>
        ))}
      </>
    );
  };

  let templateId = '649523496fece019365b5c9e';
  useEffect(() => {}, [templateId]);
  return (
    <>
      <Box
        sx={{
          background: '#fff',
          border: '1px solid #EFF0F4',
          borderRadius: '8px'
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
          <Typography className={classes.goalHeading} sx={{ fontWeight: '600' }}>
            Goal Settings
          </Typography>
          <Button
            className={classes.createButton}
            aria-describedby={idCustomProgram}
            onClick={handleClickCustomProgram}
          >
            Create Custom program
          </Button>
          <Popover
            id={idCustomProgram}
            open={customProgram}
            anchorEl={anchorElCustomProgram}
            onClose={handleCloseCustomProgram}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Typography
              sx={{ px: 2, py: 1, cursor: 'pointer' }}
              onClick={() => dispatch(customProgramActions.updateCustomProgramFlag(true))}
            >
              Use Blank template
            </Typography>
            <Typography sx={{ px: 2, py: 1, cursor: 'pointer' }}>Use existing Programs</Typography>
          </Popover>
        </Stack>
        <Divider />
        <Box p={2}>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item lg={4} md={6} sm={6}>
              <MyInputLabel>Program Type</MyInputLabel>
              <MyAutocomplete
                disablePortal
                options={ProgramGoalTypeOptions}
                renderInput={(params) => <MyTextField {...params} placeholder="Program Type" />}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6}>
              <MyInputLabel>Program KPI’s</MyInputLabel>
              <MyAutocomplete
                disablePortal
                options={ProgramKPIsOptions}
                renderInput={(params) => <MyTextField {...params} placeholder="Program KPI’s" />}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6}>
              <MyInputLabel>Goal name</MyInputLabel>
              <MyTextField fullWidth />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
            <Typography
              sx={{
                fontFamily: 'Open Sans',
                fontSize: '16px',
                fontWeight: '600',
                color: '#152536',
                textAlign: 'left'
              }}
            >
              Task List
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Button className={classes.createButton} onClick={handleClickLevels}>
                Levels
              </Button>

              <IconButton onClick={handleClickOpenAdd}>
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
          </Stack>
          <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table
                stickyHeader
                aria-label="sticky table"
                // className="tableBody"
                width="100%"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {' '}
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography style={tableStyle} sx={{ fontWeight: '600' }}>
                          LEVEL
                        </Typography>{' '}
                      </Box>
                    </TableCell>
                    <TableCell style={tableStyle} sx={{ fontWeight: '600' }}>
                      LEVEL NAME
                    </TableCell>

                    <TableCell sx={{ fontWeight: '600' }} style={tableStyle}>
                      TASK
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontWeight: '600' }} style={tableStyle}>
                      TASK POSITION
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontWeight: '600' }} style={tableStyle}>
                      LAST UPDATED
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', fontWeight: '600' }} style={tableStyle}>
                      ACTION
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tableText}>1</TableCell>
                    <TableCell className={classes.tableText}>Understanding your goal</TableCell>
                    <TableCell className={classes.tableText} sx={{ color: '#0071A9' }}>
                      Complete onboarding
                    </TableCell>
                    <TableCell className={classes.tableText}>1</TableCell>
                    <TableCell className={classes.tableText}>Jan 9, 2023</TableCell>
                    <TableCell>
                      <IconButton onClick={handleClickMore}>
                        <MoreVertIcon sx={{ color: ' #152536' }} />
                      </IconButton>
                    </TableCell>
                    <Popover
                      id={idMore}
                      open={openMore}
                      anchorEl={anchorElopenMore}
                      onClose={handleCloseMore}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          ':hover': {
                            background: '#f0f2f0',
                            cursor: 'pointer'
                          }
                        }}
                      >
                        <IconButton>
                          <img
                            src={previewicon}
                            alt="previewicon"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '20px',
                              height: '20px'
                            }}
                          />
                        </IconButton>
                        <Typography
                          onClick={handleClickOpenPreview}
                          paddingRight={1}
                          sx={{
                            fontFamily: 'Open Sans',
                            fontSize: '14px',
                            fontWeight: '400',
                            color: '#152536'
                          }}
                        >
                          Preview
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          ':hover': {
                            background: '#f0f2f0',
                            cursor: 'pointer'
                          }
                        }}
                      >
                        <IconButton>
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
                        <Typography
                          onClick={handleClickOpenEdit}
                          paddingRight={1}
                          sx={{
                            fontFamily: 'Open Sans',
                            fontSize: '14px',
                            fontWeight: '400',
                            color: '#152536'
                          }}
                        >
                          Edit
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          ':hover': {
                            background: '#f0f2f0',
                            cursor: 'pointer'
                          }
                        }}
                      >
                        <IconButton>
                          <img
                            src={delecticon}
                            alt="delecticon"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: '20px',
                              height: '20px'
                            }}
                          />
                        </IconButton>
                        <Typography
                          onClick={handleClickOpenDelete}
                          paddingRight={1}
                          sx={{
                            fontFamily: 'Open Sans',
                            fontSize: '14px',
                            fontWeight: '400',
                            color: '#152536'
                          }}
                        >
                          Delete
                        </Typography>
                      </Box>
                    </Popover>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableText}>1</TableCell>
                    <TableCell className={classes.tableText}>Understanding your goal</TableCell>
                    <TableCell className={classes.tableText} sx={{ color: '#0071A9' }}>
                      Complete onboarding
                    </TableCell>
                    <TableCell className={classes.tableText}>1</TableCell>
                    <TableCell className={classes.tableText}>Jan 9, 2023</TableCell>
                    <TableCell>
                      <IconButton>
                        <MoreVertIcon sx={{ color: ' #152536' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableText}>1</TableCell>
                    <TableCell className={classes.tableText}>Understanding your goal</TableCell>
                    <TableCell className={classes.tableText} sx={{ color: '#0071A9' }}>
                      Complete onboarding
                    </TableCell>
                    <TableCell className={classes.tableText}>1</TableCell>
                    <TableCell className={classes.tableText}>Jan 9, 2023</TableCell>
                    <TableCell>
                      <IconButton>
                        <MoreVertIcon sx={{ color: ' #152536' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableText}>1</TableCell>
                    <TableCell className={classes.tableText}>Understanding your goal</TableCell>
                    <TableCell className={classes.tableText} sx={{ color: '#0071A9' }}>
                      Complete onboarding
                    </TableCell>
                    <TableCell className={classes.tableText}>1</TableCell>
                    <TableCell className={classes.tableText}>Jan 9, 2023</TableCell>
                    <TableCell>
                      <IconButton>
                        <MoreVertIcon sx={{ color: ' #152536' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{ textAlign: 'right', p: '16px' }}
          >
            <Button color="error" variant="text" size="medium">
              {' '}
              Delete Program{' '}
            </Button>
            <ThemeProvider theme={SaveBtn}>
              <Button color="primary" variant="contained" size="medium">
                {' '}
                Save{' '}
              </Button>
            </ThemeProvider>
          </Stack>
        </Box>
      </Box>

      {/* Levels */}
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
          Task Preview
          <IconButton style={{ float: 'right' }} onClick={handleCloseLevels}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <LevelsDialog />
        </DialogContent>
        <MyDialogActions>
          <ButtonFull> Save </ButtonFull>
        </MyDialogActions>
      </Dialog>

      {/* Task Preview modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
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
          Task Preview
          <IconButton style={{ float: 'right' }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ paddingBottom: '15px' }}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '700',
                fontFamily: 'Open Sans',
                color: '#ABB5BE'
              }}
            >
              Level 1
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Open Sans',
                color: '#000000'
              }}
            >
              Understanding your goal
            </Typography>
          </Box>
          <Divider />
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'Open Sans',
              color: '#152536',
              margin: '15px 0'
            }}
          >
            Identifying industries you could work in
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Open Sans',
              color: '#6C757D'
            }}
          >
            Identifying a list of targeted industries that interest you will help you land a job you love by focusing
            your search on the aspects of a job that matters to you.
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Open Sans',
              color: '#6C757D',
              margin: '15px 0'
            }}
          >
            Use the experience of your mentor and others in your community, in addition to the curated content below, to
            identify the industries that feel right for you.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Add Goal modal */}
      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
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
          Add Task
          <IconButton style={{ float: 'right' }} onClick={handleCloseAdd}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item xs={12} sm={6}>
              <MyInputLabel>Level *</MyInputLabel>
              <MyAutocomplete disablePortal options={options} renderInput={(params) => <MyTextField {...params} />} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyInputLabel>Level Name *</MyInputLabel>
              <MyAutocomplete disablePortal options={options} renderInput={(params) => <MyTextField {...params} />} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyInputLabel>Task Position *</MyInputLabel>
              <MyTextField fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyInputLabel>Tags *</MyInputLabel>
              <MyAutocomplete disablePortal options={options} renderInput={(params) => <MyTextField {...params} />} />
            </Grid>
            <Grid item xs={12}>
              <MyInputLabel>Task Name *</MyInputLabel>
              <MyTextField fullWidth />
            </Grid>
            <Grid item xs={12}>
              <MyInputLabel>Task Description *</MyInputLabel>
              <MyTextareaField fullWidth multiline rows={2} maxRows={3} placeholder="Write Description about task" />
            </Grid>
            <Grid item xs={12}>
              <MyInputLabel>Mentee Question</MyInputLabel>
              <MyTextField fullWidth />
            </Grid>
            <Grid item xs={12}>
              <MyInputLabel>Mentee Answers Type</MyInputLabel>
              <MyAutocomplete
                disablePortal
                options={MenteeAnswersTypes}
                renderInput={(params) => <MyTextField {...params} placeholder="Select" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyInputLabel>How many answer choices should display</MyInputLabel>
              <MyTextField fullWidth type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyInputLabel>Maximum number of selections</MyInputLabel>
              <MyTextField fullWidth type="number" />
            </Grid>

            {/* Mentee Answers */}
            <Grid item xs={12}>
              <Box
                px={2}
                sx={{
                  background: '#F9FAFC',
                  borderRadius: '8px'
                }}
              >
                <MenteeAnswers />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <MyInputLabel>How many answer choices should display</MyInputLabel>
              <MyTextField fullWidth />
            </Grid>
            <Grid item xs={12}>
              <MyCheckboxBox control={<MyCheckbox />} label="No Mentor Question" />
            </Grid>
            <Grid item xs={12}>
              <MyInputLabel>Mentor Question</MyInputLabel>
              <MyAutocomplete disablePortal options={options} renderInput={(params) => <MyTextField {...params} />} />
            </Grid>
            <Grid item xs={12}>
              <MyInputLabel>Mentor Answers</MyInputLabel>
              <MyAutocomplete disablePortal options={options} renderInput={(params) => <MyTextField {...params} />} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MyInputLabel>Mentor Answer - No. of Min. Selections</MyInputLabel>
              <MyAutocomplete disablePortal options={options} renderInput={(params) => <MyTextField {...params} />} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MyInputLabel>Mentor Answer - No. of Max. Selections</MyInputLabel>
              <MyAutocomplete disablePortal options={options} renderInput={(params) => <MyTextField {...params} />} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '40px',
            justifyContent: 'center',
            padding: '20px 24px 35px',
            marginBottom: '10px'
          }}
        >
          <Button
            style={{
              background: '#152536',
              borderRadius: '8px',
              fontFamily: 'Open Sans',
              fontSize: '16px',
              fontWeight: '700',
              color: '#fff',
              textAlign: 'center',
              height: '50px',
              width: '560px'
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task Preview modal */}
      <Dialog
        open={openPreview}
        onClose={handleClosePreview}
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
          Task Preview
          <IconButton style={{ float: 'right' }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ paddingBottom: '15px' }}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '700',
                fontFamily: 'Open Sans',
                color: '#ABB5BE'
              }}
            >
              Level 1
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Open Sans',
                color: '#000000'
              }}
            >
              Understanding your goal
            </Typography>
          </Box>
          <Divider />
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'Open Sans',
              color: '#152536',
              margin: '15px 0'
            }}
          >
            Identifying industries you could work in
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Open Sans',
              color: '#6C757D'
            }}
          >
            Identifying a list of targeted industries that interest you will help you land a job you love by focusing
            your search on the aspects of a job that matters to you.
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Open Sans',
              color: '#6C757D',
              margin: '15px 0'
            }}
          >
            Use the experience of your mentor and others in your community, in addition to the curated content below, to
            identify the industries that feel right for you.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Edit Goal modal */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
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
          Edit Goal
          <IconButton style={{ float: 'right' }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={6}>
              <MyInputLabel>Level *</MyInputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                autoWidth
                placeholder="User Type"
                style={{ width: '100%' }}
              >
                <MenuItem>User Type</MenuItem>
                <MenuItem>User Type</MenuItem>
              </Select>
            </Grid>
            <Grid item lg={6} md={6} sm={6}>
              <MyInputLabel>Task Position *</MyInputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                autoWidth
                placeholder="User Type"
                style={{ width: '100%' }}
              >
                <MenuItem>User Type</MenuItem>
                <MenuItem>User Type</MenuItem>
              </Select>
            </Grid>
            <Grid item lg={12} md={12} sm={12}>
              <MyInputLabel>Level Name *</MyInputLabel>
              <MyTextField fullWidth variant="outlined" size="small" placeholder="Understanding your goal" />
            </Grid>
            <Grid item lg={12} md={12} sm={12}>
              <MyInputLabel>Task Name *</MyInputLabel>
              <MyTextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Identifying industries you could work in"
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12}>
              <MyInputLabel>Task Description *</MyInputLabel>

              <Box
                sx={{
                  border: '1px solid #ABB5BE',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#ABB5BE',
                  height: '140px'
                }}
              >
                <Typography
                  sx={{
                    color: '#ABB5BE',
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '15px'
                  }}
                >
                  Identifying a list of targeted industries that interest you will help you land a job you love by
                  focusing your search on the aspects of a job that matters to you. <br />
                  <br /> Use the experience of your mentor and others in your community, in addition to the curated
                  content below, to identify the industries that feel right for you.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '40px',
            justifyContent: 'center',
            padding: '20px 24px 35px',
            marginBottom: '10px'
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
              height: '50px',
              width: '270px'
            }}
          >
            Delete
          </Button>
          <Button
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: '700',
              color: '#fff',
              background: '#152536',
              borderRadius: '8px',
              height: '50px',
              width: '270px'
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation v */}
      <Dialog
        open={openEdit}
        onClose={handleCloseDelete}
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
          <IconButton style={{ float: 'right' }} onClick={handleCloseDelete}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.deleteTextPopup}>
          Are you sure to remove <br />
          this task ?
        </DialogContent>
        <DialogActions
          style={{
            width: '',
            height: '40px',
            justifyContent: 'center',
            padding: '20px 24px 35px',
            marginBottom: '10px'
          }}
        >
          <Button
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: '700',
              color: '#68717A',
              border: '1px solid #68717A',
              borderRadius: '8px',
              height: '50px',
              width: '270px'
            }}
          >
            No
          </Button>
          <Button
            style={{
              fontFamily: 'Open Sans',
              textAlign: 'center',
              fontSize: '15px',
              fontWeight: '700',
              color: '#fff',
              background: '#152536',
              borderRadius: '8px',
              height: '50px',
              width: '270px'
            }}
          >
            Yes, Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoalSettings;
