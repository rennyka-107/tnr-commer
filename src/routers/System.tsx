import { RouteObject } from 'react-router-dom';
import Loadable from './Loadable';
import { lazy } from 'react';
import RoleRoute from 'components/common/RoleRoute';
import { RoleList } from 'utils/constants';

const System = Loadable(lazy(() => import('views/System')));
const MenuSetting = Loadable(lazy(() => import('views/System/MenuSetting')));
const ListCompany = Loadable(lazy(() => import('views/System/ListCompany')));
const ListEmployee = Loadable(lazy(() => import('views/System/ListEmployee')));
const ListDistributor = Loadable(
  lazy(() => import('views/System/ListDistributor'))
);
const ListEmployeeOfDistributor = Loadable(
  lazy(() => import('views/System/ListEmployeeOfDistributor'))
);
const SystemDecentralization = Loadable(
  lazy(() => import('views/System/SystemDecentralization'))
);

const SystemRoutes: RouteObject = {
  path: 'system',
  element: <System />,
  children: [
    {
      index: true,
      path: 'menu-setting',
      element: (
        <RoleRoute role={RoleList.SA}>
          <MenuSetting />
        </RoleRoute>
      ),
    },
    {
      path: 'companies',
      element: (
        <RoleRoute role={RoleList.SA}>
          <ListCompany />
        </RoleRoute>
      ),
    },
    {
      path: 'employees',
      element: (
        <RoleRoute role={RoleList.SA}>
          <ListEmployee />
        </RoleRoute>
      ),
    },
    {
      path: 'distributors',
      element: (
        <RoleRoute role={RoleList.SA}>
          <ListDistributor />
        </RoleRoute>
      ),
    },
    {
      path: 'employee-of-distributors',
      element: (
        <RoleRoute role={RoleList.SA}>
          <ListEmployeeOfDistributor />
        </RoleRoute>
      ),
    },
    {
      path: 'system-decentralization',
      element: (
        <RoleRoute role={RoleList.SA}>
          <SystemDecentralization />
        </RoleRoute>
      ),
    },
  ],
};

export default SystemRoutes;
