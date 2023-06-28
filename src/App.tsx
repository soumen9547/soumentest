/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import AppRoutes from './routes/AppRoutes';
import './App.css';
import './custom.css';
import { Auth0Provider } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AppLoader } from './components/AppLoader';
import { fetchOrgId } from './redux/slices/orgId/orgIdSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DialogSelector from './components/DialogUi';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchAcsToken } from './redux/slices/acs-token/acsTokenSlice';
import { getUserDetails } from './utils/orgName';
import _ from 'lodash';
import { store } from './redux/store';
// import ReceiveInstantCall from "./pages/new-designs/tabs/ReceiveInstantCall";
const queryClient = new QueryClient();

axios.interceptors.request.use((request: any) => {
  const tokens = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens') || '') : {};
  const req = {
    ...request,
    headers: {
      ...request.headers,
      authorization: `Bearer ${tokens.access_token}`,
      idtoken: tokens.id_token
    }
  };
  return req;
});

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error) => {
    if (
      _.get(error, 'response.request.responseURL').includes('/api/azureToken') &&
      _.get(error, 'response.status') === 401
    ) {
      const { communicationUserId } = getUserDetails();
      if (communicationUserId) {
        store.dispatch(fetchAcsToken({ communicationId: communicationUserId }));
      }
    } else if (
      _.get(error, 'response.request.responseURL').includes('/api/getChatThread') &&
      _.get(error, 'response.status') === 401
    ) {
      const { communicationUserId } = getUserDetails();
      if (communicationUserId) {
        store.dispatch(fetchAcsToken({ communicationId: communicationUserId }));
      }
    }
  }
);

function App() {
  let domain: string;
  if (window.location.hostname === 'localhost') {
    domain = 'dev';
  } else {
    const url = new URL(window.location.origin);
    domain = url.hostname.split('.')[0];
  }
  const urlParams = new URLSearchParams(window.location.search);
  const invitation = urlParams.get('invitation');
  const orgName = urlParams.get('organization_name');
  const organization = urlParams.get('organization');
  let userType = '';
  const orgDetails = useAppSelector((state) => state.orgIdReducer);
  const dispatch = useAppDispatch();

  const isInvited = invitation && orgName && organization;

  if (domain.includes('admin')) {
    if (!isInvited) {
      userType = 'platAdmin';
    }
  }

  if (invitation) {
    localStorage.setItem('invitation', JSON.stringify(invitation));
  }

  const providerConfig = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    redirectUri: window.location.origin,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    audience: process.env.REACT_APP_AUTH0_AUDIENCE || ''
  };

  const config2 = {
    ...providerConfig,
    // organization: "org_00hKCs4eUhot2J4n",
    organization: orgDetails.data?.authOrgId || ''
  };

  const inviteConfig = {
    ...providerConfig,
    invitation,
    organization
  };

  const render = (config: any) => {
    return (
      <Auth0Provider cacheLocation="localstorage" useCookiesForTransactions={true} {...config}>
        <QueryClientProvider client={queryClient}>
          <>
            <AppRoutes />
            <DialogSelector />
          </>
        </QueryClientProvider>
      </Auth0Provider>
    );
  };

  useEffect(() => {
    if (isInvited) {
      if (orgName !== domain) {
        const url = `https://${orgName}.dosen2.io/?invitation=${invitation}&organization=${organization}&organization_name=${orgName}`;
        window.location.replace(url);
      }
    }
  }, []);

  useEffect(() => {
    if (userType === '' && !isInvited && !orgDetails.data) {
      dispatch(fetchOrgId(domain));
    }
  }, [orgName]);

  const checkDomain = () => {
    if (orgName === domain) {
      return render(inviteConfig);
    } else {
      return null;
    }
  };

  const checkRole = () => {
    if (userType === 'platAdmin') {
      return render(providerConfig);
    } else {
      if (orgDetails.error) {
        return <div>{orgDetails.errorText}</div>;
      }
      if (orgDetails.loading) {
        return null;
      }
      if (orgDetails.data) {
        return render(config2);
      }
    }
  };

  return (
    <>
      {isInvited ? checkDomain() : orgDetails.loading ? <AppLoader /> : checkRole()}
      <ToastContainer />
      {/* <ReceiveInstantCall /> */}
    </>
  );
}

export default App;
