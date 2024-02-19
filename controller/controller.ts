import {v4 as uuid4,validate as uuidValidate} from "uuid";
import { createUserModel, db, deleteUserModel, getAll, getId, updateUserModel } from "../model/model";
import { User } from "../util";




export const validateUuid = (id: string): boolean => {
  return uuidValidate(id);
}



export const contType = { "Content-Type": "application/json" };


export async function getAllUsers(req, res) {
    const users = await getAll();
    res.writeHead(200, contType);
    res.end(JSON.stringify(users));
}
export function getUserByID(req, res) {
    const id: string = req.url.split("/")[3];
    const user = getId(id);
    if (!uuidValidate(id)) {
        res.writeHead(400, contType);
        res.write(JSON.stringify({message: 'Invalid user ID'}));
        res.end();
        return;
    }
    if (!user) {
        res.writeHead(404, contType);
        res.write(JSON.stringify({message: 'User not found'}));
        res.end();
        return;
    }
    res.writeHead(200, contType);
    res.end(JSON.stringify(user));
}
export function createUser(req, res) {
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", () => {
        const user = JSON.parse(body);
        if (!user.username || !user.age || !user.hobbies) {
            res.writeHead(400, contType);
            res.write(JSON.stringify({message: 'Missing required fields'}));
            res.end();
            return;
        }
        let newUser = createUserModel(user);

        res.writeHead(201, contType);
        res.end(JSON.stringify(newUser));
    });
}

export function updateUser(req, res) {
    const id: string = req.url.split("/")[3];

    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", () => {
        const userUpdates: Partial<User> = JSON.parse(body);
        const existingUser = getId(id);
        if (!uuidValidate(id)) {
            res.writeHead(400, contType);
            res.write(JSON.stringify({message: 'Invalid user ID'}));
            res.end();
            return;
        }
        if (!existingUser) {
            res.writeHead(404, contType);
            res.write(JSON.stringify({message: 'User not found'}));
            res.end();
            return;
        }
        const updatedUser = updateUserModel(id, userUpdates);
        res.writeHead(200, contType);
        res.end(JSON.stringify(updatedUser));
    });
}

export function deleteUser(req, res) {
    const id: string = req.url.split("/")[3];
    if (!uuidValidate(id)) {
        res.writeHead(400, contType);
        res.write(JSON.stringify({message: 'Invalid user ID'}));
        res.end();
        return;
    }
    const existingUser = getId(id);
    if (!existingUser) {
        res.writeHead(404, contType);
        res.write(JSON.stringify({message: 'User not found'}));
        res.end();
        return;
    }
    deleteUserModel(id);
    res.writeHead(204, contType);
    res.end();
}
