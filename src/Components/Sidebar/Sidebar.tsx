import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { Roles } from '../../enums';
import { IRole } from '../../types';

import './Sidebar.scss';

const renderMenuContent = (roles: IRole[] | undefined) => {
  switch (roles?.[0]?.name) {
    case Roles.ADMIN:
      return (
        <ul>
          <li> <a href="/dashboard"> Dashboard </a></li>
          <li> <a href="/users"> Users </a> </li>
          <li> <a href="/records"> Records </a> </li>
          <li> <a href="/profile"> Profile </a> </li>
        </ul>
      );

    case Roles.USER:
      return 1;

    default:
      return (
        <ul>
          <li> <a href="/dashboard"> Dashboard </a></li>
          <li> <a href="/users"> Users </a> </li>
          <li> <a href="/records"> Records </a> </li>
          <li> <a href="/profile"> Profile </a> </li>
        </ul>
      );
  }
};

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="sidebar">
      {renderMenuContent(user.roles)}
    </nav>
  );
};

export default Sidebar;
