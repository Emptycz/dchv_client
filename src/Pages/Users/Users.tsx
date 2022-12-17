import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { ILogin } from '../../types';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';

const Users = () => {
  const axios = useAxios();
  const history = useNavigate();

  const fetchData = async () => {
    return await axios.get<ILogin[]>('/login');
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ['getUsers'],
    async (): Promise<ILogin[]> => {
      const { data: res } = await fetchData();
      return res;
    }
  );

  const removeUser = async (id: number) => {
    const result = await axios.delete(`/login/${id}`);
    if (result.status !== 200) return;
    queryClient.invalidateQueries('getUsers');
  };

  const sortData = () => {
    const recs = data?.sort((a, b) => a.username.localeCompare(b.username));
    // setUsers(recs);
  };


  return (
    <BaseContainer>
      <div className='users'>
        <div className='users__header'>
          <h1> Users </h1>
        </div>
        <div>
          <Button variant='contained' onClick={() => history('/users/add')}>
          Add user
          </Button>
        </div>
        <div className='my-10'>
          {isLoading ? <LoadingCircle show={isLoading} /> : (
            <table className='w-full'>
              <thead>
                <tr className='border-b-2 text-left'>
                  <th className='p-2'> ID </th>
                  <th className='p-2' onClick={() => sortData()}> Email </th>
                  <th className='p-2'> Created at </th>
                  <th className='p-2'> Operations </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((x) => (
                  <tr
                    className='even:bg-gray-200 dark:even:bg-gray-700 text-left cursor-pointer'
                    key={x.id}
                  >
                    <td onClick={() => history(`/user/${x.id}`)} className='border-b-2 p-2'> {x.id} </td>
                    <td onClick={() => history(`/user/${x.id}`)} className='border-b-2 p-2'> {x.username} </td>
                    <td onClick={() => history(`/user/${x.id}`)} className='border-b-2 p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
                    <td className='border-b-2 p-2'>
                      <IconButton>
                        <BlockOutlined color='warning' />
                      </IconButton>
                      <IconButton onClick={async () => await removeUser(x.id)}>
                        <RemoveCircle color='error' />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>)}
        </div>

      </div>
    </BaseContainer>
  );
};

export default Users;