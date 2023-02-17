import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { IPersonGroup } from '../../types';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';

const Groups = () => {
  const axios = useAxios();
  const history = useNavigate();

  const fetchData = async () => {
    return await axios.get<IPersonGroup[]>('/personGroup');
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ['fetchPersonGroups'],
    async (): Promise<IPersonGroup[]> => {
      const { data: res } = await fetchData();
      return res || [];
    }
  );

  return (
    <BaseContainer>
      <h1> Groups </h1>
      <div>
        <Button variant='contained' onClick={() => history('/groups/add')}>
          Create new group
        </Button>
      </div>
      <div className='my-10'>
        {isLoading ? <LoadingCircle show={isLoading} /> : (
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 text-left'>
                <th className='p-2'> ID </th>
                <th className='p-2'> Name </th>
                <th className='p-2'> Author </th>
                <th className='p-2'> Created_at </th>
                <th className='p-2'> Operations </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((x) => (
                <tr
                  className='even:bg-gray-200 dark:even:bg-gray-700 text-left cursor-pointer'
                  key={x.id}
                >
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {x.id} </td>
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {x.name} </td>
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {`${x.person?.firstname} ${x.person?.lastname}`} </td>
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
                  <td className='border-b-2 p-2'>
                    <IconButton>
                      <BlockOutlined color='warning' />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>)}
      </div>


    </BaseContainer>
  );
};

export default Groups;