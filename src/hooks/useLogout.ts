import { useAuth0 } from '@auth0/auth0-react';
import { persistor } from '../redux/store';

const useLogout = () => {
  const { logout } = useAuth0();

  const doLogout = async () => {
    localStorage.clear();
    localStorage.removeItem('persist:root');
    persistor.purge();
    logout({ returnTo: window.location.origin });
  };
  return { doLogout };
};
export default useLogout;
