var apiURL = 'https://damp-sierra-42875.herokuapp.com/'

// Make connection
var socket = io.connect(apiURL);

// Query DOM
var command = document.getElementById('command');
var userID = document.getElementById('userID');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit event
btn.addEventListener('click', function() {
    console.log('button clicked');
    // console.log('  handle: ' + handle.value);
    console.log('  command: ' + command.value);

     socket.emit('command', {
          command: command.value,
          userID: userID.value
     });
});

// Listen for chat event from Socket
socket.on('command', function(data) {
    console.log('command received. Command: ' + data.command);
    output.innerHTML = '<p><strong>' + data.userID + ': </strong>' + data.command +'</p>';
    //output.innerHTML += '<p><strong>Command: </strong'> + data.command + '</p>';
    feedback.innerHTML = '';
});

// Listen for machine status event
socket.on('status', function(data) {
    // filter to see if same userID
    feedback.innerHTML = '<p><em>Machine status: ' + data.status + ' is typing...</em></p>';
});

// Listen for typing
// command.addEventListener('keypress', function() {
//     // Send a typing message, containing the handle of the typer
//     socket.emit('typing', userID.value);
// });