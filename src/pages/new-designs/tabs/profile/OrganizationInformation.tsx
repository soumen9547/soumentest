/* eslint-disable no-duplicate-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import favicon from "../../../../assets/images/favicon.png";
import { Divider } from "@material-ui/core";
import { FormHelperText, TextareaAutosize, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "@mui/material/Select";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import { Controller } from "react-hook-form";
import { TextField, InputLabel, MenuItem } from "@material-ui/core";
import * as yup from "yup";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IOrgData,
  orgSettingsActions,
} from "../../../../redux/slices/orgDetails/orgDetailsSlice";
import { API } from "../../../../api";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../redux/hooks";
import { LoadingButton } from "@mui/lab";

interface Props {
  data: IOrgData;
}

const OrganizationInformation = ({ data }: Props) => {
  const useStyles = makeStyles({
    cardDesign: {
      background: "#fff",
      border: "1px solid #EFF0F4",
      borderRadius: "8px",
      marginTop: "20px",
    },

    organizationHeading: {
      fontSize: "16px !important",
      fontWeight: "600 !important",
      fontFamily: "Open Sans !important",
      color: "#000 !important",
      padding: "16px",
      lineHeight: "22",
    },
    profileImageText: {
      fontSize: "16px !important",
      fontWeight: "600 !important",
      fontFamily: "Open Sans !important",
      color: "#000 !important",
    },
    removeText: {
      fontSize: "10px !important",
      fontWeight: "600 !important",
      fontFamily: "Open Sans !important",
      color: "#DC3545 !important",
      marginLeft: "8px !important",
    },
    maxText: {
      fontSize: "10px !important",
      fontWeight: "600 !important",
      fontFamily: "Open Sans !important",
      color: "#999999 !important",
    },
    fieldsLabelColor: {
      fontSize: "14px !important",
      fontWeight: "400 !important",
      fontFamily: "Open Sans !important",
      color: "#68717A !important",
      marginBottom: "10px !important",
    },
    descriptionText: {
      fontSize: "14px !important",
      fontWeight: "400 !important",
      fontFamily: "Open Sans !important",
      color: "#152536 !important",
      padding: "15px",
      border: "1px solid #d0d1d8",
      borderRadius: "8px",
    },
    radioText: {
      fontSize: "16px !important",
      fontWeight: "400 !important",
      fontFamily: "Open Sans !important",
      color: "#152536 !important",
    },
    profileHeading: {
      color: "#152536 !important",
      fontSize: "16px !important",
      fontFamily: "Open Sans !important",
      fontWeigth: "600 !important",
    },
    officerHeading: {
      color: "#68717A !important",
      fontSize: "14px !important",
      fontFamily: "Open Sans !important",
      fontWeigth: "400 !important",
    },
    wallButton: {
      color: "#6C757D !important",
      fontSize: "12px !important",
      fontFamily: "Open Sans !important",
      fontWeigth: "600 !important",
      background: "#EFF0F4",
      borderRadius: "5px",
      border: "1px solid #EFF0F4",
      padding: "3px 10px",
      marginLeft: "5px",
    },
    menberDetailsText: {
      fontSize: "14px !important",
      fontWeight: "400 !important",
      fontFamily: "Open Sans !important",
      color: "#68717A !important",
      width: "80px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    // className={classes.wallButton}
  });
  const classes = useStyles();
  const [saveLoader, setSaveLoader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const dispatch = useAppDispatch();

  const schema = yup.object({
    orgName: yup
      .string()
      .required("Organization name is required")
      .matches(
        /^[a-zA-Z\s\S]+$/,
        `Name should contain only letters, spaces, and special characters`
      )
      .test(
        "no-leading-spaces",
        "Name cannot accept empty spaces",
        (value) => {
          if (value) {
            return !/^\s+$/.test(value);
          }
          return true;
        }
      )
      .min(3, "Minimum 3 characters"),
    orgType: yup.string().required("Organization type is required"),
    description: yup.string().max(1500, "Maximum 1500 characters"),
    image: yup
      .mixed()
      .test("fileValidation", "", (value, { createError }) => {
        if (!value || !(value instanceof File)) {
          return true;
        }
        if (value.size > 10 * 1024 * 1024) {
          return createError({
            message: "The file is too large. Allowed maximum size is 10MB",
          });
        }
        if (!/\.(jpg|jpeg|png|svg)$/i.test(value.name)) {
          return createError({
            message: "Only jpg, png and svg files are allowed",
          });
        }
        return true;
      })
      .nullable(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const checkError = (fieldName: string) => Boolean(errors[fieldName]);
  const getError = (fieldName: string) => errors[fieldName]?.message;

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setSaveLoader(true);
    const trimmedValues: FieldValues = {
      ...values,
      orgName: values.orgName.trim(),
    };
    const formData = new FormData();
    Object.keys(trimmedValues).forEach((key) =>
      formData.append(key, trimmedValues[key])
    );
    try {
      const response = await API.updateOrganizationSettings({
        orgId: data.authId,
        formData,
      });
      if (response.status === 200 && response.statusText === "OK") {
        dispatch(orgSettingsActions.updateOrgSettings(response.data));
        setSaveLoader(false);
        toast.success("Organization Settings Updated!");
      }
    } catch (e) {
      setSaveLoader(false);
      toast.error(`Couldn't update Org Settings`);
    }
  };

  useEffect(() => {
    reset({
      orgName: data.name,
      description: data.description,
      image: data.orgLogo,
      orgType: data.orgType,
    });
  }, []);

  return (
    <Grid item lg={6} md={6} sm={6}>
      <Box className={classes.cardDesign}>
        <Box>
          <Typography
            className={classes.organizationHeading}
            sx={{ fontWeight: "600" }}
          >
            Organization Information
          </Typography>
          <Divider />
          <Box
            sx={{
              height: "calc(100vh - 180px)",
              overflow: "hidden auto",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "20px !important",
              }}
            >
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value } }) => {
                  const handleImageChange = (
                    event: ChangeEvent<HTMLInputElement>
                  ) => {
                    onChange(event.target.files?.[0] || "");
                  };
                  return (
                    <>
                      <IconButton onClick={handleImageClick}>
                        <Box
                          sx={{
                            display: "flex",
                            backgroundColor: "white",
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src={
                              value
                                ? typeof value === "string"
                                  ? value
                                  : URL.createObjectURL(value)
                                : favicon
                            }
                            alt="logo"
                            style={{
                              padding: 0,
                              margin: 0,
                              width: "80px",
                              height: "80px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </IconButton>
                      <input
                        id="selectedImage"
                        ref={fileInputRef}
                        name="logo"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography className={classes.profileImageText}>
                            Profile Image
                          </Typography>
                          {/* <Typography className={classes.removeText}>
                            Remove{" "}
                          </Typography> */}
                        </Box>
                        <Typography className={classes.maxText}>
                          * Only JPG, PNG or SVG (max. 10MB)
                        </Typography>
                        <FormHelperText style={{ color: "red" }}>
                          {getError("image")?.toString()}
                        </FormHelperText>
                      </Box>
                    </>
                  );
                }}
              />
            </Box>
            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
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
                  Organization Name*
                </InputLabel>
                <Controller
                  control={control}
                  name="orgName"
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      className="org-settings"
                      required
                      onChange={onChange}
                      value={value || ""}
                      name="orgName"
                      type="text"
                      placeholder="Organization Name"
                      variant="outlined"
                      error={checkError("orgName")}
                      helperText={getError("orgName")?.toString()}
                      style={{
                        width: "100%",
                        padding: "12.5px 32px 14.5px 14px !important",
                      }}
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
                  Organization Type *
                </InputLabel>
                {/* <Controller
                  control={control}
                  name="orgType"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        fullWidth
                        placeholder="Org Type"
                        style={{ width: "100%" }}
                        onChange={onChange}
                        name="orgType"
                        error={checkError("orgType")}
                        required
                      >
                        <MenuItem value="Higher Education">
                          Higher Education
                        </MenuItem>
                        <MenuItem value="Government & Development Organisation">
                          Government & Development Organisation
                        </MenuItem>
                        <MenuItem value="Consultant">Consultant</MenuItem>
                      </Select>
                    );
                  }}
                /> */}
                <Controller
                  name="orgType"
                  control={control}
                  // defaultValue="" // Set the default value as an empty string
                  render={({ field: { onChange, value } }) => (
                    <Select
                      name="orgType"
                      id="demo-simple-select"
                      value={value || ""}
                      onChange={onChange}
                      fullWidth
                      style={{ width: "100%" }}
                      required
                      displayEmpty
                      error={checkError("orgType")}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Higher Education">
                        Higher Education
                      </MenuItem>
                      <MenuItem value="Government & Development Organisation">
                        Government & Development Organisation
                      </MenuItem>
                      <MenuItem value="Consultant">Consultant</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText style={{ color: "red" }}>
                  {getError("orgType")?.toString()}
                </FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography className={classes.fieldsLabelColor}>
                          Description
                        </Typography>
                        <Typography className={classes.fieldsLabelColor}>
                          {value ? value.length : 0}/1500
                        </Typography>
                      </Box>
                      <TextareaAutosize
                        className={classes.descriptionText}
                        style={{ width: "100%" }}
                        minRows={3}
                        name="description"
                        onChange={onChange}
                        value={value}
                        placeholder="Description"
                      />
                      <FormHelperText style={{ color: "red" }}>
                        {getError("description")?.toString()}
                      </FormHelperText>
                    </>
                  )}
                />
                {/* <textarea
                  cols={75  }
                  rows={6}
                  className={classes.descriptionText}
                >
                  emple University is a public state-related research university
                  in Philadelphia, Pennsylvania. It was founded in 1884 by the
                  Baptist minister Russell Conwell and his congregation Grace
                  Baptist Church of Philadelphia then called Baptist Temple.
                </textarea> */}
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
                  Language
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  autoWidth
                  placeholder="English"
                  style={{ width: "100%" }}
                >
                  <MenuItem>English</MenuItem>
                  <MenuItem>User Type</MenuItem>
                </Select>
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
                  Timezone
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  autoWidth
                  placeholder="Dublin  (GMT +01:00)"
                  style={{ width: "100%" }}
                >
                  <MenuItem>Dublin (GMT +01:00)</MenuItem>
                  <MenuItem>Dublin (GMT +01:00)</MenuItem>
                </Select>
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
                  Location *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  autoWidth
                  placeholder="USA"
                  style={{ width: "100%" }}
                >
                  <MenuItem>USA</MenuItem>
                  <MenuItem>USA</MenuItem>
                </Select>
              </Grid> */}
            </Grid>
            {/* <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0",
                  }}
                >
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    className={classes.radioText}
                  >
                    First generation student ?{" "}
                  </FormLabel>

                  <Box sx={{ marginLeft: "20px" }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      // value={value || "No"}
                      name="firstGenStudent"
                      // defaultValue={"No"}
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </Box>
                </Box>
              </RadioGroup>
            </FormControl>

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
                Microsite name
              </InputLabel>
              <TextField
                className="org-settings"
                required
                name="firstName"
                type="email"
                placeholder="organisationname.dosen.io"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid> */}

            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="flex-end"
              marginTop="10px"
            >
              <LoadingButton
                style={
                  saveLoader
                    ? {
                        borderRadius: "8px",
                        width: "120px",
                        height: "40px",
                        // border: "1px solid #152536",
                      }
                    : {
                        width: "120px",
                        height: "40px",
                        background: "#152536",
                        borderRadius: "8px",
                        fontFamily: "Open Sans",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#fff",
                      }
                }
                onClick={handleSubmit(onSubmit)}
                loading={saveLoader}
              >
                Save
              </LoadingButton>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default OrganizationInformation;
