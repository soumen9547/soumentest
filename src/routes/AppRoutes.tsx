/* eslint-disable react-hooks/exhaustive-deps */
/**
 * AppRoutes
 * @author Chavan Dinesh <chavan.dinesh@ahex.co.in>
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import React, { Suspense, useCallback, useEffect } from 'react';
import ProtectedRoute from './ProtectedRoutes';
import { useAuth0 } from '@auth0/auth0-react';
import { AppLoader } from '../components/AppLoader';
import ZoomIndex from '../pages/new-designs/tabs/zoom/ZoomIndex';
import { LoginElement, OrganizationsElement, RedirectElement } from './lazyElements';
import { Exception } from '../components/Exception';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { API } from '../api';
import { getUserDetails } from '../utils/orgName';
import { acsChannelActions } from '../redux/slices/acs-channels/acsChannels';
import Layout from '../pages/new-designs/layout/Layout';
import HomeTab from '../pages/new-designs/tabs/HomeTab';
import CalendarTab from '../pages/new-designs/tabs/Calendar';
import Calls from '../pages/new-designs/tabs/calls/Calls';
import CommunityTab from '../pages/new-designs/tabs/Community';
import ChatTab from '../pages/new-designs/tabs/chat/Chat';
import { fetchAcsToken } from '../redux/slices/acs-token/acsTokenSlice';
import _ from 'lodash';
import ProfileLayout from '../pages/new-designs/tabs/ProfileLayout';
import CommunityMember from '../pages/new-designs/tabs/CommunityMember';
import ProgramDetails from '../pages/new-designs/tabs/Program/components/program tabs/ProgramDetails';
import ProgramOverview from '../pages/new-designs/tabs/Program/components/program tabs/ProgramOverview';
import ProgramUsers from '../pages/new-designs/tabs/Program/components/program tabs/ProgramUsers';
import ProgramSettings from '../pages/new-designs/tabs/Program/components/program tabs/ProgramSettings';
import ProgramInsights from '../pages/new-designs/tabs/Program/components/program tabs/ProgramInsights';
import LibraryTab from '../pages/new-designs/tabs/Library/LibraryTab';
import LibraryIndustries from '../pages/new-designs/tabs/LibraryIndustries';
import ROLES from '../utils/roles';
import Mentee from '../pages/new-designs/tabs/home/Mentee';
import Mentor from '../pages/new-designs/tabs/home/Mentor';
import MatchesMainPage from '../pages/new-designs/tabs/Matches/MatchesMainPage';
import ProfileSettings from '../pages/new-designs/tabs/profile/ProfileSettings';
import OrganizationSettings from '../pages/new-designs/tabs/profile/OrganizationSettings';
import Profile from '../pages/new-designs/tabs/profile/Profile';
import PasswordAndSecurity from '../pages/new-designs/tabs/profile/PasswordAndSecurity';
import SecuredRoutes from './SecuredRoutes';
import { fetchCommunityMembers } from '../redux/slices/acs-community-members/acsCommunityMembers';
import { ChatClient } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
// import Subsession from "../pages/new-designs/tabs/zoom/feature/subsession/subsession";
import { acsMessageNotificationActions } from '../redux/slices/acs-message-notifications/acsMessageNotificationsSlice';
import Knowledge from '../pages/new-designs/tabs/Knowledge';
let chatClient: any;
/**
 * AdminRoutes for Admins (Platform or Organization)
 * @returns jsx
 */
const NewPlatformAdminRoutes = (
  <Route path="/app" element={<ProtectedRoute permissions={[ROLES.platAdmin]} />}>
    <Route path="" element={<Layout />}>
      <Route path="organizations" element={<OrganizationsElement />} />
    </Route>
  </Route>
);

/**
 * UserRoutes for normal user (Other than admin)
 * @returns jsx
 */

/**
 * NewDesign Routes
 */

const ProgramRoutes = (
  <Route
    path="/app"
    element={<ProtectedRoute permissions={[ROLES.orgAdmin, ROLES.platAdmin, ROLES.grpAdmin, ROLES.member]} />}
  >
    <Route path="" element={<Layout />}>
      <Route path="programdetails/:orgId/:coId/:id" element={<ProgramDetails />}>
        <Route path="overview" element={<ProgramOverview />} />
        <Route path="users" element={<ProgramUsers />} />
        <Route path="insights" element={<ProgramInsights />} />
        <Route path="matches" element={<MatchesMainPage />} />
        <Route path="settings" element={<ProgramSettings />} />
      </Route>
    </Route>
  </Route>
);

/**
 * @function @name AppRoutes
 * @description It contains all the routes used in the application
 * @returns {React.ReactElement}
 */
const AppRoutes: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.userProfile.data);
  const acsToken = useAppSelector((state) => state.acsToken.data.token);
  const adminArray = useAppSelector((state) => state.userProfile.data?.admins) || [];
  const role = localStorage.getItem('role') || '';

  const loginUser = useAppSelector((state) => state.userProfile.data?.personal_details);

  chatClient = acsToken
    ? new ChatClient(
        process.env.REACT_APP_COMMUNICATION_SERVICES_ENDPOINT || '',
        new AzureCommunicationTokenCredential(acsToken)
      )
    : null;

  // dynamic redirection based on group based roles
  const getHomeTab = () => {
    const role = localStorage.getItem('role') || '';
    const admins = userProfile?.admins || [];
    const menteeArray = userProfile?.mentee || [];
    const mentorArray = userProfile?.mentors || [];
    if (role === ROLES.orgAdmin || role === ROLES.platAdmin) {
      return null;
    }
    if (
      (role === ROLES.member || role === ROLES.grpAdmin) &&
      admins.length > 0 &&
      menteeArray.length === 0 &&
      mentorArray.length === 0
    ) {
      return null;
    }
    return (
      <Route path="home" element={<HomeTab />}>
        <Route path="mentee" element={menteeArray?.length > 0 ? <Mentee /> : <Navigate to="/app/home" />} />
        <Route path="mentor" element={mentorArray?.length > 0 ? <Mentor /> : <Navigate to="/app/home" />} />
      </Route>
    );
  };

  const getChannels = async () => {
    if (acsToken && role !== ROLES.platAdmin) {
      dispatch(
        fetchCommunityMembers({
          orgId: getUserDetails().orgId,
          location: getUserDetails().location
        })
      );
    }
  };
  /**
   * Preload queries Section
   */
  useEffect(() => {
    if (acsToken) {
      getChannels();
      // queryClient.fetchQuery({ queryKey: ["getAcsChatThreads"] });
    }
  }, [acsToken]);

  useQuery({
    queryKey: ['getAcsChatThreads'],
    queryFn: async () => {
      const token = window.localStorage.getItem('acsToken');
      // return API.getACSChatThreads({
      const data = await API.getACSChatThreads({
        orgId: getUserDetails().orgId,
        acsToken: acsToken || token || ''
      });
      return data;
    },

    onSuccess: (data) => {
      dispatch(acsChannelActions.atnSaveChannels(data));
    },
    onError: (err) => {
      if (getUserDetails().communicationUserId) {
        dispatch(
          fetchAcsToken({
            communicationId: getUserDetails().communicationUserId
          })
        );
      }
      if (_.get(err, 'response.status') === 401) {
        dispatch(
          fetchAcsToken({
            communicationId: getUserDetails().communicationUserId
          })
        );
      }
    },
    enabled: false
  });
  /**
   * End of preload queries
   */

  const realTime = useCallback(async () => {
    if (acsToken) {
      await chatClient?.startRealtimeNotifications();
      chatClient?.on('chatMessageEdited', (e: any) => {
        const senderCommunicationId = _.get(e, 'sender.communicationUserId');
        if (_.get(loginUser, 'communicationId') !== senderCommunicationId) {
          dispatch(acsMessageNotificationActions.atnSaveNotification(e));
        }
      });
      chatClient?.on('chatMessageReceived', (e: any) => {
        const senderCommunicationId = _.get(e, 'sender.communicationUserId');
        const result = senderCommunicationId === _.get(loginUser, 'communicationId');
        if (!result) {
          dispatch(acsMessageNotificationActions.atnSaveNotification(e));
        }
      });
    }
  }, [acsToken]);

  useEffect(() => {
    realTime();
    return () => {
      realTime();
    };
  }, [acsToken]);

  if (isLoading) return <AppLoader />;
  const NewDesignRoutes = (
    <Route
      path="/app"
      element={<ProtectedRoute permissions={[ROLES.orgAdmin, ROLES.platAdmin, ROLES.member, ROLES.grpAdmin]} />}
    >
      <Route path="" element={<Layout />}>
        {getHomeTab()}

        <Route path="profile" element={<ProfileLayout />}>
          <Route path="" element={role !== ROLES.platAdmin ? <Profile /> : <PasswordAndSecurity />} />
          <Route path="" element={<ProtectedRoute permissions={[ROLES.orgAdmin]} />}>
            <Route path="orgsettings" element={<OrganizationSettings />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="security" element={<PasswordAndSecurity />} />
        </Route>
        <Route path="calls" element={<Calls />} />
        <Route path="calendar" element={<CalendarTab />} />
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="community" element={<CommunityTab />} />
        <Route path="library" element={<LibraryTab />} />
        <Route path="libraryindustries" element={<LibraryIndustries />} />
        <Route path="communitymember" element={<CommunityMember />} />
        <Route path="chat" element={<ChatTab />} />
      </Route>
    </Route>
  );
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route element={<SecuredRoutes />}>
          {NewPlatformAdminRoutes}
          {NewDesignRoutes}
          {(adminArray?.length > 0 || role !== ROLES.member) && ProgramRoutes}
        </Route>
        <Route path="/unauthorized" element={<Exception http={402} />} />
        <Route path="/not-found" element={<Exception http={404} />} />
        <Route path="/" element={<RedirectElement />} />
        <Route path="/video-call" element={<ZoomIndex />} />

        <Route path="*" element={<Navigate to="/not-found" replace />} />
        <Route path="/login" element={isAuthenticated ? <RedirectElement /> : <LoginElement />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
