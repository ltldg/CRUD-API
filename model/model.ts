import { v4 as uuidv4 } from "uuid";
import { User } from "../util";

export let db: User[] = [
  {
    id: uuidv4(),
    username: "",
    age: 0,
    hobbies: [],
  },
];

export const getAll = () => {
  return db;
};

export const getId = (id: string) => {
  return db.find((obj) => obj.id === id);
};

export const createUserModel = (user: User) => {
  const newUser: User = { id: uuidv4(), ...user };
  db.push(newUser);
  return newUser;
};
export const updateUserModel = (id: string, updatedUser: Partial<User>):User => {
  const finduser = getId(id);
  const upUser = Object.assign(finduser, updatedUser);

  return finduser;
};
export const deleteUserModel = (id: string) => {
  const userIndex = db.findIndex((user) => user.id === id);

  if(userIndex !== -1){
   db.splice(userIndex, 1);

  }else throw new Error
};
