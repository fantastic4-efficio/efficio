const client = require('./db/client.cjs');
client.connect();

const express = require('express');
const app = express();
app.use(express.json()); 
app.use(express.static('dist'));
require('dotenv').config();


app.use('/api', require('./api/index.cjs'));


app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});