import { AccountCircle, ArrowCircleLeft, ArrowCircleRight, AssignmentInd, Dashboard, FolderShared, Group, Mail, Topic} from '@mui/icons-material';
import React, { ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarContext } from '../../Contexts/SidebarContext';
import useAuth from '../../Hooks/Auth.hook';
import { isAdmin } from '../../Utils/Auth.utils';
import { Badge, Divider, Tooltip } from '@mui/material';
import { useQuery } from 'react-query';
import useAxios from '../../Hooks/Axios.hook';
import { IPersonGroupRelation } from '../../types';

type RouteType = {
  title: string,
  icon: ReactElement,
  route: string,
  badge?: number,
}

const adminRoutes: RouteType[] = [
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
    title:'All teams',
    icon: <Group />,
    route:'/admin/teams',
  },
];

let userRoutes: RouteType[] = [
  {
    title:'Dashboard',
    icon: <Dashboard />,
    route:'/dashboard'
  },
  {
    title:'Filespace',
    icon: <Topic />,
    route:'/filespace'
  },
  {
    title:'Shared with me',
    icon: <FolderShared />,
    route: '/shared',
  },
  {
    title:'Teams',
    icon: <Group />,
    route:'/teams'
  },
  {
    title: 'Invitations',
    icon: <Mail />,
    route: '/invitations',
  }
];

const renderMenuContent = (routes: RouteType[], isExtended = true ) => {
  const navigate = useNavigate();
  const { activeRoute, setActiveRoute } = useContext(SidebarContext);

  return (
    <ul className={`${isExtended ? 'w-64' : 'w-auto' } flex flex-col`}>
      {routes.map((x, index) => {
        const isActive = activeRoute === x.route ? 'dark:bg-gray-700 bg-blue-300' : null;
        return(
          <Tooltip placement='right' key={index} title={ !isExtended ? x.title : null}>
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
                <Badge badgeContent={x.badge} color="primary">
                  <i className='px-1'> {x.icon} </i>
                </Badge>
                <span className={isExtended ? 'px-4' : 'hidden'}> {x.title} </span>
              </a>
            </li>
          </Tooltip>
        );})}
    </ul>
  );
};


const Sidebar = () => {
  const { user } = useAuth();
  const { isExtended, setIsExtended } = useContext(SidebarContext);
  const history = useNavigate();
  const axios = useAxios();

  if (!user) {
    history('/login');
    return null;
  }

  const setInvCounter = (count: number) => {
    return userRoutes = userRoutes.map((x) => {
      if (x.route === '/invitations') return { ...x, badge: count };
      return x;
    });
  };

  useQuery(['fetchInvitationsCount'], async () => {
    const { data: res } = await axios.get<IPersonGroupRelation[]>('/personGroupRelations?state=1');
    setInvCounter(res.length);
    return res.length;
  });

  return (
    <nav className={`
      ${isExtended ? 'w-auto' : 'w-20'}
      flex
      flex-col
      bg-blue-300
      dark:bg-gray-900
      min-h-screen
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
      <div>
        <div className={`${isExtended ? 'justify-center' : 'justify-top pt-10'} h-52 flex flex-col align-middle items-center`}>
          <span className={`${isExtended ? 'text-[45px]' : 'text-[20px]' }`}> DCHV </span>
          <span className={isExtended ? 'text-sm dark:text-gray-300' : 'hidden'}> Databáze chemických vzorků </span>
        </div>
        <div className='flex flex-col'>
          {isAdmin(user) ? (
            <>
              {isExtended ? <p className='self-center'> Administration </p> : null}
              {renderMenuContent(adminRoutes, isExtended)}
              <Divider />
            </>
          ) : null}
        </div>
        <div>
          {renderMenuContent(userRoutes, isExtended)}
        </div>
      </div>
      <button className='py-8' onClick={() => setIsExtended(!isExtended)}>
        {!isExtended ? <ArrowCircleRight /> : <ArrowCircleLeft />}
      </button>
    </nav>
  );
};

export default Sidebar;
