import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

type ProtectedRouteType = {
  children: React.ReactElement | React.ReactElement[];
}

const ProtectedRoute: React.FC<ProtectedRouteType> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.id) return (<Navigate to="/" />);
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
