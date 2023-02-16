import React from 'react';
import useAxios from '../../Hooks/Axios.hook';
import { useNavigate } from 'react-router-dom';
import { IRecord, IRecordCanvas, IRecordGroup } from '../../types';
import { useQuery } from 'react-query';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { Button } from '@mui/material';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';
import GenericCard from '../../Components/Cards/GenericCard';
import RecordCardList from '../../Components/Lists/RecordCardList';

const renderGroups = (groups: IRecordGroup[]) => {
  return groups.map((x) => (
    <GenericCard key={x.id} content='Folder' title={x.name} />
  ));
};

const Filespace = () => {
  const axios = useAxios();
  const history = useNavigate();

  const fetchData = async () => {
    return axios.get<IRecordCanvas>('/recordcanvas');
  };

  const { data, isLoading } = useQuery(
    ['fetchRecords'],
    async (): Promise<IRecordCanvas> => {
      const { data: recs } = await fetchData();
      return recs;
    }
  );

  return (
    <BaseContainer>
      <h1> Filespace </h1>
      <div>
        <Button variant='contained' onClick={() => history('/records/add')}>
          Add file
        </Button>
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
