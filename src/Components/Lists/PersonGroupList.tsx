import React from 'react';
import { useQuery } from 'react-query';
import useAxios from '../../Hooks/Axios.hook';
import { IPersonGroupRelation, IPersonGroupRelationsState } from '../../types';
import LoadingCircle from '../Spinners/LoadingCircle';
import { IconButton } from '@mui/material';
import { BlockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const PersonGroupList = () => {
  const axios = useAxios();
  const history = useNavigate();

  const { data, isLoading } = useQuery(['fetchPersonGroup'],
    async () => {
      const { data: res } = await axios.get<IPersonGroupRelation[]>(`/personGroupRelations?state=${IPersonGroupRelationsState.JOINED}&isAuthor=true`);
      return res;
    });

  return (
    <div className='flex justify-center'>
      {isLoading ? <LoadingCircle show={isLoading} /> : (
        !Array.isArray(data) ? (
          <h3 className='self-center'> You have no teams </h3>
        ) :
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 text-left'>
                <th className='p-2'> Team Name </th>
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
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {x.group?.displayName || x.group?.name} </td>
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
          </table>
      )}
    </div>
  );
};

export default PersonGroupList;
