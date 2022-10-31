import React, { useContext } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { ColorModeContext } from '../../Contexts/ColorModeContext';

import './BaseContainer.scss';

type ContainerTypes = {
  showMenu?: boolean,
  children?: React.ReactNode,
}

const BaseContainer = ({ children }: ContainerTypes) => {

  const { darkMode } = useContext(ColorModeContext);

  return (
    <div className={darkMode ? 'dark' : undefined}>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-screen px-16 py-6 dark:bg-gray-800 text-gray-800 dark:text-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseContainer;
