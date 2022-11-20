import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { IRecord } from '../../types';

const Records = () => {
  const [records, setRecords] = useState<IRecord[]>([]);
  const axios = useAxios();
  const history = useNavigate();

  const fetchData = async () => {
    return await axios.get<IRecord[]>('/record');
  };

  useQuery(
    ['fetchRecords'],
    async () => {
      const { data } = await fetchData();
      setRecords(data);
    }
  );

  const sortData = () => {
    const recs = records.sort((a, b) => a.name.localeCompare(b.name));
    console.log(recs);
    setRecords(recs);
  };

  return (
    <BaseContainer>
      <h1> Records </h1>
      <div>
        <Button variant='contained' onClick={() => history('/records/add')}>
          Import file
        </Button>
      </div>
      <div className='my-10'>
        <table className='w-full'>
          <thead>
            <tr className='border-b-2 text-left'>
              <th className='p-2'> ID </th>
              <th className='p-2' onClick={() => sortData()}> Name </th>
              <th className='p-2'> Author </th>
              <th className='p-2'> Created at </th>
              <th className='p-2'> Operations </th>
            </tr>
          </thead>
          <tbody>
            {records.map((x) => (
              <tr
                className='even:bg-gray-200 dark:even:bg-gray-700 text-left cursor-pointer'
                key={x.id}
              >
                <td onClick={() => history(`/record/${x.id}`)} className='border-b-2 p-2'> {x.id} </td>
                <td onClick={() => history(`/record/${x.id}`)} className='border-b-2 p-2'> {x.name} </td>
                <td className='border-b-2 p-2'> {x.person?.firstname} {x.person?.lastname} </td>
                <td onClick={() => history(`/record/${x.id}`)} className='border-b-2 p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
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
    </BaseContainer>
  );
};

export default Records;
