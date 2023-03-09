import React, { useState } from 'react';
import useAxios from '../../Hooks/Axios.hook';
import { useNavigate } from 'react-router-dom';
import { IRecord, IRecordCanvas, IRecordData, IRecordGroup } from '../../types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { Button } from '@mui/material';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';
import GenericCard from '../../Components/Cards/GenericCard';
import RecordCardList from '../../Components/Lists/RecordCardList';
import useAuth from '../../Hooks/Auth.hook';
import RecordFilter from '../../Components/Filters/RecordFilter';
import { Form, FormState } from 'informed';

const renderGroups = (groups: IRecordGroup[]) => {
  return groups.map((x) => (
    <GenericCard key={x.id} content='Folder' title={x.name} />
  ));
};

const Filespace = () => {
  const axios = useAxios();
  const history = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<IRecordCanvas | null>(null);

  const queryClient = useQueryClient();

  const { isLoading } = useQuery(
    ['fetchRecords'],
    async (): Promise<IRecordCanvas> => {
      const { data: recs } = await axios.get<IRecordCanvas>(`/recordcanvas?personID=${user?.id}`);
      setData(recs);
      return recs;
    }
  );

  const { mutateAsync } = useMutation(['searchRecords'],
    async (data: any): Promise<IRecordCanvas> => {
      const { data: res } = await axios.post<IRecord[]>('/recordSearch', data);
      setData({ records: res } as IRecordCanvas);
      return { records: res } as IRecordCanvas;
    });

  const filterRecordData = ({ values }: FormState) => {
    const { row, value, column } = values;
    // search without filters on empty/no filters
    if (Object.keys(values).length === 0 || !Array.isArray(value)) return queryClient.invalidateQueries('fetchRecords');

    // prepare array of empty objects
    const rows: Partial<IRecordData>[] = new Array(value.length).map(() => ({}));
    // fill the prepared array of objects
    if (Array.isArray(value)) value.map((x, i) => (rows[i] = { ...rows[i], value: String(x)}));
    if (Array.isArray(row)) row.map((x, i) => rows[i] = {...rows[i], row: Number(x)});
    if (Array.isArray(column)) column.map((x, i) => rows[i] = {...rows[i], column: Number(x)});

    mutateAsync({ personID: user?.id, data: rows });
  };

  return (
    <BaseContainer>
      <h1> Filespace </h1>
      <div className='flex flex-col gap-6'>
        <Button variant='contained' onClick={() => history('/records/add')}>
          Add file
        </Button>
        <Form onSubmit={filterRecordData}>
          <RecordFilter />
          <Button type='submit'> Filter </Button>
        </Form>
      </div>
      <div className='my-10 flex flex-row gap-5 flex-wrap'>
        {isLoading ? <LoadingCircle show={isLoading} /> : (
          <>
            {!data?.groups || data?.groups.length === 0 ? null : renderGroups(data?.groups)}
            <RecordCardList records={data?.records} />
          </>
        )}
      </div>
    </BaseContainer>
  );
};

export default Filespace;
