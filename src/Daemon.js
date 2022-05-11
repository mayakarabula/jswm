const app = require('express')()
const cors = require('cors')

var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))

app.get('/', function (req, res) {
  res.send('Hello World')
})

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection', client => {
  client.on('event', data => {
    console.log('event', JSON.stringify(data))
  });
  
  client.on('disconnect', () => { 

  });
});

server.listen(8888);

