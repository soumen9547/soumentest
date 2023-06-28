/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import {
  Box,
  Typography
  // Breadcrumbs
} from '@mui/material';
import { Link, Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { AppLoader } from '../../../../../../components/AppLoader';
import _ from 'lodash';
import { breadCrumbsActions } from '../../../../../../redux/slices/breadcrumbs/breadcrumbsSlice';
import { fetchAllGroups } from '../../../../../../redux/slices/getAllGroups/getAllGroupsSlice';
import ROLES from '../../../../../../utils/roles';
import { fetchGroupDetails } from '../../../../../../redux/slices/group-details/groupDetails';

const ProgramDetails = () => {
  const orgGroupData = useAppSelector((state) => state.orgLevelGroup);
  const allGroupData = useAppSelector((state) => state.allGroups);
  const mainGroup = useAppSelector((state) => state.allGroups.data?.mainGroup);
  const breadcrumbs = useAppSelector((state) => state.breadCrumbs.breadcrumbs);

  const dispatch = useAppDispatch();

  const grpId = useParams().id || '';
  const orgId = useParams().orgId || '';
  const coId = useParams().coId || '';
  const [searchParams] = useSearchParams();
  const role = localStorage.getItem('role');
  let orgName = searchParams.get('org') || '';
  let param = '';
  if (role === ROLES.platAdmin) {
    param = `/?org=${orgName}`;
  }

  useEffect(() => {
    if (allGroupData.data) {
      if (mainGroup) {
        const mainGroup = breadcrumbs.find((each) => each.name === 'Program');
        dispatch(breadCrumbsActions.removeBreadCrumbs(mainGroup));
      } else {
        dispatch(
          breadCrumbsActions.updateBreadCrumbs({
            id: grpId,
            name: allGroupData.data.mainGroupName,
            url: `/app/programdetails/${orgId}/${coId}/${grpId}/overview${param}`
          })
        );
      }
    }
  }, [mainGroup]);

  useEffect(() => {
    const newGrpId = grpId === 'admin' ? '' : grpId;
    dispatch(fetchAllGroups({ orgId: coId, grpId: newGrpId }));
    if (newGrpId) {
      dispatch(fetchGroupDetails(newGrpId));
    }
  }, [grpId]);

  const activeTab = window.location.href
    .split('/')
    .find((each) => ['users', 'settings', 'insights', 'matches', 'overview'].includes(each));
  const url = `/app/programdetails/${orgId}/${coId}/${grpId}`;

  const navigate = useNavigate();

  const activeStyle = {
    borderBottom: '3px solid #DF6438',
    color: '#DF6438',
    paddingBottom: '10px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'Open Sans',
    cursor: 'pointer'
  };

  const inActiveStyle = {
    fontSize: '14px',
    fontWeight: '400',
    fontFamily: 'Open Sans',
    cursor: 'pointer',
    paddingBottom: '10px'
  };

  if (orgGroupData.loading) {
    return <AppLoader />;
  }

  if (orgGroupData.error) {
    return <div>{orgGroupData.errorText}</div>;
  }

  const getTabs = () => {
    if (!mainGroup) {
      return (
        <Box
          sx={{
            borderBottom: '1px solid #EFF0F4',
            margin: '10px 10px 20px 0px'
          }}
        >
          <Box display="flex" alignItems="baseline">
            {breadcrumbs.map((each, index) => (
              <Fragment key={index}>
                {index === breadcrumbs.length - 1 ? (
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: 'Open Sans',
                      color: '#152536',
                      marginLeft: '6px'
                    }}
                  >
                    {each.name}
                  </Typography>
                ) : (
                  <Box>
                    <Link
                      style={{
                        fontSize: '12px',
                        fontWeight: '400',
                        fontFamily: 'Open Sans',
                        color: '#68717A',
                        textDecoration: 'none'
                        // marginRight: "6px",
                        // marginLeft: "6px",
                      }}
                      to={each.url}
                    >
                      {each.name}
                    </Link>
                    <span style={{ margin: '0 6px' }}>/</span>
                  </Box>
                )}
              </Fragment>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                fontFamily: 'Open Sans',
                color: '#152536',
                margin: '10px 0'
              }}
            >
              {_.get(allGroupData, 'data.mainGroupName', '')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                columnGap: '50px',
                paddingLeft: '15px'
              }}
            >
              <Typography
                style={activeTab === 'overview' ? activeStyle : inActiveStyle}
                onClick={() => {
                  navigate(`${url}/overview${param}`);
                }}
              >
                Overview
              </Typography>
              <Typography
                onClick={() => {
                  navigate(`${url}/insights${param}`);
                }}
                style={activeTab === 'insights' ? activeStyle : inActiveStyle}
              >
                Insights
              </Typography>
              <Typography
                style={activeTab === 'users' ? activeStyle : inActiveStyle}
                onClick={() => navigate(`${url}/users${param}`)}
              >
                Users
              </Typography>
              <Typography
                style={activeTab === 'matches' ? activeStyle : inActiveStyle}
                onClick={() => navigate(`${url}/matches${param}`)}
              >
                Matches
              </Typography>
              <Typography
                onClick={() => navigate(`${url}/settings${param}`)}
                style={activeTab === 'settings' ? activeStyle : inActiveStyle}
              >
                Settings
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }
    return null;
  };

  if (orgGroupData) {
    if (allGroupData?.loading) {
      return <AppLoader />;
    }
    if (allGroupData.error) {
      return <div>{allGroupData.errorText}</div>;
    }
    if (allGroupData.data) {
      return (
        <Box className="bodyBox">
          {allGroupData.data ? getTabs() : null}
          <Outlet />
        </Box>
      );
    }
  }
  return null;
};

export default ProgramDetails;
