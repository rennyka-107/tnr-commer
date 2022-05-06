import useAuth from 'hooks/useAuth';
import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

type RoleRouteType = {
  children: JSX.Element;
  role: string;
};

const RoleRoute = ({ children, role }: RoleRouteType) => {
  const { user } = useAuth();

  if (user && user?.role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default RoleRoute;
