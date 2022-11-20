import React from 'react';
import { Navigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAuth from '../../Hooks/Auth.hook';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to='/users' />;

  return (
    <BaseContainer>
      <div className="profile">
        <h1> {user?.firstname} {user?.lastname} </h1>
      </div>
    </BaseContainer>
  );
};

export default Profile;
