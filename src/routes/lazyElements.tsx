/**
 * This file includes all lazy components for optimizing the build performance
 */
import { lazy } from 'react';

export const OrganizationsElement = lazy(() =>
  import('../pages/organizations').then((module) => ({
    default: module.Organizations
  }))
);

export const LoginElement = lazy(() =>
  import('../pages/login').then((module) => ({
    default: module.Login
  }))
);

export const RedirectElement = lazy(() =>
  import('../pages/redirect').then((module) => ({
    default: module.Redirect
  }))
);

export const UsersElement = lazy(() =>
  import('../pages/users').then((module) => ({
    default: module.Users
  }))
);
