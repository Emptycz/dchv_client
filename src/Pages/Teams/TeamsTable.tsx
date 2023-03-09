import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { useQuery } from 'react-query';
import { IPersonGroup } from '../../types';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';
import moment from 'moment';

const TeamsTable = () => {
  const axios = useAxios();
  const history = useNavigate();

  const { data, isLoading } = useQuery(['fetchPersonGroup'],
    async () => {
      const { data: res } = await axios.get<IPersonGroup[]>('/personGroup');
      return res;
    });

  return (
    <BaseContainer>
      <h1> Teams </h1>
      <div className='my-10'>
        {isLoading ? <LoadingCircle show={isLoading} /> : (
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 text-left'>
                <th className='p-2'> ID </th>
                <th className='p-2'> Team Name </th>
                <th className='p-2'> Author </th>
                <th className='p-2'> Created_at </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data?.map((x) => (
                <tr
                  className='even:bg-gray-200 dark:even:bg-gray-700 text-left cursor-pointer'
                  key={x.id}
                >
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {x.id} </td>
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {x.name} </td>
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {`${x.person?.firstname} ${x.person?.lastname}`} </td>
                  <td onClick={() => history(`/group/${x.id}`)} className='border-b-2 p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
        }

      </div>
    </BaseContainer>
  );
};

export default TeamsTable;