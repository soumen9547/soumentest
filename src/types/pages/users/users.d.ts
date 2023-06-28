/* eslint-disable no-undef */
interface IUser {
  user_id: string;
  email: string;
  picture: string;
  name: string;
}

interface IOrganizationSelect {
  role: string;
  orgId: string;
  handleChange: (event) => void;
  orgData?: IOrg[];
}

interface IInviteUser {
  handleAddUserFormVisible: (flag: boolean) => void;
}
