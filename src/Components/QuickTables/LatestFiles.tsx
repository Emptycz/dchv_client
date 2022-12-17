import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';
import useAxios from '../../Hooks/Axios.hook';
import { IRecord } from '../../types';
import { ColorRing } from 'react-loader-spinner';
import LoadingCircle from '../Spinners/LoadingCircle';

const LatestFiles = () => {
  const axios = useAxios();

  const { data, isLoading } = useQuery(
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

  const renderData = (data?: IRecord[]) => data?.map((x) => (
    <tr className='even:bg-gray-200 dark:even:bg-gray-700' key={x.id}>
      <td className='border-b-2 text-left p-2'> {x.name} </td>
      <td className='border-b-2 text-left p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
    </tr>
  ));

  return (
    isLoading ? <LoadingCircle show={isLoading} /> : (
      <table className='m-0'>
        <thead>
          <tr className='border-b-2'>
            <th onClick={() => sortData()}> Record </th>
            <th> Created at </th>
          </tr>
        </thead>
        <tbody>
          {renderData(data)}
        </tbody>
      </table>
    )
  );
};

export default LatestFiles;