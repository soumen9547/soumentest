/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Organizations
 * @description This components has organizations list
 */
import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import OrganizationsTable from './components/OrganizationsTable';
import OrganizationForm from './components/OrganizationForm';
import AddOrganizationButton from './components/AddOrganizationButton';
import useAppPermissions from '../../hooks/useAppPermissions';
import { fetchOrganizations } from '../../redux/slices/organization/organizationSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { API } from '../../api';
import { toast } from 'react-toastify';
/**
 * Organizations
 * @returns {React.ReactElement}
 */
const Organizations = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [createOrganizationLoading, setCreateOrganizationLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const deleteStatus = useSelector((state) => _.get(state, 'organizations.actions.delete.success'));

  const [editingOrgName, setEditingOrganizationName] = useState<string>('');
  const { appPermissions } = useAppPermissions('organizations');
  const fetchOrg = async (currentPageNo: number, perPage: number) => {
    const token = await getAccessTokenSilently();
    dispatch(
      fetchOrganizations({
        token: token,
        currentPageNo: currentPageNo,
        perPage: perPage
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Kept the static values for initial page data fething
      // TODO: need to change to dynamic
      fetchOrg(0, 5);
    }
  }, [isAuthenticated, dispatch, deleteStatus]);

  const handleToggleOrganizationForm = (flag: boolean) => {
    setShowForm(flag);
    if (!flag) {
      setEditingOrganizationName('');
    }
  };

  const createOrganization = async (token: string, orgFormData: IOrgSubmitValues) => {
    setCreateOrganizationLoading(true);
    try {
      const { status, statusText } = await API.addOrganization(token, orgFormData);
      if (status === 200 && statusText === 'OK') {
        setCreateOrganizationLoading(false);
        toast.success('Organization created successfully');
        // Kept the static values for initial page data fething
        // TODO: need to change to dynamic
        fetchOrg(0, 5);
        handleToggleOrganizationForm(false);
      } else {
        toast.error('Failed to create organization');
        setCreateOrganizationLoading(false);
      }
    } catch (err: any) {
      toast.error(err.response.data);
      setCreateOrganizationLoading(false);
    }
  };

  const handleSubmitForm = async (values: IOrgSubmitValues) => {
    const token = await getAccessTokenSilently();
    const orgFormData = {
      name: _.get(values, 'name', ''),
      orgId: _.get(values, 'orgId', ''),
      dataLocation: _.get(values, 'dataLocation', '')
    };

    createOrganization(token, orgFormData);
  };

  /**
   * @function @name onClickAddOrganization
   * @description Open an form to add organization
   * @param {boolean} flag
   */
  const onClickAddOrganization = (flag: boolean) => {
    setShowForm(flag);
  };

  /**
   * @function @name handleEdit
   * @description  on click on edit icon it opens same form with preloaded data fields
   * @param {boolean} flag
   * @param {string} orgName
   */
  const handleEdit = (flag: boolean, orgName: string) => {
    setShowForm(flag);
    setEditingOrganizationName(orgName);
  };

  const handlePaginationChanges = (currentPage: number, limit: number) => {
    fetchOrg(currentPage, limit);
  };

  /**
   * returns JSX
   */
  return (
    <Container maxWidth={false} sx={{ height: '80%', overflowY: 'auto', marginBottom: '2rem' }}>
      {appPermissions.add && <AddOrganizationButton onClickAddOrganization={onClickAddOrganization} />}

      <OrganizationsTable
        handleEdit={handleEdit}
        appPermissions={appPermissions}
        handlePaginationChanges={handlePaginationChanges}
      />
      {showForm && (
        <OrganizationForm
          organizationLoading={createOrganizationLoading}
          showForm={showForm}
          editingOrgName={editingOrgName}
          handleCloseForm={handleEdit}
          handleSubmitForm={handleSubmitForm}
          handleToggleOrganizationForm={handleToggleOrganizationForm}
        />
      )}

      {/* Organizations New table */}
      {/* <OrganizationsNewTable /> */}
    </Container>
  );
};

export default Organizations;
