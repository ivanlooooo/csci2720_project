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
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const LoginAPI = require('./API/LoginAPI.js')
const CommentAPI = require('./API/CommentAPI.js')
const FavouriteAPI = require('./API/FavoruiteAPI.js')
const UsersAPI = require('./API/UserAPI.js')
const LocationsAPI = require('./API/LocationAPI.js')

db.once('open',  () =>{
  console.log("Connection is open...");

  const User = mongoose.model('UserInfo');

  //Verify username and password
  app.post('/login', async(req, res) => {
    let { username, password } = req.body;
      try{
        console.log("connect")
        let result = await LoginAPI.verify(username, password)
        console.log(result)
        if(result)
          res.send(result);
      }catch (e) {
        console.log("err: " + e)
        res.send({ error: e })
      }
    })

  //Option: Create / Read usercomments
  app.post("/userComments", async(req, res) => {
    let usrId = req.signedCookies.usrId;
    let { locationId, option, newComments } = req.body;
    try {
        switch (option) {
            case "create":
                if (await CommentAPI.create(usrId, locationId, newComments)) res.send({ result: "success" });
                break;
            case "read":
                res.send(await CommentAPI.read(locationId));
                break;
            default:
                res.status(404).send([])
        }
    } catch (e) {
        console.log("error: " + e)
        res.status(404).send({ error: e })
    }
  })

   //Option: Create / Read user favourite
  app.post("/userFav", async(req, res) => {
      let usrId = req.signedCookies.usrId;
      let { locationId, option } = req.body;

      try {
          switch (option) {
              case "create":
                  if (await FavouriteAPI.create(username, locationId)) res.send({ result: "success" });
                  break;
              case "delete":
                  if (await FavouriteAPI.delete(username, locationId)) res.send({ result: "success" });
                  break;
              default:
                  res.status(404).send([])
          }
      } catch (e) {
          console.log("error: " + e)
          res.status(404).send({ error: e })
      }
    })
    //admin CURD: user
      app.post("/userManage", async(req, res) => {
        let { userId, option, newUsername,newPassword,role} = req.body;
        let cookieUsrId = req.signedCookies.usrId;
        try {
          switch (option) {
              case "create":
                  if (await UsersAPI.create(newUsername,newPassword,role )) res.send({ result: "success" }); 
                  break;
              case "read":
                  res.send(await UsersAPI.read(userId)); 
                  break;
              case "readByCookie":
                  res.send(await UsersAPI.read(cookieUsrId));
                  break;
              case "readAll":
                  res.send(await UsersAPI.readAll()); // notes return roles too, check for no such id
                  break;
              case "update":
                  if (await UsersAPI.update(userId,  newUsername,newPassword )) res.send({ result: "success" }); //note check same, check invalid input
                  break;
              case "delete":
                  if (await UsersAPI.delete(userId)) res.send({ result: "success" }); //note cannot delete admin
                  break;
              default:
                  res.status(404).send([])
          }
      } catch (e) {
          console.log("error: " + e)
          res.status(404).send({ error: e })
      }

      })
        //admin CURD: locations
      app.post("/locationManage", async(req, res) => {
        let usrId = req.signedCookies.usrId;
        let { locationId, option, newName, newLongitude, newLatitude,userId} = req.body;

        // rej error msg not object
        try {
            switch (option) {
              case "create":
                if (await LocationsAPI.create(locationId,newName, newLongitude, newLatitude))
                  res.send({ result: "success" }); // note: return success or error? check big small letter?
                break;
              case "read":
                res.send(await LocationsAPI.get(locationId));
                break;
              case "readAll":
                res.send(await LocationsAPI.getAll());
                break;
              case "readFav":
                res.send(await LocationsAPI.getFavourite(userId)); // return all data, weature, latitude longtitude
                break;
              case "update": // note keep pop up location name cannot be changed, cannot change to existing location
                if (await LocationsAPI.update(locationId,newName, newLongitude, newLatitude))
                  res.send({ result: "success" }); // note: return success or error?
                break;
              case "delete":
                if (await LocationsAPI.delete(locationId))
                  res.send({ result: "success" }); // note: return success or error?
                break;
              default:
                res.status(404).send([]);
            }
        } catch (e) {
            console.log("error: " + e)
            res.status(404).send({ error: e })
        }
    })

    app.post("/clearCookie", (req, res) => {
        res.clearCookie('usrId').end();
    })

})


app.listen(8080,()=>{
    console.log("Server started")
})