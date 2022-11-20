import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';
import useAxios from '../../Hooks/Axios.hook';
import { IRecord } from '../../types';

const LatestFiles = () => {
  const axios = useAxios();

  const { data } = useQuery(
    ['fetchLatestRecords'],
    async (): Promise<IRecord[]> => {
      const { data: res } = await axios.get<IRecord[]>('/record');
      return res;
    },
  );

  const sortData = () => {
    const recs = data?.sort((a, b) => a.name.localeCompare(b.name));
    console.log(recs);
  };

  return (
    <table>
      <thead>
        <tr className='border-b-2'>
          <th onClick={() => sortData()}> Record </th>
          <th> Created at </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((x) => (
          <tr className='even:bg-gray-200 dark:even:bg-gray-700' key={x.id}>
            <td className='border-b-2 text-left p-2'> {x.name} </td>
            <td className='border-b-2 text-left p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LatestFiles;