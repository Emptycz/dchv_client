import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';

import './BaseContainer.scss';

type ContainerTypes = {
  showMenu?: boolean,
  children?: React.ReactNode,
  darkMode?: boolean,
}

const BaseContainer = ({ children }: ContainerTypes) => {
  return (
    // TODO: This div will handle backgroud color (darkmode/lightmode) via class
    <div className="base-container">
      <Sidebar />
      <div className="base-container__children">
        {children}
      </div>
    </div>
  );
};

export default BaseContainer;
