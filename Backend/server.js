const express = require('express');
const app = express();
var mongoose = require('mongoose');
//mongoose.connect('');
//const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

const cors = require('cors'); 
app.use(cors());

const server = app.listen(3000);