import { Outlet, RouteObject } from 'react-router-dom';
import Loadable from './Loadable';
import { lazy } from 'react';


// User Profile
const CompanyProfile = Loadable(lazy(() => import('views/Setting/Edit')));

const SettingRoutes: RouteObject = {
  path: 'settings',
  element: <Outlet />,
  children: [
    {
      path: 'company',
      // children: [{ path: ':id/edit', element: <CompanyProfile /> },],
      children: [{ path: 'edit', element: <CompanyProfile /> },],
    },
  ],
};

export default SettingRoutes;
