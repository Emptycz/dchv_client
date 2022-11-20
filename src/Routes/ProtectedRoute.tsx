import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/Auth.hook';

type ProtectedRouteType = {
  children: React.ReactElement | React.ReactElement[];
}

const ProtectedRoute: React.FC<ProtectedRouteType> = ({ children }) => {
  const { user } = useAuth();

  if (!user || !user.id) return (<Navigate to="/" />);
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
