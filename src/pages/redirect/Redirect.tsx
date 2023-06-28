/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Updated import
import { AppLoader } from '../../components/AppLoader';
import jwt_decode from 'jwt-decode';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import { getUserDetails } from '../../utils/orgName';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAcsToken } from '../../redux/slices/acs-token/acsTokenSlice';
import _ from 'lodash';
import { fetchOrgLevelGroup } from '../../redux/slices/org-level-group/orgLevelGroupSlice';
import ROLES from '../../utils/roles';
import { fetchOrgDetails } from '../../redux/slices/orgDetails/orgDetailsSlice';
import { breadCrumbsActions } from '../../redux/slices/breadcrumbs/breadcrumbsSlice';
import { fetchUserProfile } from '../../redux/slices/user-profile/userProfieSlice';

const Redirect = () => {
  const {
    isAuthenticated,
    isLoading,
    error,
    // user,
    getAccessTokenSilently,
    getIdTokenClaims
  } = useAuth0();
  let role = localStorage.getItem('role') || '';
  const dispatch = useAppDispatch();
  const [roleLoading, setRoleLoading] = useState(true);
  const orgLevelGroup = useAppSelector((state) => state.orgLevelGroup);
  const userProfile = useAppSelector((state) => state.userProfile);

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    const claims = await getIdTokenClaims();
    const id_token = claims?.__raw;
    localStorage.setItem('tokens', JSON.stringify({ access_token: token, id_token }));
    const data: any = jwt_decode(token);
    const idData = jwt_decode(id_token || '');
    const getRole = data['https://dosen.io/role'];
    const orgDetails = data['https://dosen.io/organization'];
    const roleMappings: Record<number, string> = {
      1: ROLES.member,
      2: ROLES.orgAdmin,
      3: ROLES.platAdmin,
      4: ROLES.grpAdmin
    };

    role = roleMappings[getRole?.role] || '';

    dispatch(fetchUserProfile());
    if (role === ROLES.orgAdmin) {
      dispatch(fetchOrgLevelGroup(_.get(idData, 'user_metadata.coId', '')));
    }
    if (role !== ROLES.platAdmin) {
      dispatch(fetchOrgDetails(_.get(orgDetails, 'id', '')));
    }
    localStorage.setItem('role', role);
    setRoleLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getToken();
    }
  }, []);

  const redirect = () => {
    const { orgId, coId } = getUserDetails();
    if (roleLoading) {
      return <AppLoader />;
    } else {
      const role = localStorage.getItem('role') || '';
      /**
       * call required apis after success login here
       */
      dispatch(fetchAcsToken({ communicationId: getUserDetails().communicationUserId }));

      if (role === ROLES.platAdmin) return <Navigate to="app/organizations" replace />;
      if (role === ROLES.orgAdmin) {
        if (orgLevelGroup.loading) return <AppLoader />;
        if (orgLevelGroup.error) return <ErrorPage message={orgLevelGroup.errorText} />;
        if (orgLevelGroup.data) {
          const { orgId, coId } = getUserDetails();
          dispatch(
            breadCrumbsActions.removeBreadCrumbs({
              id: orgLevelGroup.data.grpId,
              name: 'Program',
              url: `/app/programdetails/${orgId}/${coId}/${orgLevelGroup.data.grpId}/overview`
            })
          );
          return <Navigate to={`/app/programdetails/${orgId}/${coId}/${orgLevelGroup.data.grpId}/overview`} />;
        }
        return <ErrorPage message="Something Went Wrong" />;
      }
      if (role === ROLES.member) {
        if (userProfile.loading) return <AppLoader />;
        if (userProfile.error) return <ErrorPage message={userProfile.errorText} />;
        if (userProfile.data) {
          if (userProfile.data.admins.length > 0) {
            dispatch(
              breadCrumbsActions.removeBreadCrumbs({
                id: 'admin',
                name: 'Program',
                url: `/app/programdetails/${orgId}/${coId}/admin/overview`
              })
            );
            return <Navigate to={`/app/programdetails/${orgId}/${coId}/admin/overview`} />;
          }
          if (userProfile.data.mentors.length > 0) return <Navigate to="/app/home/mentor" />;
          if (userProfile.data.mentee.length > 0) return <Navigate to="/app/home/mentee" />;
          return <Navigate to="/app/chat" replace />;
        }
        return <ErrorPage message="Failed to get User Profile" />;
      }
      if (role === ROLES.grpAdmin) {
        dispatch(
          breadCrumbsActions.removeBreadCrumbs({
            id: 'admin',
            name: 'Program',
            url: `/app/programdetails/${orgId}/${coId}/admin/overview`
          })
        );
        return <Navigate to={`/app/programdetails/${orgId}/${coId}/admin/overview`} />;
      }

      return <ErrorPage message="This user does not have a role associated" />;
    }
  };
  if (isLoading) return <AppLoader />;
  if (error) return <ErrorPage message={error.message} />;
  if (!isAuthenticated) return <Navigate to="/login" replace={true} />;

  return redirect();
};

export default Redirect;
