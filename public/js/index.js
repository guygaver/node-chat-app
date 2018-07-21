let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    
    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey this is Guy'
    });

    socket.emit('createMessage', {
        from: 'guy@example.com',
        text: 'Hey this is Guy'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log(message);
});