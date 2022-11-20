import { AccountCircle, AssignmentInd, Dashboard, Group, Topic} from '@mui/icons-material';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import './Sidebar.scss';

type RouteType = {
  title: string,
  icon: ReactElement,
  route: string,
}

const adminRoutes = [
  {
    title:'Dashboard',
    icon: <Dashboard />,
    route:'/dashboard'
  },
  {
    title:'Users',
    icon: <AssignmentInd />,
    route:'/users'
  },
  {
    title:'Records',
    icon: <Topic />,
    route:'/records'
  },
  {
    title:'Profile',
    icon: <AccountCircle />,
    route:'/profile'
  },
  {
    title:'Groups',
    icon: <Group />,
    route:'/groups'
  },
];

const renderMenuContent = (routes: RouteType[] ) => {
  const history = useNavigate();

  return (
    <ul className='flex flex-col w-52'>
      {routes.map((x, index) => (
        <li className='flex flex-row h-12 hover:bg-blue-200 dark:hover:bg-gray-800 transition duration-200 ease-in-out' key={index}>
          <a className='cursor-pointer flex flex-grow border-b-2 dark:border-gray-700 w-100 justify-start px-2 items-center' onClick={() => history(x.route)}>
            <i> {x.icon} </i>
            <span className='px-2'> {x.title} </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => {
  return (
    <nav className="flex flex-col bg-red-300 w-auto h-screen dark:bg-gray-900 text-gray-800 dark:text-slate-200 border-r-2 dark:border-gray-700">
      {renderMenuContent(adminRoutes)}
    </nav>
  );
};

export default Sidebar;
