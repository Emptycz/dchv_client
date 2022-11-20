import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

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
