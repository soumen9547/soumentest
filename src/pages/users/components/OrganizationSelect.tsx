/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/**
 * Organization selection dropdown
 */
import { MenuItem, Select } from '@mui/material';
// import _ from 'lodash'
import React from 'react';
import ROLES from '../../../utils/roles';

/**
 * @function @name OrganizationSelect dropdown
 * @returns jsx
 */
const OrganizationSelect: React.FC<IOrganizationSelect> = ({ role, orgId, handleChange, orgData }) => {
  return (
    <Select disabled={role !== ROLES.platAdmin} value={orgId} onChange={handleChange} autoWidth size="small">
      {orgData?.map((each) => (
        <MenuItem value={each.id}>{each.display_name}</MenuItem>
      ))}
    </Select>
  );
};

export default OrganizationSelect;
