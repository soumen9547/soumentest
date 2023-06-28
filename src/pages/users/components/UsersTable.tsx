/**
 * UserTable
 */
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useAppSelector } from '../../../redux/hooks';
import { TableComponent } from '../../../components/Table';

interface IUsers {
  id: string;
  name: string;
  displayName: string;
  role: string;
  orgId: string;
  joiningDate: string;
  status: string;
}

interface Props {
  orgId: string;
  data: IUsers[];
  appPermissions: {
    add: boolean;
    edit: boolean;
    view: boolean;
    delete: boolean;
  };
  handleDeleteAlert: (flag: boolean) => void;
  handleDeleteUserId: (id: string) => void;
}

/**
 * @function @name UsersTable
 * @description it contains users list
 * @returns jsx
 */
export default function UsersTable({ handleDeleteAlert, handleDeleteUserId }: Props) {
  const { data, error, errorText, loading } = useAppSelector((state) => state.user);

  /**
   * columns
   */
  // const tableHeaders = ["Name", "Email", "Actions"];
  const actions = [
    {
      label: 'Actions',
      title: 'View',
      name: 'actions',
      icon: <Visibility />
    },
    {
      label: 'Actions',
      title: 'Delete',
      name: 'actions',
      icon: <Delete />
    },
    {
      label: 'Actions',
      title: 'Edit',
      name: 'actions',
      icon: <Edit />
    }
  ];

  const tableHeaders = [
    { label: 'Name', name: 'name' },
    { label: 'Email', name: 'email' },
    { label: 'Actions', name: 'actions', items: actions }
  ];

  const onClickActionIcon = (title: string, data: any) => {
    switch (title) {
      case 'Delete':
        handleDeleteUserId(data.name);
        handleDeleteAlert(true);
        break;
      default:
        break;
    }
  };

  /**
   * return jsx
   */
  return (
    <TableComponent
      data={data}
      columns={tableHeaders}
      loading={loading}
      error={error}
      errorText={errorText}
      noDataText="No users found"
      onClickActionIcon={onClickActionIcon}
    />
  );
}
