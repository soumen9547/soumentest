/* eslint-disable no-duplicate-imports */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Divider } from '@material-ui/core';
import { Button, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import ronanprofile from "../../../../assets/images/ronanprofile.svg";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import { Controller } from "react-hook-form";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const OrganizationAdmins = () => {
  const [open, setOpen] = React.useState(false);

  const useStyles = makeStyles({
    cardDesign: {
      background: '#fff',
      border: '1px solid #EFF0F4',
      borderRadius: '8px',
      marginTop: '20px'
    },

    organizationHeading: {
      fontSize: '16px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#000 !important',
      padding: '16px',
      lineHeight: '22'
    },
    profileImageText: {
      fontSize: '16px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#000 !important'
    },
    removeText: {
      fontSize: '10px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#DC3545 !important',
      marginLeft: '8px !important'
    },
    maxText: {
      fontSize: '10px !important',
      fontWeight: '600 !important',
      fontFamily: 'Open Sans !important',
      color: '#999999 !important'
    },
    fieldsLabelColor: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important',
      marginBottom: '10px !important'
    },
    descriptionText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#152536 !important',
      padding: '15px',
      border: '1px solid #d0d1d8',
      borderRadius: '8px'
    },
    radioText: {
      fontSize: '16px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#152536 !important'
    },
    profileHeading: {
      color: '#152536 !important',
      fontSize: '16px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '600 !important'
    },
    officerHeading: {
      color: '#68717A !important',
      fontSize: '14px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '400 !important'
    },
    wallButton: {
      color: '#6C757D !important',
      fontSize: '12px !important',
      fontFamily: 'Open Sans !important',
      fontWeigth: '600 !important',
      background: '#EFF0F4',
      borderRadius: '5px',
      border: '1px solid #EFF0F4',
      padding: '3px 10px',
      marginLeft: '5px'
    },
    menberDetailsText: {
      fontSize: '14px !important',
      fontWeight: '400 !important',
      fontFamily: 'Open Sans !important',
      color: '#68717A !important',
      width: '80px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
    // className={classes.wallButton}
  });

  const classes = useStyles();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item lg={3} md={3} sm={3}>
        <Box className={classes.cardDesign} sx={{ marginRight: '15px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px'
            }}
          >
            <Typography className={classes.organizationHeading} sx={{ fontWeight: '600', padding: '0 !important' }}>
              Organization Admins{' '}
            </Typography>
            {/* <IconButton
              sx={{ width: "20px", height: "20px" }}
              onClick={handleClickOpen}
            >
              <AddCircleOutlineIcon sx={{ color: "#0082B6" }} />
            </IconButton> */}
          </Box>
          <Divider />
          <Typography padding={5}>Coming Soon...</Typography>
          {/* <Box sx={{ padding: "10px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  columnGap: "5px",
                }}
              >
                <IconButton sx={{ padding: "8px 0" }}>
                  <img
                    src={ronanprofile}
                    alt="profile"
                    style={{
                      padding: 0,
                      margin: 0,
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                    }}
                  />
                </IconButton>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      className={classes.profileHeading}
                      sx={{ fontWeight: "600" }}
                    >
                      Ronan Wall{" "}
                    </Typography>
                    <Box className={classes.wallButton}>Me</Box>
                  </Box>
                  <Typography className={classes.officerHeading}>
                    Chief Executive Officer, Dosen, LLC
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ color: "#DC3545", fontSize: "10px", fontWeight: "400" }}
              >
                Remove
              </Box>
            </Box>
            <Divider style={{ margin: "10px 0" }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  columnGap: "5px",
                }}
              >
                <IconButton sx={{ padding: "8px 0" }}>
                  <img
                    src={ronanprofile}
                    alt="profile"
                    style={{
                      padding: 0,
                      margin: 0,
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                    }}
                  />
                </IconButton>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      className={classes.profileHeading}
                      sx={{ fontWeight: "600" }}
                    >
                      Ronan Wall{" "}
                    </Typography>
                    <Box className={classes.wallButton}>Me</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Typography className={classes.menberDetailsText}>
                      4th year
                    </Typography>
                    <Typography className={classes.menberDetailsText}>
                      <FiberManualRecordIcon
                        sx={{
                          fontSize: "6px",
                          margin: "0 5px",
                          cursor: "pointer",
                        }}
                      />
                      Biology Major
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{ color: "#DC3545", fontSize: "10px", fontWeight: "400" }}
              >
                Remove
              </Box>
            </Box>
            <Divider style={{ margin: "10px 0" }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  columnGap: "5px",
                }}
              >
                <IconButton sx={{ padding: "8px 0" }}>
                  <img
                    src={ronanprofile}
                    alt="profile"
                    style={{
                      padding: 0,
                      margin: 0,
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                    }}
                  />
                </IconButton>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      className={classes.profileHeading}
                      sx={{ fontWeight: "600" }}
                    >
                      Ronan Wall{" "}
                    </Typography>
                    <Box className={classes.wallButton}>Me</Box>
                  </Box>
                  <Typography className={classes.officerHeading}>
                    Chief Executive Officer, Dosen, LLC
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ color: "#DC3545", fontSize: "10px", fontWeight: "400" }}
              >
                Remove
              </Box>
            </Box>
            <Divider style={{ margin: "10px 0" }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  columnGap: "5px",
                }}
              >
                <IconButton sx={{ padding: "8px 0" }}>
                  <img
                    src={ronanprofile}
                    alt="profile"
                    style={{
                      padding: 0,
                      margin: 0,
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                    }}
                  />
                </IconButton>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      className={classes.profileHeading}
                      sx={{ fontWeight: "600" }}
                    >
                      Ronan Wall{" "}
                    </Typography>
                    <Box className={classes.wallButton}>Me</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Typography className={classes.menberDetailsText}>
                      4th year
                    </Typography>
                    <Typography className={classes.menberDetailsText}>
                      <FiberManualRecordIcon
                        sx={{
                          fontSize: "6px",
                          margin: "0 5px",
                          cursor: "pointer",
                        }}
                      />
                      Biology Major
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{ color: "#DC3545", fontSize: "10px", fontWeight: "400" }}
              >
                Remove
              </Box>
            </Box>
          </Box> */}
        </Box>
      </Grid>
      <div>
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
            Add Admin
            <IconButton sx={{ float: 'right' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                  Member *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  autoWidth
                  placeholder="Select"
                  style={{ width: '100%' }}
                >
                  <MenuItem>Select</MenuItem>
                  <MenuItem>Select</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: '0 20px 20px', justifyContent: 'center' }}>
            <Button
              style={{
                fontFamily: 'Open Sans',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                background: '#152536',
                borderRadius: '8px',
                width: '560px',
                height: '50px'
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default OrganizationAdmins;
