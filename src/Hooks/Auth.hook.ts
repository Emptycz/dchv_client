import { IPerson } from '../types';
import { AuthContext } from '../Contexts/AuthContext';
import { useContext } from 'react';

type AuthType = {
  user?: IPerson,
  signIn: (user: IPerson, token: string) => void,
  signOut: () => void,
};

const useAuth = (): AuthType => {
  const { user, setToken, setUser } = useContext(AuthContext);

  const signIn = (user: IPerson, token: string) => {
    setUser(user);
    setToken(token);
  };

  const signOut = () => {
    setUser();
    setToken();
  };


  return {
    user,
    signIn,
    signOut,
  };
};

export default useAuth;