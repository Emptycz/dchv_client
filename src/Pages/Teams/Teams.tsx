import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../Containers/Base/BaseContainer';
import { Tab, TabPanel, Tabs } from 'react-tabs';
import StyledTabList from '../../Components/Tabs/StyledTabList';
import PersonGroupList from '../../Components/Lists/PersonGroupList';
import PersonSharedGroupList from '../../Components/Lists/SharedGroupList';

const Teams = () => {
  const history = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <BaseContainer>
      <h1> Teams </h1>
      <div>
        <Button variant='contained' onClick={() => history('/teams/add')}>
          Create new team
        </Button>
      </div>
      <div className='my-10'>
        <Tabs onSelect={(e) => setActiveTabIndex(e)} defaultIndex={0}>
          <StyledTabList>
            <Tab className={`cursor-pointer ${activeTabIndex === 0 ? 'border-b-2 dark:border-white border-black' : null}`}> My teams </Tab>
            <Tab className={`cursor-pointer ${activeTabIndex === 1 ? 'border-b-2 dark:border-white border-black' : null}`}> Joined teams </Tab>
          </StyledTabList>
          <TabPanel className='my-10'>
            <PersonGroupList />
          </TabPanel>
          <TabPanel className='my-10'>
            <PersonSharedGroupList />
          </TabPanel>
        </Tabs>
      </div>
    </BaseContainer>
  );
};

export default Teams;