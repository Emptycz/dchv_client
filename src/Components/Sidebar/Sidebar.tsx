import { AccountCircle, ArrowCircleLeft, ArrowCircleRight, AssignmentInd, Dashboard, Group, Topic} from '@mui/icons-material';
import React, { ReactElement, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarContext } from '../../Contexts/SidebarContext';

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

const renderMenuContent = (routes: RouteType[], isExtended = true ) => {
  const navigate = useNavigate();
  const { activeRoute, setActiveRoute } = useContext(SidebarContext);

  return (
    <div>
      <div className={`${isExtended ? 'justify-center' : 'justify-top pt-10'} h-52 flex flex-col align-middle items-center`}>
        <span className={`${isExtended ? 'text-[45px]' : 'text-[20px]' }`}> DCHV </span>
        <span className={isExtended ? 'text-sm dark:text-gray-300' : 'hidden'}> Databáze chemických vzorků </span>
      </div>
      <ul className={`${isExtended ? 'w-64' : 'w-auto' } flex flex-col`}>
        {routes.map((x, index) => {
          const isActive = activeRoute === x.route ? 'dark:bg-gray-700 bg-blue-300' : null;
          return(
            <li
              className={`
                ${isActive}
                flex
                flex-row
                h-12
                ${isExtended ? 'mx-2' : 'mx-4'}
                my-2
                rounded-md
                hover:bg-blue-200
                dark:hover:bg-gray-800`
              }
              key={index}
            >
              <a className={`
                ${isExtended ? 'w-100' : 'w-auto'}
                cursor-pointer
                flex
                flex-grow
                justify-start
                px-2
                items-center`
              }
              onClick={() => {setActiveRoute(x.route); navigate(x.route);}}>
                <i className='px-1'> {x.icon} </i>
                <span className={isExtended ? 'px-2' : 'hidden'}> {x.title} </span>
              </a>
            </li>
          );})}
      </ul>
    </div>
  );
};


const Sidebar = () => {
  const { isExtended, setIsExtended } = useContext(SidebarContext);

  return (
    <nav className={`
      ${isExtended ? 'w-auto' : 'w-20'}
      flex
      flex-col
      bg-blue-300
      h-screen
      dark:bg-gray-900
      bg-opacity-80
      text-gray-800
      dark:text-slate-200
      border-r-2
      dark:border-gray-700
      shadow-outline
      flex-grow
      justify-between`
    }
    >
      {renderMenuContent(adminRoutes, isExtended)}
      <button className='py-8' onClick={() => setIsExtended(!isExtended)}>
        {!isExtended ? <ArrowCircleRight /> : <ArrowCircleLeft />}
      </button>
    </nav>
  );
};

export default Sidebar;
