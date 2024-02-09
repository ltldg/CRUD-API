









const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);
    const method = req.method;

    if (method === 'POST' && parsedUrl.pathname === '/api/users') {
        createUser(req, res);
    } else if (method === 'GET' && parsedUrl.pathname === '/api/users') {
        getAllUsers(req, res);
    } else if (method === 'GET' && parsedUrl.pathname === '/api/users') {
        getUserByID(req, res);
    } else if (method === 'PUT' && parsedUrl.pathname.startsWith('/api/users')) {
        updateUser(req, res);
    } else if (method === 'DELETE' && parsedUrl.pathname.startsWith('/api/users')) {
        deleteUser(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});