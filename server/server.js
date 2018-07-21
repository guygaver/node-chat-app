const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;

const app = express();
let server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected');

    socket.emit('newMessage', {
        from: 'admin',
        text: 'Welcome to the chat ',
        created_at: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user joined the chat',
        created_at: new Date().getTime()
    });
   
   socket.on('createEmail', (newEmail) => {
       console.log('createEmail', newEmail);
   });

    socket.on('createMessage', (message) => {
        console.log(message);
        
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            created_at: new Date().getTime()
        });
    });

    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});