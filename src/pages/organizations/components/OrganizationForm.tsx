/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * OrganizationForm
 * @description Form to add or update the organization
 */
import { LoadingButton, ToggleButton, ToggleButtonGroup } from "@mui/lab";
import { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  FieldValues,
  useForm,
} from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Typography,
  InputLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import { useAppSelector } from "../../../redux/hooks";

/**
 * Schema for form validations
 */
const schema = yup
  .object({
    name: yup
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
    orgId: yup
      .string()
      .required("Organization ID is required")
      .matches(
        /^[a-z0-9]+$/,
        "Org ID should contain only lowercase letters and numbers"
      )
      .min(3, "Minimum 3 characters"),
    dataLocation: yup.string().required("Data Location is requireed"),
    // display_name: yup.string().required("Display name is required"),
    // description: yup.string().required("Description is required"),
  })
  .required();

/**
 * @function @name OrganizationForm
 * @description form to deal with adding and updating organizations
 * @param {boolean} showForm
 * @param {string} editingOrgName
 * @callback handleCloseForm to close form dialog after update and clear the flag and selected organization
 * @returns
 */
const OrganizationForm = ({
  showForm,
  editingOrgName,
  // handleCloseForm,
  handleSubmitForm,
  handleToggleOrganizationForm,
  organizationLoading,
}: IOrganizationForm) => {
  const organizations = useAppSelector(
    (state) => state.organizations.data.organizations
  );
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * to close the form in both cases add and edit
   */
  const handleClose = () => {
    handleToggleOrganizationForm(false);
  };

  /**
   * @function onSubmit
   * @description submits the form after click on submit
   * @param {any} data  form data
   */

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleSubmitForm({
      name: _.get(data, "name", ""),
      orgId: _.get(data, "orgId", ""),
      dataLocation: _.get(data, "dataLocation"),
      // description: _.get(data, "description", ""),
    });
  };

  // const [alignment, setAlignment] = useState("web");

  // const handleChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: string
  // ) => {
  //   setAlignment(newAlignment);
  // };

  /**
   * @function @name checkError
   * @description gives the field error
   * @param {string} fieldName
   * @returns field error
   */
  const checkError = (fieldName: string) => Boolean(errors[fieldName]);

  /**
   * @function @name getError
   * @description gives the field error text
   * @param {string} fieldName
   * @returns field error text
   */
  const getError = (fieldName: string) => errors[fieldName]?.message;

  /**
   * Hook to preload the form data on update case
   */
  useEffect(() => {
    if (editingOrgName) {
      const getEditingOrganization = organizations.find(
        (each) => each.id === editingOrgName
      );
      const reformEditingOrganization = {
        ...getEditingOrganization,
        description: getEditingOrganization?.metadata?.description,
      };
      reset(reformEditingOrganization);
    }
  }, [editingOrgName, organizations, reset]);

  useEffect(() => {
    setValue("dataLocation", "US");
  }, []);

  /**
   * returns jsx
   */
  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={showForm} onClose={handleClose}>
        <DialogTitle className="organization-add">
          {editingOrgName ? "Update" : "Add "} Organization
        </DialogTitle>
        <DialogContent>
          <Grid item xs={6} mb={3} mt={1}>
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
              Name*
            </InputLabel>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  fullWidth
                  error={checkError("name")}
                  helperText={getError("name")?.toString()}
                  disabled={editingOrgName !== ""}
                  placeholder="Organization Name"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} mb={3}>
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
              Organization ID*
            </InputLabel>
            <Controller
              name="orgId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  onChange={onChange}
                  value={value}
                  error={checkError("orgId")}
                  helperText={getError("orgId")?.toString()}
                  placeholder="Organization ID"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} mb={3} display="flex" flexDirection="column">
            <Typography sx={{ fontSize: "15px", color: "#68717A", }}>Data Location</Typography>
            <Controller
              name="dataLocation"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ToggleButtonGroup
                  color="primary"
                  value={value}
                  exclusive
                  onChange={onChange}
                  aria-label="Platform"
                  sx={{ marginTop: "10px" }}
                >
                  <ToggleButton
                    value="US"
                    sx={{ width: "60px", height: "40px" }}
                  >
                    US
                  </ToggleButton>
                  <ToggleButton
                    value="EU"
                    sx={{ width: "60px", height: "40px" }}
                  >
                    EU
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            />
          </Grid>
          {/* <Grid item xs={6} mb={3}>
            <Controller
              name={"description"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  onChange={onChange}
                  value={value}
                  label={"Description"}
                  error={checkError("description")}
                  helperText={getError("description")?.toString()}
                />
              )}
            />
          </Grid> */}
        </DialogContent>
        <DialogActions sx={{padding:"15px 24px 20px 24px"}}>
          <Button style={{padding:'5px 15px'
          }} color="primary" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          {/* <Button
            color="primary"
            variant="contained"
            disabled={organizationLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {editingOrgName ? "Update" : "Add"}
          </Button> */}
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            loading={organizationLoading}
            variant="contained"
            style={{
              padding:"6px 25px"
            }}
          >
            <span>{editingOrgName ? "Update" : "Add"}</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrganizationForm;
