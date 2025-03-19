const client = require('./db/client.cjs');
client.connect();

const cors = require('cors');
const express = require('express');
const app = express();
const apiRouter = require('./api/index.cjs');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { error } = require('node:console');

app.use(cors({
  origin: ["https://efficio-kftq.onrender.com"],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json());
app.use(express.static('dist'));

const server = createServer(app);
const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: "https://efficio-kftq.onrender.com",
    methods: ["GET", "POST", "DELETE", "PATCH"]
  }
});



app.use(express.json()); 
app.use(express.static('dist'));
require('dotenv').config();
app.use('/api', apiRouter);
app.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
})

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('newMessage', (newMessage) => {
    io.emit('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
