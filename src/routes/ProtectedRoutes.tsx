/**
 * ProtectedRoute
 * @description It allows users to access authorized routes
 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";

interface IProtectedRoutes {
  permissions: string[];
}
/**
 * @function @name ProtectedRoute
 * @description to check and redirect the user is authorized or not
 * @returns {React.ReactElement}
 */
const ProtectedRoute: React.FC<IProtectedRoutes> = ({ permissions }) => {
  const role = localStorage.getItem('role') || '';

  // TODO: need to change with isAuthenticated
  const getPermissions = () => {
    if (role) {
      if (permissions.includes(role)) {
        return <Outlet />;
      } else {
        return <Navigate to="/unauthorized" replace />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };

  return <>{getPermissions()}</>;
};
export default ProtectedRoute;
