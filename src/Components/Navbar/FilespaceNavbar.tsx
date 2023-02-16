import { DarkMode, LightMode, Logout } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/Auth.hook';
import useColorMode from '../../Hooks/ColorMode.hook';
import { isAdmin } from '../../Utils/Auth.utils';

type FilespaceNavbarProps = {
  title: string,
}

const FilespaceNavbar = ({ title }: FilespaceNavbarProps) => {
  const { mode: colorMode, setMode } = useColorMode();

  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const onSignOut = () => {
    signOut();
    navigate('/');
  };

  const invertColorMode = () => {
    if (colorMode === 'light') return setMode('dark');
    return setMode('light');
  };

  const getRouteToRecords = () => {
    if (!user) return '/filespace';
    return isAdmin(user) ? '/records' : '/filespace';
  };

  return (
    <nav className='flex py-6 px-8 justify-between flex-row-reverse items-center h-16 bg-blue-300 w-100 gap-6 text-gray-800 dark:bg-gray-900 dark:text-slate-200'>
      <div className='flex flex-row'>
        <div className='flex flex-row items-center gap-4 px-8'>
          <Button onClick={onSignOut}> <Logout /> Logout </Button>
        </div>
        <div className='flex flex-row items-center gap-4 px-8'>
          <span className='font-bold'> {user?.firstname} {user?.lastname} </span>
          <Avatar sx={{ bgcolor: deepOrange[500] }}> {user?.firstname?.[0]}{user?.lastname?.[0]} </Avatar>
        </div>
        <ul className='flex flex-row gap-5'>
          <li> Notifications </li>
          <li>
            <button onClick={() => invertColorMode()}>
              {colorMode === 'light' ?
                <DarkMode className='hover:text-gray-600' />
                : <LightMode className='hover:text-yellow-300 ' />
              }
            </button>
          </li>
        </ul>
      </div>
      <div className='flex flex-row gap-6'>
        <Button onClick={() => navigate(getRouteToRecords())} variant='outlined'> Zpět </Button>
        <h2> {title} </h2>
      </div>
    </nav>
  );
};

export default FilespaceNavbar;
