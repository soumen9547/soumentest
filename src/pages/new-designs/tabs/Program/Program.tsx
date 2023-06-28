/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import ProgramTable from './components/ProgramTable';
// import ProgramCards from "./components/ProgramCards";
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { AppLoader } from '../../../../components/AppLoader';
import { fetchAllGroups } from '../../../../redux/slices/getAllGroups/getAllGroupsSlice';

const Program = () => {
  const orgGroupData = useAppSelector((state) => state.orgLevelGroup);
  const allGroupsData = useAppSelector((state) => state.allGroups);
  const orgId = orgGroupData.data?.orgId || '';
  const grpId = orgGroupData.data?.grpId || '';
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (orgId && grpId) {
      dispatch(fetchAllGroups({ orgId, grpId }));
    }
  }, []);

  if (orgGroupData.loading) {
    return <AppLoader />;
  }

  if (orgGroupData.error) {
    return <div>{orgGroupData.errorText}</div>;
  }

  const getAllGroups = () => {
    if (allGroupsData.loading) {
      return <AppLoader height="50vh" />;
    }
    if (allGroupsData.error) {
      return <div>{allGroupsData.errorText}</div>;
    }
    if (allGroupsData.data) {
      return <ProgramTable />;
    }
    return null;
  };

  if (orgGroupData) {
    return (
      <Box style={{ height: '86%', overflow: 'auto' }}>
        <Box sx={{ margin: '24px' }}>
          {/* <ProgramCards /> */}
          {getAllGroups()}
        </Box>
      </Box>
    );
  }

  return null;
};

export default Program;
