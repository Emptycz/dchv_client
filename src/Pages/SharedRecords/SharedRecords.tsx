import React from 'react';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { Button } from '@mui/material';
import { useQuery } from 'react-query';
import useAxios from '../../Hooks/Axios.hook';
import { IRecordCanvas, IRecordGroup } from '../../types';
import { useNavigate } from 'react-router-dom';
import LoadingCircle from '../../Components/Spinners/LoadingCircle';
import RecordCardList from '../../Components/Lists/RecordCardList';
import GenericCard from '../../Components/Cards/GenericCard';
import useAuth from '../../Hooks/Auth.hook';

const renderGroups = (groups: IRecordGroup[]) => {
  return groups.map((x) => (
    <GenericCard key={x.id} content='Folder' title={x.name} />
  ));
};

const SharedRecords = () => {
  const axios = useAxios();
  const history = useNavigate();
  const { user } = useAuth();

  const { data, isLoading } = useQuery(['fetchSharedRecords'], async () => {
    const { data: res } = await axios.get<IRecordCanvas>(`/recordcanvas?personID=${user?.id}&shared=true`);
    return res;
  });

  return (
    <BaseContainer>
      <h1> Filespace </h1>
      <div>
        <Button variant='contained' onClick={() => history('/records/share')}>
      Share file
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

export default SharedRecords;
