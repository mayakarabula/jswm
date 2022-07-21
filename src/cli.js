const io = require("socket.io-client").io

const space = process.argv[2]
const command = process.argv[3]

const socket = io('http://localhost:8888');

const help = () => {
    console.log(`JSWM CLI

available commands:
    move left/right/up/down - move currently active window
    resize left/right/up/down - resize currently active window
    focus next/prev - change focus to other window
    `)
}

if (space === 'move') {
    if (['left', 'right', 'up', 'down'].indexOf(command) > -1) {
        socket.emit('event', ['move', command])
    } else help()
} else if (space === 'resize') {
    if (['left', 'right', 'up', 'down'].indexOf(command) > -1) {
        socket.emit('event', ['resize', command])
    } else help()
} else if (space === 'focus') {
    if (['next', 'prev'].indexOf(command) > -1) {
        socket.emit('event', ['focus', command])
    } else help()
} else {
    help()
}

setTimeout(() => socket.close(), 500)
