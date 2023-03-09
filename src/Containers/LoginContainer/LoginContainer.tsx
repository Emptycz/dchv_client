import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import useColorMode from '../../Hooks/ColorMode.hook';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

type ContainerTypes = {
  children?: React.ReactNode,
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const LoginContainer = ({ children }: ContainerTypes) => {

  return (
    <ThemeProvider theme={lightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default LoginContainer;
