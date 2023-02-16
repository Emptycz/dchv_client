import { IPerson } from '../types';

export const isAdmin = (user: IPerson) =>
  user.roles?.some((x) => x.name.toLowerCase() === 'admin');