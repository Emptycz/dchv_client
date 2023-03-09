import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { ILogin } from '../../types';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';
import AlertModal from '../../Components/Modals/AlertModal';

const Users = () => {
  const axios = useAxios();
  const history = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState<{open: boolean, user?: ILogin}>({ open: false });

  const { data, isLoading } = useQuery(
    ['getUsers'],
    async (): Promise<ILogin[]> => {
      const { data: res } = await axios.get<ILogin[]>('/login');
      return res;
    }
  );

  const { mutateAsync: removeLogin } = useMutation(
    ['removeUser'],
    async (id: number): Promise<boolean> => {
      const { status } = await axios.delete(`/login/${id}`);
      return status === 200;
    }
  );

  const onRemoveUser = async (id?: number) => {
    if (!id) return console.error('onRemoveRecord: `id` is undefined');
    if (await removeLogin(id)) queryClient.invalidateQueries('getUsers');
    setIsOpen({ open: false });
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
                {Array.isArray(data) && data?.map((x) => (
                  <tr
                    className='even:bg-gray-200 dark:even:bg-gray-700 text-left cursor-pointer'
                    key={x.id}
                  >
                    <td onClick={() => history(`/user/${x.id}`)} className='border-b-2 p-2'> {x.id} </td>
                    <td onClick={() => history(`/user/${x.id}`)} className='border-b-2 p-2'> {x.username} </td>
                    <td onClick={() => history(`/user/${x.id}`)} className='border-b-2 p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
                    <td className='border-b-2 p-2 m-2'>
                      <Tooltip title='Remove user' placement='right'>
                        <IconButton onClick={() => setIsOpen({open: true, user: x})}>
                          <RemoveCircle color='error' />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>)}
        </div>
      </div>
      <AlertModal
        isOpen={isOpen.open}
        title='Attempt to permanently remove login (user)'
        onSubmit={() => onRemoveUser(isOpen.user?.id)}
        onCancel={() => setIsOpen({ ...isOpen, open: false })}
      >
        <>
          <p> You are trying to permanently remove login (user), do you wish to continue? </p>
          <div className='flex flex-row gap-6 mt-6'>
            <div className='flex flex-col gap-1'>
              <span> Login ID: </span>
              <span> Login username: </span>
              <span> Linked person:  </span>
            </div>
            <div className='flex flex-col gap-1'>
              <span> {isOpen.user?.id} </span>
              <span> {isOpen.user?.username} </span>
              <span> {isOpen.user?.persons?.[0]?.firstname} {isOpen.user?.persons?.[0]?.lastname} </span>
            </div>
          </div>
        </>
      </AlertModal>

    </BaseContainer>
  );
};

export default Users;