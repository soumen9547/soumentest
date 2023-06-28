import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../utils/orgName';
import moment from 'moment';
import Cookies from 'js-cookie';
// import Cookies from "js-cookie";
// import { useLogout } from "../hooks";

const SecuredRoutes = () => {
  const tokens = localStorage.getItem('tokens');
  const navigate = useNavigate();

  function clearAllCookies() {
    const cookies = Object.keys(Cookies.get()); // Get all cookie names

    cookies.forEach((cookieName) => {
      Cookies.remove(cookieName, { path: '' });
    });
  }

  const checkSession = () => {
    const { exp } = getUserDetails();
    const currentTime = moment();
    const expiryTime = moment.unix(exp);

    if (currentTime.isAfter(expiryTime)) {
      localStorage.clear();
      clearAllCookies();
      navigate('/login'); // Redirect to the login page
      return null; // Return null since the navigation will handle the rendering
    } else {
      return <Outlet />; // Render the nested routes
    }
  };

  return tokens ? checkSession() : <Navigate to="/login" />;
};

export default SecuredRoutes;
