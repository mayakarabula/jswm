const io = require('socket.io-client').io
const readFileSync = require('fs').readFileSync
const resolve = require('path').resolve
const si = require('systeminformation')

const space = process.argv[2]
const command = process.argv[3]

const socket = io('http://localhost:8888')

const help = async () => {
  console.log(`JSWM CLI

available commands:
    move left/right/up/down - move currently active window
    resize left/right/up/down - resize currently active window
    focus next/prev - change focus to other window
    layer 0 1 2... - change active layer
    float true/false - sets active window to float mode or static mode
    titlebar true/false - sets active window topbar to visible or hidden
    kill - kills current window
    open FILE_PATH - open file with default applicaation
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
} else if (space === 'layer') {
  if (command.match(/\d/)) {
    socket.emit('event', ['layer', command])
  } else help()
} else if (space === 'float') {
  if (['true', 'false'].indexOf(command) > -1) {
    socket.emit('event', ['float', command])
  } else help()
} else if (space === 'titlebar') {
  if (['true', 'false'].indexOf(command) > -1) {
    socket.emit('event', ['titlebar', command])
  } else help()
} else if (space === 'kill') {
  socket.emit('event', ['kill'])
} else if (space === 'open') {
  const data = readFileSync(resolve(command)).toString('base64')
  socket.emit('event', ['open', data])
} else if (space === 'system') {
  const mem = si.mem()
  const battery = si.battery()
  const wifi = si.wifiNetworks()
  const bluetooth = si.bluetoothDevices()

  Promise.all([mem, battery, bluetooth]).then(([mem, battery]) => {
    const systemInfo = {
      mem,
      battery,
      bluetooth,
    }

    socket.emit('event', ['set_system_info', systemInfo])
  })
} else {
  help()
}

setTimeout(() => socket.close(), 500)
