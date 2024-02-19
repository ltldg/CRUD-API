import cluster from "cluster";
import { createUser, getAllUsers, getUserByID, updateUser, deleteUser, contType } from "./controller/controller";
import * as http from 'http';
import { User } from "./util"; // Replace "./path/to/user-module" with the actual path to the user module
import { db } from "./model/model";

const validPath = "/api/users" || "/api/users/";


export const server = http.createServer((req, res) => {
    const parsedUrl = req.url;
    const method = req.method;
    const id = req.url.split('/')[3];
    if (method === "POST" && parsedUrl.match(/^\/api\/users(\/)?$/)) {
      createUser(req, res);
    } else if (method === "GET" && parsedUrl.match(/^\/api\/users(\/)?$/)) {
      getAllUsers(req, res);
    } else if (method === "GET" && parsedUrl == `/api/users/${id}`) {
      getUserByID(req, res);
    } else if (method === "PUT" && parsedUrl == `/api/users/${id}`) {
      updateUser(req, res);
    } else if (method === "DELETE" && parsedUrl.includes("/api/users/")) {
      deleteUser(req, res);
    } else {
      res.writeHead(404, contType);
      res.end("Not found");
    }
        console.log(parsedUrl);
});
