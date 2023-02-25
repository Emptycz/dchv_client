import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Paths from './Routes/Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './Providers/AuthProvider';
import { SidebarProvider } from './Providers/SidebarProvider';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import useColorMode from './Hooks/ColorMode.hook';

import './App.scss';

function App() {
  const queryClient = new QueryClient();
  const { mode } = useColorMode();

  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <AuthProvider>
            <BrowserRouter>
              <SidebarProvider>
                <Paths />
              </SidebarProvider>
            </BrowserRouter>
          </AuthProvider>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
