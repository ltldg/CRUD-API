import { createUser, getAllUsers, getUserByID, updateUser, deleteUser } from "./controller/controller";
import * as http from 'http';

const validPath = "/api/users" || "/api/users/";


const server = http.createServer((req, res) => {
    const parsedUrl = req.url;
    const method = req.method;
    const id = req.url.split('/')[3];
    if (method === "POST" && parsedUrl.match(/^\/api\/users(\/)?$/)) {
      createUser(req, res);
    } else if (method === "GET" && parsedUrl.match(/^\/api\/users(\/)?$/)) {
      getAllUsers(req, res);
    } else if (method === "GET" && parsedUrl == `/api/users/${id}`) {
      getUserByID(req, res);
    } else if (method === "PUT" && parsedUrl.match(/^\/api\/users(\/)?$/)) {
      updateUser(req, res);
    } else if (method === "DELETE" && parsedUrl.includes("/api/users/")) {
      deleteUser(req, res);
    } else {
      res.statusCode = 404;
      res.end("Not found");
    }
        console.log(parsedUrl);
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');

}   )