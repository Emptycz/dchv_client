import React from 'react';
import { TabList } from 'react-tabs';

type StyledTabListProps = {
  children: React.ReactNode;
};

const StyledTabList = ({ children }: StyledTabListProps) => {
  return (
    <TabList className='flex flex-row gap-10 py-2'>
      {children}
    </TabList>
  );
};

export default StyledTabList;
