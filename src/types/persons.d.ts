/* eslint-disable no-undef */
interface IPerson {
  id: number | undefined;
  name: string;
  email: string;
  invitedBy: IOrganization | undefined;
  status: string;
  role: string;
}
