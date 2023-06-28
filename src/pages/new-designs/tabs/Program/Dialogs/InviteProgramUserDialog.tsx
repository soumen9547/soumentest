import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  DialogActions,
} from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  openDialog: boolean;
  handleCloseDialog: any;
  onSubmit: any;
  handleSubmit: any;
  errors: any;
  control: any;
  inviteUserLoading: boolean;
};

const InviteProgramUserDialog = ({
  openDialog,
  handleCloseDialog,
  onSubmit,
  handleSubmit,
  errors,
  control,
  inviteUserLoading,
}: Props) => {
  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: "center !important" }}
        >
          <span style={{ fontWeight: "600", fontSize: "22px" }}>Add User</span>
          <IconButton onClick={handleCloseDialog} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2} className="editprofile">
              <Grid item xs={6}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    marginBottom: "10px",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#68717A",
                  }}
                >
                  First Name *
                </InputLabel>
                <Controller
                  name={"firstName"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      required
                      name="firstName"
                      type="text"
                      onChange={onChange}
                      value={value}
                      error={checkError("firstName")}
                      helperText={getError("firstName")?.toString()}
                      placeholder="John"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  )}
                />
                {/* <ErrorMessage name="firstName" /> */}
              </Grid>

              <Grid item xs={6}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    marginBottom: "10px",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#68717A",
                  }}
                >
                  Last Name *
                </InputLabel>
                <Controller
                  name={"lastName"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      required
                      name="lastName"
                      type="text"
                      onChange={onChange}
                      value={value}
                      error={checkError("lastName")}
                      helperText={getError("lastName")?.toString()}
                      placeholder="Smith"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    marginBottom: "0px",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#68717A",
                  }}
                >
                  User Role *
                </InputLabel>
                <Controller
                  name={"role"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={""}
                      name="role"
                      displayEmpty
                      onChange={onChange}
                      value={value}
                      fullWidth
                      required
                    >
                      <MenuItem value="">Select Role</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="member">Mentee</MenuItem>
                      <MenuItem value="mentor">Mentor</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText
                  style={{ color: "#d32f2f", paddingLeft: "10px" }}
                >
                  {getError("role")?.toString()}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    // marginBottom: "6px",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#68717A",
                  }}
                >
                  Email *
                </InputLabel>
                <Controller
                  name={"email"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      required
                      name="email"
                      type="text"
                      placeholder="john.smith@gmail.com"
                      onChange={onChange}
                      error={checkError("email")}
                      helperText={getError("email")?.toString()}
                      value={value}
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    marginBottom: "10px",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#68717A",
                  }}
                >
                  Mobile Number *
                </InputLabel>
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
                      value={value}
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions style={{ padding: "15px 0", justifyContent: "center" }}>
          <LoadingButton
            style={
              inviteUserLoading
                ? { borderRadius: "8px", width: "560px", height: "50px" }
                : {
                    fontFamily: "Open Sans",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#fff",
                    background: "#152536",
                    borderRadius: "8px",
                    width: "560px",
                    height: "50px",
                  }
            }
            onClick={handleSubmit(onSubmit)}
            loading={inviteUserLoading}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InviteProgramUserDialog;
