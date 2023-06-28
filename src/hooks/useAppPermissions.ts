/**
 * useAppPermissions hook
 */
import _ from 'lodash';
import { roles } from '../constants/roles';

/**
 * @function @name useAppPermissions
 * @param {string} entity
 * @returns appPermissions which has specific module roles (ex: add,delete,edit permissions)
 */
const useAppPermissions = (entity: string) => {
  const role = localStorage.getItem('role') || '';
  const permission = roles.find((each) => each.role === role)?.permission;
  const appPermissions = _.get(permission, [entity], {});
  return { appPermissions };
};

export default useAppPermissions;
