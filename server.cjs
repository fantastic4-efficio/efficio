const client = require('./db/client.cjs');
client.connect();
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
// Serve static files from public/
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const apiRouter = require('./api/index.cjs');
const { createServer } = require('node:http');
const { Server } = require('socket.io');


app.use(cors({
  origin: ["https://efficio-kftq.onrender.com", "http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true
}));


app.use(express.json());
app.use(express.static('dist'));


const server = createServer(app);


const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: ["http://localhost:3000", "https://efficio-kftq.onrender.com"],
    methods: ["GET", "POST", "DELETE", "PATCH"]
  }
});


app.use('/api', apiRouter);



app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});


io.on('connection', (socket) => {
  console.log('a user connected');
  
  const token = socket.handshake.auth.token;
  if (!token) {
    return socket.disconnect(true);
  }
 console.log("user connected with token", token);

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