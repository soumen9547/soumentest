interface IRoute {
  title: string;
  name: string;
  auth?: boolean;
  path: string;
  exact?: boolean;
  sidebar?: boolean;
  permissions: string[];
}
interface IRoutes extends IRoute {
  children?: IRoute[];
}
