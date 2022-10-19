import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { ILogin } from '../../types';

type UserProps = {
  loginId: string;
}

const User = () => {
  const { loginId } = useParams<UserProps>();

  const [user, setUser] = useState<ILogin>();
  const { token } = useContext(AuthContext);

  const axios = useAxios(token);

  useEffect(() => {
    if (!loginId) return;
    axios.get(`/login/${loginId}`)
      .then((x) => {
        setUser(x.data);
      });
  }, [loginId]);

  return (
    <BaseContainer>
      <h1> {user?.username} </h1>
    </BaseContainer>
  );
};

export default User;
