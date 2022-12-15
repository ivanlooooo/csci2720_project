require("./userDetail")

const express = require('express');
const app = express();
var mongoose = require('mongoose');
const mongoUrl ='mongodb+srv://stu176:p546441W@cluster0.gbo7pn3.mongodb.net/stu176'
mongoose.connect(mongoUrl, {useNewUrlParser: true,})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

const cors = require('cors'); 
app.use(cors());

const bodyParser = require('body-parser');
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

db.once('open',  () =>{
    console.log("Connection is open...");

    const User = mongoose.model('UserInfo');

    app.get('/', (req, res) => {

    })
})


app.listen(8080,()=>{
    console.log("Server started")
})