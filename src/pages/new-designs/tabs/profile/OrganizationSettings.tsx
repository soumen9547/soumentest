import React from 'react';
import OrganizationAdmins from './OrganizationAdmins';
import OrganizationInformation from './OrganizationInformation';
import { useAppSelector } from '../../../../redux/hooks';
import { AppLoader } from '../../../../components/AppLoader';

const OrganizationSettings = () => {
  const orgDetails = useAppSelector((state) => state.orgDetails);
  if (orgDetails.loading) {
    return <AppLoader />;
  }

  if (orgDetails.error) {
    return <div>{orgDetails.errorText}</div>;
  }
  if (orgDetails.data) {
    return (
      <>
        <OrganizationInformation data={orgDetails.data} />
        <OrganizationAdmins />
      </>
    );
  }

  return null;
};

export default OrganizationSettings;
