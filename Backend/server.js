const express = require('express');
const app = express();
var mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());


app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

const server = app.listen(8080);