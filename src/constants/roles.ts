import ROLES from '../utils/roles';

export const roles = [
  {
    role: ROLES.platAdmin,
    permission: {
      organizations: {
        edit: true,
        view: true,
        delete: true,
        add: true
      },
      users: {
        edit: true,
        view: true,
        delete: true,
        add: false
      }
    }
  },
  {
    role: ROLES.orgAdmin,
    permission: {
      users: {
        edit: false,
        view: false,
        delete: true,
        add: true
      }
    }
  }
];
