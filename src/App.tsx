import React, { useEffect, useState } from 'react';
import './App.scss';
import { AuthContextProvider } from './Contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Paths from './Routes/Routes';
import { IPerson } from './types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ColorModeContextProvider } from './Contexts/ColorModeContext';

function App() {
  const getToken = () => (localStorage.getItem('token') || '');
  const setToken = (value: string) => (localStorage.setItem('token', value));

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (err) {
      return {} as IPerson;
    }
  };

  const setUser = (value: IPerson) => (localStorage.setItem('user', JSON.stringify(value)));

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const queryClient = new QueryClient();

  // Dark mode handling
  useEffect(() => {
    const currentMode = JSON.parse(localStorage.getItem('site-dark-mode') || '{}');
    if (currentMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // Setting dark mode and persist the state
  const onSetDarkMode = (val: boolean) => {
    localStorage.setItem('site-dark-mode', JSON.stringify(val));
    setDarkMode(val);
  };

  return (
    <ColorModeContextProvider value={{
      darkMode,
      setDarkMode: (val) => onSetDarkMode(val),
    }}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <AuthContextProvider value={{
            user: getUser() || {},
            token: getToken(),
            setToken: setToken,
            setUser: setUser,
          }}>
            <BrowserRouter>
              <Paths />
            </BrowserRouter>
          </AuthContextProvider>
        </div>
      </QueryClientProvider>
    </ColorModeContextProvider>

  );
}

export default App;
