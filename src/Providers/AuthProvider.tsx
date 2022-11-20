import React, { useState } from 'react';
import { AuthContextProvider } from '../Contexts/AuthContext';
import { IPerson } from '../types';

type AuthProviderType = {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderType) => {
  const getToken = () => (localStorage.getItem('token') || '');

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}') as IPerson;
    } catch (err) {
      return {} as IPerson;
    }
  };

  const [token, setToken] = useState<string | undefined>(getToken());
  const [user, setUser] = useState<IPerson | undefined>(getUser());

  const persistToken = (value?: string) => {
    localStorage.setItem('token', value || '');
    setToken(value);
  };

  const persistUser = (value?: IPerson) => {
    localStorage.setItem('user', JSON.stringify(value));
    setUser(value);
  };

  return (
    <AuthContextProvider value={{
      user,
      setUser: persistUser,
      token,
      setToken: persistToken
    }}>
      {children}
    </AuthContextProvider>
  );
};
