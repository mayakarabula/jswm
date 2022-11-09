const app = require('express')()
const { execSync } = require('child_process')
const cors = require('cors')
const { readFileSync } = require('fs')

var corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/system', function (req, res) {
  try {
    const sys = readFileSync('system.json').toString()

    res.json(JSON.parse(sys))
  } catch (err) {
    res.json({})
  }
})

app.get('/weather', function (req, res) {
  try {
    const weather = readFileSync('weather').toString()

    res.send(weather)
  } catch (err) {
    res.send('')
  }
})

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:1234',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (client) => {
  client.on('event', (data) => {
    const [space, command] = data

    io.emit(space, command)
  })

  client.on('disconnect', () => {})
})

server.listen(8888)
