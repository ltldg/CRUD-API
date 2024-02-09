import {v4 as uuid4,validate as uuidValidate} from 'uuid';
import { createUserModel, db, getAll, getId, updateUserModel } from '../model/model';
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
export function createUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const user = JSON.parse(body);
        if (!user.username || !user.age || !user.hobbies) {
            res.statusCode = 400;
            res.end('Missing required fields');
            return;
        }
        const newUser = createUserModel(user);

        res.statusCode = 201;
        res.end(JSON.stringify(newUser));
    });
}

export function updateUser(req, res) {
    const id: string = req.url.split('/')[3];
    if (!uuidValidate(id)) {
        res.statusCode = 400;
        res.end('Invalid user ID');
        return;
    }
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const userUpdates: Partial<User> = JSON.parse(body);
        const existingUser = getId(id);
        if (!existingUser) {
            res.statusCode = 404;
            res.end('User not found');
            return;
        }
        const updatedUser = updateUserModel(existingUser, userUpdates);
        res.statusCode = 200;
        res.end(JSON.stringify(updatedUser));
    });
}


