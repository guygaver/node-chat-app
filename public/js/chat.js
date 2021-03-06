let socket = io();

function scrollToBottom() {
    // selectors
    let $messages = jQuery('#messages');
    let $newMessage = jQuery($messages.children('li:last-child'));
    

    // heights
    let clientHeight = $messages.prop('clientHeight');
    let scrollTop = $messages.prop('scrollTop');
    let scrollHeight = $messages.prop('scrollHeight');
    let newMessageHeight = $newMessage.innerHeight();
    let lastMessageHeight = $newMessage.prev().innerHeight();
    
    if ( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ) {
        $messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    let params = jQuery.deparam(window.location.search);
    
    socket.emit('join', params, function (err) {
        if ( err ) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    console.log(users);
    let $ol = jQuery('<ol></ol>');
    
    users.forEach(function (user) {
        $ol.append(jQuery('<li></li>').text(user));
    });
    
    jQuery('#users').html($ol);
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

    scrollToBottom();
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

    scrollToBottom();
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