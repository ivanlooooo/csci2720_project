const express = require('express');
const app = express();

const bodyPaser = require('body-parser');
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser("csci2720"));

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
app.use(cors(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
})));

const Login = require('./VerifyLogin.js')

db.once('open',  () =>{
    console.log("Connection is open...");

    const User = mongoose.model('UserInfo');

    app.post('/login', async(req, res) => {
      let { username, password } = req.body;
      try{
        let userId = await Login.verify(username, password)
          if(userId)
          res.cookie('userId',userId, {
            httpOnly: true,
            signed: true,
            maxAge: 10 * 60 * 1000
          }).send({ login: "true" });
      }catch (e) {
        console.log("err: " + e)
        res.send({ error: e })
      }
    })

    app.post("/checkRole", async(req, res) => {
      let usrId = req.signedCookies.usrId;
      try {
          let usrRole = await Login.checkRole(usrId);
          if (usrRole)
              res.cookie('usrId', usrId, {
                  httpOnly: true,
                  signed: true,
                  maxAge: 10 * 60 * 1000
              }).send({ role: usrRole })
      } catch (e) {
          console.log("err: " + e)
          res.send({ error: e })
      }
  })
  app.post("/userComments", async(req, res) => {
    let usrId = req.signedCookies.usrId;
    let { locationId, option, newComments } = req.body;

    try {
        switch (option) {
            case "create":
                console.log(locationId, option, newComments)
                if (await Users.createComments(usrId, locationId, newComments)) res.send({ result: "success" });
                break;
            case "read":
                res.send(await Users.getComments(locationId));
                break;
            default:
                res.status(404).send([])
        }
    } catch (e) {
        console.log("error: " + e)
        res.status(404).send({ error: e })
    }

})

})


app.listen(8080,()=>{
    console.log("Server started")
})