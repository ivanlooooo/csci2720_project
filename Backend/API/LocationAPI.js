const fetch = require("node-fetch-commonjs");
const mongoose = require("mongoose");

const Comment = require('../Schema/comment');
const Location = require('../Schema/Location');
const UserInfo = require('../Schema/UserInfo');

Locations = {
    create: async(id,newName, newLongitude, newLatitude) =>new Promise((res, rej) => {
            Event.findOne({eventId: id})
            .exec((err,e)=>{
              if(err) {
                rej(err); 
              } 
              else if (!(e===null)) rej("Id exist");
              else{
                e.name= newName;
                e.longitude =newLongitude;
                e.latitude = newLatitude;
                e.locId = id;
                e.save().then(()=> res(e.eventId));
              }
            })
          }),

    get: async(id) =>new Promise((res, rej) => {
        Location.findOne({locId: id})
        .exec((err, e) => {
            if (err)
            res.status(404).send("Error:" + err);
            else if (e === null)
            res.status(404).send(`{"error":"cannot find location}`)
            else{
            const loc={}
            loc.name = e.name
            loc.longitude = e.longitude 
            loc.latitude= e.atitude
            loc.locId  = e.latitude
            res.send(loc);
            return;
            };
        })
    }),
    getAll: ()=> new Promise((res, rej) => {
        Location.find()
        .exec((err,e)=>{
            const locList = [];
            if (err) {
                rej(err);
                return;
            }
            else if (e === null){
                rej("No location found")
                return
            }
            else{
                console.log(e)
                for (let ele of e){
                    const loc = {};
                    loc.name = ele.name
                    loc.longitude = ele.longitude 
                    loc.latitude= ele.atitude
                    loc.locId  = ele.latitude
                    locList.push(loc)
                }
            }
            res(locList);
            return;
        });
    }),
    getFavourite: async(userId) =>new Promise((res, rej) => {
        UserInfo.findOne({ _id: mongoose.Types.ObjectId(String(usrId)) })
        .populate('favourite')
        .exec((error, e) => {
            if (err) {
                rej(err);
                return;
            }
            else if (e === null){
                rej("User ID not found")
                return
            }
            else {
                if(e.favourite !== null){
                    const favId = user.favourite.Location;
                    Location.find({_id:{$in : favId} })
                    .exec((err, e) => {
                        const locList=[]
                        if (err) {
                            rej(err);
                            return;
                        }
                        else {
                            for (let ele in e){
                                const loc={}
                                loc._id = ele._id
                                loc.name = ele.name
                                loc.longitude = ele.longitude
                                loc.latitude = ele.latitude
                                loc.locId = ele.locId
                                locList.push(loc)
                            }
                        }
                        res(locList);
                        return;
                    })
                }else {
                    rej("You dun have favourite place");
                    return;
                }
            }
        })
    }),
    update: async(id,newName, newLongitude, newLatitude) =>new Promise((res, rej) => {
        Location.findOne({locId:locationId})
        .exec((err,e)=>{
            if(err) {
              rej(err); 
            } 
            else if (e===null) rej("No existing Id: "+ id);
            else{
                e.name= newName;
                e.longitude =newLongitude;
                e.latitude = newLatitude;
                e.locId = id;
                e.save().then(()=> res(e.eventId));
            }
        })
    }),
    delete : (locationId) =>{
        let deletLocation = (locationId)=> new Promise((res, rej) => {
            Location.deleteOne({locId: mongoose.Types.ObjectId(String(locationId))})
            .remove()
            .exec((err, e) => {
            res.contentType('text/plain');
            if (err) res.status(404).send("Error: "+err);
            else if (e.deletedCount === 0) res.status(404).send("Event "+req.params['eventId']+ " NOT EXIST" )
            else res.status(204).send();
            })
        })
        let deletComment = (locationId)=> new Promise((res, rej) => {
            Comment.deleteMany({locId: mongoose.Types.ObjectId(String(locationId))})
            .exec((err, e) => {
            res.contentType('text/plain');
            if (err) res.status(404).send("Error: "+err);
            else if (e.deletedCount === 0) res.status(404).send("Event "+req.params['eventId']+ " NOT EXIST" )
            else res.status(204).send();
            })
        })
        return deletLocation(locationId)
        .then (()=> deletComment(locationId))
        .catch(err => res.send(err));
    }
}

module.exports = Locations;