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
   
   socket.on('disconnect', () => {
       console.log('Client disconnected');
   });
});

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});