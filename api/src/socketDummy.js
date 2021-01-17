const io = require('socket.io-client')

const socket = io('ws://localhost:8080/?username=lrizzato')

socket.on('welcome', (msg) => {
    console.log(msg)
})

socket.on('badUser', (msg) => {
    console.log(msg)
})

socket.on('capacities', (msg) => {
    console.log(msg)
})

socket.on('disconnect', () => {
    console.log('connection closed')
})

