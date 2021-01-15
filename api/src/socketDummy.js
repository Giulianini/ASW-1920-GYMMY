const io = require('socket.io-client')

const socket = io('ws://localhost:8080')

socket.on('event', (msg) => {
    console.log('Received event from server ' + msg)
})

socket.emit('event', 42)
