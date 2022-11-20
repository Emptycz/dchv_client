import { createContext } from 'react';
import { IPerson } from '../types';

export interface IAuthContext {
  user?: IPerson,
  token?: string,
  setToken: (token?: string) => void,
  setUser: (user?: IPerson) => void,
}

export const AuthContext = createContext<IAuthContext>({
  user: {} as IPerson,
  token: '',
  setToken: () => {},
  setUser: () => {},
});

export const AuthContextProvider = AuthContext.Provider;
