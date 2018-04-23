var express = require('express');
var socket = require('socket.io')

const port = 4000;

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

    // Handle chat event
    socket.on('command', function(data) {
        console.log('server received command: ' + data.command + ' from userID: ' + data.userID);
        io.sockets.emit('command', data);
    });

    // // Handle typing event
    // socket.on('typing', function(data) {
    //     socket.broadcast.emit('typing', data);
    // })
});