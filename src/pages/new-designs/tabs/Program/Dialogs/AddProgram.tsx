import React from "react";
import Grid from "@mui/material/Grid";

import { IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  Divider,
} from "@material-ui/core";
import { Controller, FieldValues } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

type Props = {
  handleAddProgramDialog: (flag: boolean) => void;
  addProgramDialogFlag: boolean;
  onSubmit: (data: FieldValues) => void;
  addGrpLoader: boolean;
  control: any;
  errors: any;
  handleSubmit: any;
  reset: any;
};

const AddProgram = ({
  handleAddProgramDialog,
  addProgramDialogFlag,
  onSubmit,
  addGrpLoader,
  control,
  errors,
  handleSubmit,
  reset,
}: Props) => {
  const handleClose = () => {
    reset();
    handleAddProgramDialog(false);
  };

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  return (
    <>
      <Dialog
        open={addProgramDialogFlag}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="informationtext" id="alert-dialog-title">
          Add Program
          <IconButton sx={{ float: "right" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "20px 24px", marginBottom: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                Program name *
              </InputLabel>
              <Controller
                name={"name"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="name"
                    value={value || ""}
                    type="text"
                    placeholder="Smith"
                    variant="outlined"
                    style={{ width: "100%", fontWeight: "600" }}
                    onChange={onChange}
                    error={checkError("name")}
                    helperText={getError("name")?.toString()}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={6}>
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
                Program admin first name *
              </InputLabel>
              <TextField
                type="text"
                variant="outlined"
                style={{ width: "100%" }}
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
                Program admin last name *
              </InputLabel>
              <TextField
                type="text"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
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
                Program admin email *
              </InputLabel>
              <TextField
                type="email"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            width: "",
            height: "40px",
            justifyContent: "center",
            padding: "5px 24px 20px",
            marginBottom: "10px",
          }}
        >
          <LoadingButton
            style={
              addGrpLoader
                ? { textAlign: "center", height: "40px", width: "560px" }
                : {
                    background: "#152536",
                    borderRadius: "8px",
                    fontFamily: "Open Sans",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#fff",
                    textAlign: "center",
                    height: "50px",
                    width: "560px",
                  }
            }
            onClick={handleSubmit(onSubmit)}
            loading={addGrpLoader}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProgram;
