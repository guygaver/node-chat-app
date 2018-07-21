let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let li = jQuery('<li></li>');
    let a = jQuery("<a target='_blank'>My current location</a>");
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    let $messageCheckBox = jQuery('input[name=message]');
    socket.emit('createMessage', {
        from: 'anonymous',
        text: $messageCheckBox.val()
    }, function () {
        $messageCheckBox.val('')
    })
});

let $locationButton = jQuery('#send-location');

$locationButton.on('click', (e) => {
    
    if ( !"geolocation" in navigator ) {
        return alert('Geolocation not supported by your browser');
    }

    $locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            from: 'User',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });

        $locationButton.removeAttr('disabled').text('Send Location');
    }, () => {
        alert("Unable to fetch location");
        $locationButton.removeAttr('disabled').text('Send Location');
    });
});