import React from 'react';
import './App.scss';
import { AuthContextProvider } from './Contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Paths from './Routes/Routes';
import { IPerson } from './types';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const getToken = () => (localStorage.getItem('token') || '');
  const setToken = (value: string) => (localStorage.setItem('token', value));

  const getUser = () => (JSON.parse(localStorage.getItem('user') || '{}') || '');
  const setUser = (value: IPerson) => (localStorage.setItem('user', JSON.stringify(value)));

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <AuthContextProvider value={{
          user: getUser(),
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
  );
}

export default App;
