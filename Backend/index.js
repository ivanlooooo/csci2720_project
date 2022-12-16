const express = require('express');
const app = express();

const bodyPaser = require('body-parser');
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser("csci2720"));

var mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://stu176:p546441W@cluster0.gbo7pn3.mongodb.net/stu176'
mongoose.connect(mongoUrl, { useNewUrlParser: true, })
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


const Events = require('./API/Event.js')

db.once('open', () => {
  console.log("Connection is open...");

  const User = mongoose.model('UserInfo');

  //Verify username and password
  app.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
      let usrId = await LoginAPI.verify(username, password)
      if (usrId)
        res.cookie('usrId', usrId, {
          httpOnly: true,
          signed: true,
          maxAge: 10 * 60 * 1000
        }).send(usrId);
    } catch (e) {
      console.log("err: " + e)
      res.send({ error: e })
    }
  })

  //Option: Create / Read usercomments
  app.post("/userComments", async (req, res) => {
    let usrId = req.signedCookies.usrId;
    let { locationId, option, newComments } = req.body;
    try {
      console.log("connect")
      let result = await LoginAPI.verify(username, password)
      console.log(result)
      if (result)
        res.send(result);
    } catch (e) {
      console.log("err: " + e)
      res.send({ error: e })
    }
  })

  //Option: Create / Read user favourite
  app.post("/userFav", async (req, res) => {
    let usrId = req.signedCookies.usrId;
    let { locationId, option } = req.body;

    try {
      switch (option) {
        case "create":
          if (await FavouriteAPI.create(usrId, locationId)) res.send({ result: "success" });
          break;
        case "delete":
          if (await FavouriteAPI.delete(usrId, locationId)) res.send({ result: "success" });
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
  app.post("/userFav", async (req, res) => {
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
  app.post("/userManage", async (req, res) => {
    let { userId, option, newUsername, newPassword, role } = req.body;
    let cookieUsrId = req.signedCookies.usrId;
    try {
      switch (option) {
        case "create":
          if (await UsersAPI.create(newUsername, newPassword, role)) res.send({ result: "success" });
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
          if (await UsersAPI.update(userId, newUsername, newPassword)) res.send({ result: "success" }); //note check same, check invalid input
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
  app.post("/locationManage", async (req, res) => {
    let usrId = req.signedCookies.usrId;
    let { locationId, option, newName, newLongitude, newLatitude } = req.body;

    // rej error msg not object
    try {
      switch (option) {
        case "create":
          if (await LocationsAPI.create(locationId, newName, newLongitude, newLatitude))
            res.send({ result: "success" }); // note: return success or error? check big small letter?
          break;
        case "read":
          res.send(await LocationsAPI.get(locationId));
          break;
        case "readAll":
          res.send(await LocationsAPI.getAll());
          break;
        case "readFav":
          res.send(await LocationsAPI.getFavourite(usrId)); // return all data, weature, latitude longtitude
          break;
        case "update": // note keep pop up location name cannot be changed, cannot change to existing location
          if (await LocationsAPI.update(locationId, newName, newLongitude, newLatitude))
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

  // event api
  app.post("/getallevent", async (req, res) => {
    res.send(await Events.read_all());
  })

  app.post("/newevent", async (req, res) => {
    res.send(await Events.create());
  })

  app.post("/getevent", async (req, res) => {
    let eventId = req.body.eventId ? req.body.eventId : 145073
    res.send(await Events.read(eventId));
  })

  app.post("/updateevent", async (req, res) => {
    let { eventId, event_title, locationId, event_time, event_description, event_presenter, event_price } = req.body;
    if (!eventId) res.send("error: must require eventId")
    if (!typeof (locationId)) res.send("error: locationId has to be object array of loaction ids")

    new_info = {
      eventId: eventId,
      event_title: event_title,
      locationId: locationId,
      event_time: event_time,
      event_description: event_description,
      event_presenter: event_presenter,
      event_price: event_price
    }

    res.send(await Events.update(new_info));
  })

  app.post("/deleteevent", async (req, res) => {
    res.send(await Events.delete());
  })

})


app.listen(8080, () => {
  console.log("Server started")
})