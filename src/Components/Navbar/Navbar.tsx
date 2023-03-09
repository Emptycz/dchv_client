import { CircleNotifications, DarkMode, LightMode, Logout } from '@mui/icons-material';
import { Avatar, Button, Tooltip } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/Auth.hook';
import useColorMode from '../../Hooks/ColorMode.hook';

const Navbar = () => {
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

  return (
    <nav className='flex flex-row-reverse items-center h-16 bg-blue-300 w-100 gap-6 text-gray-800 dark:bg-gray-900 dark:text-slate-200'>
      <div className='flex flex-row items-center gap-4 px-8'>
        <Button onClick={onSignOut}> <Logout /> Logout </Button>
      </div>
      <div className='flex flex-row items-center gap-4 px-8'>
        <Avatar sx={{ bgcolor: deepOrange[500] }}> {user?.firstname?.[0]}{user?.lastname?.[0]} </Avatar>
        <span className='font-bold'> {user?.firstname} {user?.lastname} </span>
      </div>
      <ul className='flex flex-row gap-10'>
        <li>
          <Tooltip title={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            <button onClick={() => invertColorMode()}>
              {colorMode === 'light' ?
                <DarkMode className='hover:text-gray-600' />
                : <LightMode className='hover:text-yellow-300 ' />
              }
            </button>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;