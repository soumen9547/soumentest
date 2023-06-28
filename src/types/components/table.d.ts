/* eslint-disable no-undef */
interface ITableAction {
  name: string;
  label: string;
  title: string;
  icon: React.ReactElement;
}

interface ITableComponent {
  data: any[];
  columns: { label: string; name: string; items?: ITableAction[]; render?: (data: IOrganization) => {} }[];
  error?: boolean;
  errorText?: string;
  loading?: boolean;
  noDataText?: string;
  actions?: ITableAction[];
  onClickActionIcon?: (title: string, data: any) => void;
  pagination?: boolean;
  limit?: number;
  total?: number;
  page?: number;
  handleRowsPerPage?: (value: number) => void;
  handlePage?: (value: number) => void;
}
