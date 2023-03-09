import { BlockOutlined, RemoveCircle } from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import useAxios from '../../Hooks/Axios.hook';
import { IRecord } from '../../types';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';
import AlertModal from '../../Components/Modals/AlertModal';

const Records = () => {
  const axios = useAxios();
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState<{open: boolean, record?: IRecord}>({ open: false });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ['fetchRecords'],
    async (): Promise<IRecord[]> => {
      const { data: recs } = await axios.get<IRecord[]>('/record');
      return recs;
    }
  );

  const { mutateAsync: removeRecord } = useMutation(
    ['removeRecord'],
    async (id: number): Promise<boolean> => {
      const { status } = await axios.delete(`/record/${id}`);
      return status === 200;
    }
  );

  const onRemoveRecord = async (id?: number) => {
    if (!id) return console.error('onRemoveRecord: `id` is undefined');
    if (await removeRecord(id)) queryClient.invalidateQueries('fetchRecords');
    setIsOpen({ open: false });
  };

  const sortData = () => {
    const recs = data?.sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <BaseContainer>
      <h1> Records </h1>
      <div>
        <Button variant='contained' onClick={() => history('/records/add')}>
          Add Record
        </Button>
      </div>
      <div className='my-10'>
        {isLoading ? <LoadingCircle show={isLoading} /> : (
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
              {Array.isArray(data) && data?.map((x) => (
                <tr
                  className='even:bg-gray-200 dark:even:bg-gray-700 text-left cursor-pointer'
                  key={x.id}
                >
                  <td onClick={() => history(`/record/${x.id}`)} className='border-b-2 p-2'> {x.id} </td>
                  <td onClick={() => history(`/record/${x.id}`)} className='border-b-2 p-2'> {x.name} </td>
                  <td className='border-b-2 p-2'> {x.person?.firstname} {x.person?.lastname} </td>
                  <td onClick={() => history(`/record/${x.id}`)} className='border-b-2 p-2'> {moment(x.created_at).format('DD.MM.YYYY')} </td>
                  <td className='border-b-2 p-2 m-2'>
                    <Tooltip title='Remove record' placement='right'>
                      <IconButton onClick={() => setIsOpen({open: true, record: x})}>
                        <RemoveCircle color='error' />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AlertModal
        isOpen={isOpen.open}
        title='Attempt to permanently remove record'
        onSubmit={() => onRemoveRecord(isOpen.record?.id)}
        onCancel={() => setIsOpen({ ...isOpen, open: false })}
      >
        <>
          <p> You are trying to permanently remove record, do you wish to continue? </p>
          <div className='flex flex-row gap-6 mt-6'>
            <div className='flex flex-col gap-1'>
              <span> Record ID: </span>
              <span> Record name: </span>
              <span> Author:  </span>
            </div>
            <div className='flex flex-col gap-1'>
              <span> {isOpen.record?.id} </span>
              <span> {isOpen.record?.name} </span>
              <span> {isOpen.record?.person?.firstname} {isOpen.record?.person?.lastname} </span>
            </div>
          </div>
        </>
      </AlertModal>
    </BaseContainer>
  );
};

export default Records;
