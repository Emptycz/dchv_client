import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/Auth.hook';
import { IRole } from '../types';

type ProtectedRouteType = {
  role?: IRole;
  children: React.ReactElement | React.ReactElement[];
}

const ProtectedRoute: React.FC<ProtectedRouteType> = ({ role, children }) => {
  const { user } = useAuth();

  // TODO: We want to check if two arrays have at least 1 role in common
  if (role && !user?.roles?.some((x) => x.name === role.name)) return (<Navigate to="/" />);

  if (!user || !user.id) return (<Navigate to="/" />);
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
