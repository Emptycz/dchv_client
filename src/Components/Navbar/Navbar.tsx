import { DarkMode, LightMode } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext, IColorModeContext } from '../../Contexts/ColorModeContext';
import useAuth from '../../Hooks/Auth.hooks';

const Navbar = () => {
  const { darkMode, setDarkMode }: IColorModeContext = useContext(ColorModeContext);

  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const onSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className='flex flex-row-reverse items-center h-16 bg-red-200 w-100 gap-6 text-gray-800 dark:bg-gray-900 dark:text-slate-200'>
      <div className='flex flex-row items-center gap-4 px-8'>
        <span onClick={onSignOut}> Logout </span>
      </div>
      <div className='flex flex-row items-center gap-4 px-8'>
        <span className='font-bold'> {user?.firstname} {user?.lastname} </span>
        <Avatar sx={{ bgcolor: deepOrange[500] }}> {user?.firstname?.[0]}{user?.lastname?.[0]} </Avatar>
      </div>
      <ul className='flex flex-row gap-5'>
        <li> Notifications </li>
        <li>
          <button onClick={() => setDarkMode(!darkMode)}>
            {!darkMode ?
              <DarkMode className='hover:text-gray-600' />
              : <LightMode className='hover:text-yellow-300 ' />
            }
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;