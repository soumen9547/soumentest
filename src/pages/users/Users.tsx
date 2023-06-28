/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Users
 * @description This components has users list
 */
import { Container, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { AddUser, DeleteUserDialog, UsersTable } from './components';
import { useAppPermissions } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers } from '../../redux/slices/users/userSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchOrganizations } from '../../redux/slices/organization/organizationSlice';
import OrganizationSelect from './components/OrganizationSelect';
import InviteUserButton from './components/InviteUserButton';
import getOrgNameFromToken from '../../utils/orgName';
import ROLES from '../../utils/roles';

/**
 * Users
 * @returns {React.ReactElement}
 */
const Users = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const role = localStorage.getItem('role') || '';
  const orgData = useAppSelector((state) => state.organizations.data.organizations);
  const orgState = useAppSelector((state) => state.organizations);
  const orgNameData = getOrgNameFromToken();
  const [orgId, setSelectedOrgId] = useState('');
  const [orgName, setOrgName] = useState('');

  const { appPermissions } = useAppPermissions('users');
  const [deleteId, setDeleteId] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  /**
   * Method which calls users
   */
  const fetchOrg = async () => {
    const token = await getAccessTokenSilently();
    dispatch(fetchOrganizations({ token: token, currentPageNo: 0, perPage: 5 }));
  };

  /**
   * to fetch org
   */
  useEffect(() => {
    if (role === ROLES.platAdmin) {
      fetchOrg();
    }
  }, []);

  /**
   * To show initial value in org selection dropdown
   */
  const getInitialData = async () => {
    const token = await getAccessTokenSilently();
    if (role === ROLES.platAdmin) {
      if (orgData.length) {
        setSelectedOrgId(orgData[0].id);
        setOrgName(orgData[0].display_name);
        dispatch(fetchUsers({ token: token, orgId: orgData[0].id }));
      }
    }
    if (role === ROLES.orgAdmin) {
      setSelectedOrgId(orgNameData.id);
      setOrgName(orgNameData.name);
      dispatch(fetchUsers({ token: token, orgId: orgNameData.id }));
    }
  };

  useEffect(() => {
    if (role === ROLES.platAdmin) {
      if (!orgState.loading) {
        getInitialData();
      }
    }
    if (role === ROLES.orgAdmin) {
      getInitialData();
    }
  }, []);

  /**
   * @function @name handleAddForm
   * @description This modal opens form
   */
  const handleAddForm = (flag: boolean) => {
    // setShowAdd(flag);
  };

  /**
   * @function @name handleToggleForm to show and hide the form
   * @param {boolean} flag
   */
  const handleToggleForm = (flag: boolean) => {
    setShowForm(flag);
  };

  /**
   * @function @name handleDeleteAlert
   * @description this will disable the delete
   *
   */
  const handleDeleteAlert = (flag: boolean) => {
    setShowDelete(flag);
  };

  /**
   * @function @name handleChange
   * @description It handle organization selection dropdown
   * @param  {SelectChangeEvent} event
   */
  const handleChange = async (event: SelectChangeEvent) => {
    const token = await getAccessTokenSilently();
    setSelectedOrgId(event.target.value);
    dispatch(fetchUsers({ token: token, orgId: event.target.value }));
  };

  /**
   * @function @name handleDeleteUserId
   * @description It deletes the specific user from org table
   * @param {string} id
   */
  const handleDeleteUserId = (id: string) => {
    setDeleteId(id);
  };

  /**
   * Opens add user invite form
   * @param {boolean} flag
   */
  const handleAddUserFormVisible = (flag: boolean) => {
    setShowForm(flag);
  };

  /**
   * return jsx
   */
  return (
    <Container maxWidth={false}>
      <Box marginBottom="20px" minWidth="100%" display="flex" justifyContent="flex-end" alignItems="center">
        {role === ROLES.platAdmin ? (
          <OrganizationSelect handleChange={handleChange} orgData={orgData} orgId={orgId} role={role} />
        ) : (
          <Typography>{orgNameData.name}</Typography>
        )}
        <InviteUserButton handleAddUserFormVisible={handleAddUserFormVisible} />
      </Box>
      <UsersTable
        orgId={orgId}
        appPermissions={appPermissions}
        data={[]}
        handleDeleteAlert={handleDeleteAlert}
        handleDeleteUserId={handleDeleteUserId}
      />
      <AddUser
        orgId={orgId}
        showForm={showForm}
        orgName={orgName}
        handleToggleForm={handleToggleForm}
        handleAddForm={handleAddForm}
      />
      <DeleteUserDialog userId={deleteId} show={showDelete} handleDeleteAlert={handleDeleteAlert} />
    </Container>
  );
};

export default Users;
