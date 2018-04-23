var express = require('express');
var socket = require('socket.io')

//const port = 4000;
const port = ( process.env.PORT || 5000 )
//app.set( 'port', ( process.env.PORT || 5000 ));

// App setup
var app = express();
var server = app.listen(port, function() {
    console.log('listening for requests on port ' + port);
})

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);

    // Handle command event--send it back out to everyone with userID
    socket.on('command', function(data) {
        console.log('server received command: ' + data.command + ' from userID: ' + data.userID);
        io.sockets.emit('command', data);
    });

    // Handle machine status event--broadcast it back out to everyone with userID
    socket.on('status', function(data) {
        console.log('server received machine status event: ' + data.status + ' from userID: ' + data.userID);
        io.sockets.broadcast.emit('status', data);
    });

    // // Handle typing event
    // socket.on('typing', function(data) {
    //     socket.broadcast.emit('typing', data);
    // })
});