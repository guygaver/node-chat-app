let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();

    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    let $messageCheckBox = jQuery('input[name=message]');
    socket.emit('createMessage', {
        from: 'User',
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
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });

        $locationButton.removeAttr('disabled').text('Send Location');
    }, () => {
        alert("Unable to fetch location");
        $locationButton.removeAttr('disabled').text('Send Location');
    });
});