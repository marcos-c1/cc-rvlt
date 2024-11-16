const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/plain/'})
        res.end('Hello, World!')
    } else if(req.url === '/auth'){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('User authenticated.')
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('Page not found.')
    }
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});