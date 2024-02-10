import { createUser, getAllUsers, getUserByID, updateUser, deleteUser } from "./controller/controller";
import * as http from 'http';




const server = http.createServer((req, res) => {
    const parsedUrl = req.url;
    const method = req.method;

    if (method === 'POST' && parsedUrl.includes('/api/users')) {
        createUser(req, res);
    } else if (method === 'GET' && parsedUrl.includes('/api/users')) {
        getAllUsers(req, res);
    } else if (method === 'GET' && parsedUrl.includes('/api/users')) {
        getUserByID(req, res);
    } else if (method === 'PUT' && parsedUrl.includes('/api/users')) {
        updateUser(req, res);
    } else if (method === 'DELETE' && parsedUrl.includes('/api/users')) {
        deleteUser(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
}   )