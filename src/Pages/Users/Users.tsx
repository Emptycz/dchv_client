import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { ILogin } from '../../types';

const Users = () => {
  const [users, setUsers] = useState<ILogin[]>([]);

  const { token } = useContext(AuthContext);
  const axios = useAxios(token);
  const history = useNavigate();

  const fetchData = async () => {
    return await axios.get('/login');
  };

  useQuery(
    ['getUsers'],
    async () => {
      const { data } = await fetchData();
      setUsers(data);
    }
  );

  const removeUser = async (id: number) => {
    const result = await axios.delete(`/login/${id}`);
    if (result.status !== 200) return;
    setUsers(users?.filter((x) => x.id !== id));
  };

  const sortData = () => {
    const recs = users.sort((a, b) => a.username.localeCompare(b.username));
    console.log(recs);
    setUsers(recs);
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
              {users.map((x) => (
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
                    <IconButton onClick={() => console.error('Že já tě vymažu!')}>
                      <RemoveCircle color='error' />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </BaseContainer>
  );
};

export default Users;