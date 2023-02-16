import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuickActionBox from '../../Components/Boxes/QuickActionBox';
import LatestFiles from '../../Components/QuickTables/LatestFiles';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AddBox, Topic } from '@mui/icons-material';

import './Dashboard.scss';
import useAuth from '../../Hooks/Auth.hook';
import { isAdmin } from '../../Utils/Auth.utils';

const Dashboard = () => {
  const history = useNavigate();
  const { user } = useAuth();

  if (!user) {
    history('/login');
    return null;
  }

  return (
    <BaseContainer>
      <div className='flex flex-col gap-20'>
        <div className='flex flex-col gap-10'>
          <h1 className='border-b-1'> Quick actions </h1>
          <div className='flex flex-row gap-10'>
            <QuickActionBox className='flex' icon={<AddBox className='extra_large_icon' />} label='New record' onClick={() => history('/records/add')} />
            {isAdmin(user) ? (
              <QuickActionBox className='flex' label='Show records' icon={<Topic className='extra_large_icon' />} onClick={() => history('/records')} />
            ) : (
              <QuickActionBox className='flex' label='Show records' icon={<Topic className='extra_large_icon' />} onClick={() => history('/filespace')} />
            )}
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