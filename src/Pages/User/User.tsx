import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import RecordList from '../../Components/Lists/RecordList';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { ILogin } from '../../types';

type UserProps = {
  loginId: string;
}

const User = () => {
  const { loginId } = useParams<UserProps>();

  const axios = useAxios();

  const { data } = useQuery(
    ['FetchProfile', loginId],
    async () =>{
      const { data: res } = await axios.get<ILogin>(`/login/${loginId}`);
      return res;
    },
    {
      enabled: !!loginId,
    }
  );

  if (!data) return <Navigate to='/users' />;

  return (
    <BaseContainer>
      <h1> {data?.username} </h1>
      {}
      <div>
        <RecordList PersonID={data.persons?.[0].id} />
      </div>
    </BaseContainer>
  );
};

export default User;
