import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/Axios.hook';
import { IRecord } from '../../types';
import LoadingCircle from '../Spinners/LoadingCircle';

type RecordListParams = {
  PersonID: number,
};

const RecordList = ({ PersonID }: RecordListParams) => {

  const axios = useAxios();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ['FetchRecordsForPerson', PersonID ],
    async () => {
      const { data: res } = await axios.get<IRecord[]>(`/records?PersonID=${PersonID}`);
      return res;
    }
  );

  return isLoading ? <LoadingCircle show={isLoading} /> : (
    <table className='w-full'>
      <thead>
        <tr className='border-b-2 text-left'>
          <th className='p-2'> ID </th>
          <th className='p-2'> Name </th>
          <th className='p-2'> Created at </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((x) => (
          <tr
            className='even:bg-gray-200 dark:even:bg-gray-700 text-left cursor-pointer'
            key={x.id}
          >
            <td onClick={() => navigate(`/record/${x.id}`)} className='border-b-2 p-2'> {x.id} </td>
            <td onClick={() => navigate(`/record/${x.id}`)} className='border-b-2 p-2'> {x.name} </td>
            <td onClick={() => navigate(`/record/${x.id}`)} className='border-b-2 p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

};

export default RecordList;
