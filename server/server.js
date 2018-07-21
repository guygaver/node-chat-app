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
   
   socket.emit('newEmail', {
       from: 'mike@example.com',
       test: 'hey whats going on',
       creator: 123
   });
   
   socket.on('createEmail', (newEmail) => {
       console.log('createEmail', newEmail);
   });

    socket.on('createMessage', (message) => {
        console.log(message);
        
        io.emit('newMessage', {
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