/* eslint-disable no-case-declarations */
/**
 * OrganizationTable
 * @description contains list of organizations in table
 */
import React, { useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Delete, Add } from '@mui/icons-material';
import DeleteConfirmation from './DeleteConfirmationAlert';
import InviteOrgAdmin from './InviteOrgAdmin';
import { TableComponent } from '../../../components/Table';
import ViewAdmins from '../../../components/ViewAdmins/ViewAdmins';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
// import { fetchAllGroups } from "../../../redux/slices/getAllGroups/getAllGroupsSlice";
import { breadCrumbsActions } from '../../../redux/slices/breadcrumbs/breadcrumbsSlice';
interface IOrganizationTable {
  handleEdit: (flag: boolean, orgName: string) => void;
  appPermissions: {
    edit: boolean;
    view: boolean;
    delete: boolean;
    add: boolean;
  };
  handlePaginationChanges: (currentPage: number, limit: number) => void;
}

/**
 * @callback handleEdit
 * @param {boolean} flag
 * @param {string} orgName
 * @returns {React.ReactElement}
 */
const OrganizationsTable: React.FC<IOrganizationTable> = ({ handleEdit, handlePaginationChanges }) => {
  const [showForm, setShowForm] = useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAdminsModal, setShowAdminsModal] = useState(false);
  const [deletingOrgName, setDeletingOrgName] = useState<string>('');
  const [deletingOrgId, setDeletingOrgId] = useState<string>('');
  const [deletingOrgLocation, setDeletingOrgLocation] = useState('');
  const [orgId, setSelectedOrgId] = useState('');
  const [orgName, setOrgName] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, data, errorText, error } = useSelector((state: RootState) => state.organizations);

  /**
   * @function @name handleDeleteConfirmation
   * @description it will open an alert for deleting the specific organization
   * @param {boolean} flag
   * @param {string} orgName
   */
  const handleDeleteConfirmation = (flag: boolean, orgId?: string, orgName?: string, orgLocation?: string) => {
    setShowDeleteConfirmation(flag);
    setDeletingOrgName(orgName || '');
    setDeletingOrgId(orgId || '');
    setDeletingOrgLocation(orgLocation || '');
  };

  const handleAddForm = (flag: boolean) => {
    // setShowAdd(flag);
  };

  const handleToggleForm = (flag: boolean) => {
    setShowForm(flag);
  };

  // const statusItems = [
  //   {
  //     title: "Pending",
  //     name: "pending",
  //     label: "",
  //     icon: (
  //       <Box boxShadow={4} width="fit-content" borderRadius={"50%"}>
  //         <Chip label="Pending" color="warning" />
  //       </Box>
  //     ),
  //   },
  // ];

  const actions = [
    {
      label: 'Actions',
      title: 'Add',
      name: 'actions',
      icon: <Add />
    },
    {
      label: 'Actions',
      title: 'Delete',
      name: 'actions',
      icon: <Delete />
    },
    {
      label: 'Actions',
      title: 'Manage',
      name: 'actions',
      icon: <SettingsIcon />
    }
  ];

  // const viewAdmins = (data: IOrganization) => {
  //   return (
  //     <VisibilityIcon
  //       onClick={() => setShowAdminsModal(true)}
  //       sx={{ cursor: "pointer" }}
  //       fontSize="small"
  //     />
  //   );
  // };

  const tableHeaders = [
    { label: 'Name', name: 'name' },
    { label: 'Location', name: 'display_name' },
    // {
    //   label: "Admins",
    //   name: "members",
    //   render: (data: IOrganization) => viewAdmins(data),
    // },
    // { label: "Status", name: "status", items: statusItems },
    { label: 'Actions', name: 'actions', items: actions }
  ];

  const handleClickAction = (name: string, data: any) => {
    switch (name) {
      case 'Delete':
        handleDeleteConfirmation(true, _.get(data, 'authId', ''), _.get(data, 'name'), _.get(data, 'location', ''));
        break;
      case 'Edit':
        handleEdit(true, _.get(data, 'id', ''));
        break;
      case 'Add':
        setShowForm(true);
        setSelectedOrgId(_.get(data, 'authId', ''));
        setOrgName(_.get(data, 'name', ''));
        break;
      case 'Manage':
        // navigate(`/manage/${_.get(data, "name", "")}`);
        // dis;
        const url = `/app/programdetails/${_.get(data, 'authId', '')}/${_.get(data, '_id', '')}/${_.get(
          data,
          'grpId',
          ''
        )}/overview/?org=${_.get(data, 'oid', '')}`;
        dispatch(
          breadCrumbsActions.removeBreadCrumbs({
            id: _.get(data, 'grpId', ''),
            name: 'Program',
            url
          })
        );
        // dispatch(
        //   fetchAllGroups({
        //     orgId: _.get(data, "_id", ""),
        //     grpId: _.get(data, "grpId", ""),
        //   })
        // );
        navigate(url);
        break;
      default:
        break;
    }
  };

  const handlePage = (value: number) => {
    handlePaginationChanges(value, data.limit);
  };

  const handleRowsPerPage = (value: number) => {
    handlePaginationChanges(data?.start, value);
  };

  /**
   * return JSX
   */
  return (
    <>
      <TableComponent
        data={_.get(data, 'organizations', [])}
        limit={_.get(data, 'limit')}
        total={_.get(data, 'total')}
        page={data.page}
        columns={tableHeaders}
        loading={loading}
        error={error}
        errorText={errorText}
        onClickActionIcon={handleClickAction}
        pagination
        handlePage={handlePage}
        handleRowsPerPage={handleRowsPerPage}
      />
      <DeleteConfirmation
        show={showDeleteConfirmation}
        handleDeleteConfirmation={handleDeleteConfirmation}
        deletingOrgName={deletingOrgName}
        deletingOrgId={deletingOrgId}
        deletingOrgLocation={deletingOrgLocation}
      />
      <InviteOrgAdmin
        orgId={orgId}
        showForm={showForm}
        orgName={orgName}
        handleToggleForm={handleToggleForm}
        handleAddForm={handleAddForm}
      />
      <ViewAdmins showAdminsModal={showAdminsModal} handleShowAdminsModal={(flag) => setShowAdminsModal(flag)} />
    </>
  );
};

export default OrganizationsTable;
