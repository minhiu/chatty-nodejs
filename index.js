const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/asian', (req, res) => {
    res.sendFile(__dirname + "/public/asian.html");
});

app.get('/white', (req, res) => {
    res.sendFile(__dirname + "/public/white.html");
});

app.get('/black', (req, res) => {
    res.sendFile(__dirname + "/public/black.html");
});

// Tech Namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => { 
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
    });

    socket.on('message', (data) => {
        console.log('Message: ' + data.msg);
        tech.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected!');
        tech.emit('message', 'User disconnected!');
    });
});