import { createContext } from 'react';
import { IPerson } from '../types';

interface IAuthContext {
  user: IPerson,
  token: string,
  setToken: (token: string) => void,
  setUser: (user: IPerson) => void, 
}

export const AuthContext = createContext<IAuthContext>({
  user: {} as IPerson,
  token: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});
  
export const AuthContextProvider = AuthContext.Provider;
  