import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuickActionBox from '../../Components/Boxes/QuickActionBox';
import LatestFiles from '../../Components/QuickTables/LatestFiles';
import BaseContainer from '../../Containers/Base/BaseContainer';

const Dashboard = () => {
  const history = useNavigate();

  return (
    <BaseContainer>
      <div className='flex flex-col gap-20'>
        <div className='flex flex-col gap-10'>
          <h1 className='border-b-1'> Quick actions </h1>
          <div className='flex flex-row gap-10'>
            <QuickActionBox label='New record' />
            <QuickActionBox label='Show records' onClick={() => history('/records')} />
          </div>
        </div>
        <div className='flex flex-row gap-10'>
          <div className='flex flex-col gap-10 w-96'>
            <h2> Your latest files </h2>
            <LatestFiles />
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Dashboard;