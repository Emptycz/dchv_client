import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import useColorMode from '../../Hooks/ColorMode.hook';

import './BaseContainer.scss';

type ContainerTypes = {
  showMenu?: boolean,
  children?: React.ReactNode,
}

const BaseContainer = ({ children }: ContainerTypes) => {

  const { mode: colorMode } = useColorMode();
  return (
    <div className={`${colorMode} flex flex-row `}>
      <Sidebar />
      <div className="flex flex-col w-screen">
        <Navbar />
        <div className="h-full px-16 py-6 dark:bg-gray-800 text-gray-800 dark:text-slate-200 transition duration-100 ease-linear">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseContainer;
