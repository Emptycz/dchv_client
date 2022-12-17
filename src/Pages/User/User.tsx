import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import RecordList from '../../Components/Lists/RecordList';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { ILogin } from '../../types';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';
import { Tab, TabPanel, Tabs } from 'react-tabs';
import StyledTabList from '../../Components/Tabs/StyledTabList';

type UserProps = {
  loginId: string;
}

const User = () => {
  const { loginId } = useParams<UserProps>();
  const axios = useAxios();

  const { data, isLoading } = useQuery(
    ['FetchProfile', loginId],
    async () => {
      const { data: res } = await axios.get<ILogin>(`/login/${loginId}`);
      return res;
    }, { enabled: !!loginId }
  );

  if (!data && !isLoading) return <Navigate to='/users' />;

  return (
    <BaseContainer>
      {isLoading ? <LoadingCircle show={isLoading} message="Loading user details  " /> : (
        <>
          <h1> {`${data?.persons?.[0].firstname} ${data?.persons?.[0].lastname}`} </h1>
          <div className='h-52 bg-red-800'>
            <span> account details </span>
          </div>
          <Tabs className='my-10' defaultIndex={0}>
            <StyledTabList>
              <Tab className='cursor-pointer'>Records</Tab>
              <Tab className='cursor-pointer'>Groups</Tab>
            </StyledTabList>
            <TabPanel>
              <div>
                <RecordList PersonID={data?.persons?.[0].id} />
              </div>
            </TabPanel>
          </Tabs>
        </>
      )}
    </BaseContainer>
  );
};

export default User;
