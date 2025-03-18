const client = require('./db/client.cjs');
client.connect();

const express = require('express');
const app = express();
const apiRouter = require('./api/index.cjs');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { error } = require('node:console');

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this if your frontend runs on a different port
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  path: '/socket.io'
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
