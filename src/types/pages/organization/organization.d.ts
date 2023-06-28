/* eslint-disable no-undef */
interface IOrganization {
  orgName: string;
  display_name: string;
  id: number;
  members: IPerson[];
}

interface IOrg {
  id: string;
  name: string;
  display_name: string;
  metadata?: {
    description: string;
    dataLocation: string;
  };
}

interface IOrganizationForm {
  showForm: boolean;
  editingOrgName: string;
  handleCloseForm: (flag: boolean, name: string) => void;
  handleSubmitForm: ({ name, display_name, description }: IOrgFormData) => void;
  handleToggleOrganizationForm: (flag: boolean) => void;
  organizationLoading: boolean;
}

interface IOrgSubmitValues {
  name?: string;
  orgId: string;
  dataLocation: string;
}

interface IOrgApiData {
  name: string;
  display_name?: string;
  metadata?: {
    description?: string;
    dataLocation?: string;
  };
}

interface IInviteOrgAdmin {
  name: string;
  email: string;
  role: number;
}

interface IOrgResponse {
  start: number;
  limit: number;
  total: number;
  page: number;
  per_page: number;
  organizations: IOrg[];
}
