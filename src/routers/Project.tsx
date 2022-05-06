import { RouteObject } from 'react-router-dom';
import Loadable from './Loadable';
import { lazy } from 'react';

const Project = Loadable(lazy(() => import('views/Project')));
const ListTypeLandSoft = Loadable(lazy(() => import('views/Project/ListTypeLandSoft')));

const ProjectRoutes: RouteObject = {
  path: 'project',
  element: <Project />,
  children: [
    {
      index: true,
      path: 'type-land-soft',
      element: <ListTypeLandSoft />,
    },
  ],
};

export default ProjectRoutes;
