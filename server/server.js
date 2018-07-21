const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;

const app = express();
let server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected');

    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined the chat app'));
   
   socket.on('createEmail', (newEmail) => {
       console.log('createEmail', newEmail);
   });

    socket.on('createMessage', (message) => {
        console.log(message);
        
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});