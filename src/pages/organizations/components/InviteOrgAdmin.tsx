/**
 * AddUser
 */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
// import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Controller, SubmitHandler, FieldValues, useForm } from 'react-hook-form';
// import { addUser } from "../../../redux/slices/users/userSlice";
// import { useAppSelector } from "../../../redux/hooks";
// import moment from "moment";
// import _ from "lodash";
import { API } from '../../../api';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputLabel } from '@mui/material';
interface Props {
  showForm: boolean;
  orgId: string;
  handleAddForm: (flag: boolean) => void;
  handleToggleForm: (flag: boolean) => void;
  orgName: string;
}

/**
 * Schema for form validations
 */
const schema = yup
  .object({
    email: yup.string().email('Must be valid email').required('Email is required')
  })
  .required();

const InviteOrgAdmin: React.FC<Props> = ({ showForm, orgId, handleToggleForm }) => {
  const [loadingInvitation, setLoadingInvitation] = useState<boolean>(false);
  // const organizations = useAppSelector(
  //   (state) => state.organizations.data.organizations
  // );
  const { getAccessTokenSilently, user } = useAuth0();
  // const [username, setUsername] = useState<string>("");
  // const [role, setRole] = useState<string>("user");
  // const dispatch = useAppDispatch();

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

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  // const selectedOrganization =
  // organizations && organizations.find((each) => each.id === orgId);

  /**
   * to close add user form
   */
  const handleCloseForm = () => {
    reset({ email: '' });
    handleToggleForm(false);
  };

  /**
   * @function @name handleAdd
   * @description this function add user to user table
   */
  // const handleInviteUser = () => {
  //   dispatch(
  //     addUser({
  //       id: username,
  //       name: username,
  //       orgId: orgId,
  //       displayName: username,
  //       joiningDate: moment(new Date()).format("DD-MM-YYYY"),
  //       role: role,
  //     })
  //   );
  //   handleCloseForm()
  //   setUsername("");
  //   setRole("user");
  // };

  const submitForm = async (data: any) => {
    const roleData = { ...data, name: user?.nickname, role: 2 };
    setLoadingInvitation(true);
    const token = await getAccessTokenSilently();
    try {
      const { status, statusText } = await API.inviteApi(token, orgId, roleData);
      if (status === 200 && statusText === 'OK') {
        handleToggleForm(false);
        setLoadingInvitation(false);
        reset({ email: '' });
        toast.success('Invitation sent successfully');
      } else {
        setLoadingInvitation(false);
        toast.error('Failed to send invitation');
      }
    } catch (err: any) {
      setLoadingInvitation(false);
      toast.error(err.response.data);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    submitForm(data);
  };

  /**
   * @function @name handleUserNameChange
   * @description it changes user name
   * @param {React.ChangeEvent<HTMLElement>} event
   *
   */
  // const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(event?.target.value);
  // };

  /**
   * @function @name handleRoleChange
   * @description it changes role dropdown
   * @param {SelectChangeEvent} event
   */
  // const handleRoleChange = (event: SelectChangeEvent) => {
  //   setRole(event.target.value);
  // };

  /**
   * return jsx
   */
  return (
    <div>
      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle className="organization-add">Invite Organization Admin</DialogTitle>
        <DialogContent
          sx={{
            width: '400px'
          }}
        >
          {/* <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                fullWidth
                sx={{ marginBottom: "20px", marginTop: "10px" }}
                label={"User Name"}
                size="small"
                error={checkError("name")}
                helperText={getError("name")?.toString()}
              />
            )}
          /> */}

          <InputLabel
            id="demo-simple-select-label"
            style={{
              fontFamily: 'Open Sans',
              fontSize: '14px',
              fontWeight: '400',
              color: '#68717A',
              marginBottom: '10px'
            }}
          >
            Email*
          </InputLabel>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                fullWidth
                // sx={{ marginBottom: "20px", marginTop: "15px" }}
                placeholder="John@gmail.com"
                size="small"
                error={checkError('email')}
                helperText={getError('email')?.toString()}
              />
            )}
          />
          {/* <Select
            value={role}
            fullWidth
            disabled
            size="small"
            sx={{ marginBottom: "20px" }}
            onChange={handleRoleChange}
          >
            <MenuItem value="user">Organization Admin</MenuItem>
          </Select> */}
          {/* <TextField
            margin="dense"
            id="name"
            label="Organization"
            type="text"
            defaultValue={_.get(selectedOrganization, "display_name", "")}
            fullWidth
            variant="outlined"
            size="small"
            disabled
          /> */}
        </DialogContent>

        <DialogActions sx={{ padding: '5px 24px 20px 24px' }}>
          <Button style={{ padding: '3px 15px' }} color="primary" variant="outlined" onClick={handleCloseForm}>
            Cancel
          </Button>
          {/* <Button disabled={loadingInvitation} onClick={handleSubmit(onSubmit)}>
            Invite
          </Button> */}
          <LoadingButton size="small" onClick={handleSubmit(onSubmit)} loading={loadingInvitation} variant="contained">
            <span>Invite</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InviteOrgAdmin;
