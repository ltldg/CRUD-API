

import { v4 as uuidv4 } from 'uuid';
import { User } from '../util';

export const users: User[] = [];







export const getAll = () => {
    return users;
  };
  
  export const getId = (id: string) => {
    return users.find((p) => p.id === id);
  };