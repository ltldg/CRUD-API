

import { v4 as uuidv4 } from 'uuid';
import { User } from '../util';


export let db:User = {
    id: uuidv4(),
    username: '',
    age: 0,
    hobbies: []
};







export const getAll = () => {
    return db;
  };
  
  export const getId = (id: string) => {
    return db[id];
  };  


export const createUserModel = (user: User) => {
    const id = uuidv4();
    const newUser: User = { id, ...user };
    db[id] = newUser;
    return newUser;

}
export const updateUserModel = (id: string, updatedUser: Partial<User>) => {
    db[id] = { ...db[id], ...updatedUser };
    return db[id];
}