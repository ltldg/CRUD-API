import {v4 as uuid4,validate as uuidValidate} from 'uuid';
import { getAll, getId } from '../model/model';
import { User } from '../util';




export const validateUuid = (id: string): boolean => {
  return uuidValidate(id);
}



export const contType = { 'Content-Type': 'application/json' };


export function getAllUsers(req, res) {
    const users = getAll();
    res.statusCode = 200;
    res.end(JSON.stringify(users));
}
export function getUserByID(req, res) {
    const id: string = req.url.split('/')[3];
    const user = getId(id);
    if (!uuidValidate(id)) {
        res.statusCode = 400;
        res.end('Invalid user ID');
        return;
    }
    if (!user) {
        res.statusCode = 404;
        res.end('User not found');
        return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify(user));
}


