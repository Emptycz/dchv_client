import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuickActionBox from '../../Components/Boxes/QuickActionBox';
import LatestFiles from '../../Components/QuickTables/LatestFiles';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { AddBox, FolderShared, Group, Topic } from '@mui/icons-material';

import './Dashboard.scss';
import useAuth from '../../Hooks/Auth.hook';
import { isAdmin } from '../../Utils/Auth.utils';
import { Divider } from '@mui/material';

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
            <QuickActionBox className='flex' icon={<AddBox className='extra_large_icon' />} label='New team' onClick={() => history('/teams/add')} />
          </div>
          <Divider />
          <div className='flex flex-row gap-10'>
            {isAdmin(user) ? (
              <QuickActionBox className='flex' label='Show records' icon={<Topic className='extra_large_icon' />} onClick={() => history('/records')} />
            ) : (
              <QuickActionBox className='flex' label='Show records' icon={<Topic className='extra_large_icon' />} onClick={() => history('/filespace')} />
            )}
            <QuickActionBox className='flex' label='Shared with me' icon={<FolderShared className='extra_large_icon' />} onClick={() => history('/shared')} />
            <QuickActionBox className='flex' label='My teams' icon={<Group className='extra_large_icon' />} onClick={() => history('/teams')} />
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