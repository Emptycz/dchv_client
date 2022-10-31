import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../Contexts/AuthContext';
import useAxios from '../../Hooks/useAxios';
import { IRecord } from '../../types';

const LatestFiles = () => {
  const [records, setRecords] = useState<IRecord[]>([]);

  const { token } = useContext(AuthContext);
  const axios = useAxios(token);

  useQuery(
    ['fetchLatestRecords'],
    async () => {
      const { data } = await axios.get('/record');
      setRecords(data);
    }
  );

  const sortData = () => {
    const recs = records.sort((a, b) => a.name.localeCompare(b.name));
    console.log(recs);
    setRecords(recs);
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
        {records.map((x) => (
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