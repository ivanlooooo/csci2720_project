const fetch = require("node-fetch-commonjs");
const mongoose = require("mongoose");

const Comment = require('../Schema/comment');
const Location = require('../Schema/Location');
const UserInfo = require('../Schema/UserInfo');

Locations = {
    create: async(id,newName, newLongitude, newLatitude) =>new Promise((res, rej) => {
            Location.findOne({locId: id})
            .exec((err,e)=>{
              if(err) {
                rej(err); 
              } 
              else 
              if (e !== null) rej("Id exist");
              else{
                Location.create({
                    name: newName,
                    longitude: newLongitude,
                    latitude: newLatitude,
                    locId : id
                  },(err, e) => {
                    if (err)
                      rej(err)
                    else 
                      res(e)
                  })
              }
            })
          }),

    get:  async(id) =>new Promise((res, rej) => {
        Location.findOne({locId: id})
        .exec((err, e) => {
            if (err)
            res("Error:" + err);
            else if (e === null)
            res(`{"error":"cannot find location}`)
            else{
            const loc={};
            loc.name = e.name;
            loc.longitude = e.longitude; 
            loc.latitude= e.latitude;
            loc.locId  = e.locId;
            res(loc);
            return;
            };
        })
    }),
    getAll: ()=> new Promise((res, rej) => {
        console.log("testing")
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
                for (let ele of e){
                    const loc = {};
                    loc.name = ele.name
                    loc.longitude = ele.longitude 
                    loc.latitude= ele.latitude
                    loc.locId  = ele.locId
                    locList.push(loc)
                }
            }
            let result={}
            result.locList = locList
            res(result);
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
        Location.findOne({locId:id})
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
                e.save().then(()=> res(e.locId));
            }
        })
    }),
    delete: async(locationId) =>new Promise((res, rej) => {
       Location.deleteOne({locId: locationId})
        .exec((err, e) => {
            if(err){
                rej(err);
                return;
            }else {
                res(e);
                return;
            }
        });
    })
        /*
        let deletLocation = (locationId)=> new Promise((res, rej) => {
            Location.deleteOne({locId:locationId})
            .remove()
            .exec((err, e) => {
            if (err) rej(err)
            else if (e.deletedCount === 0) rej("Location NOT EXIST" )
            else res();
            return
            })
        })
        /*
        let deletComment = (locationId)=> new Promise((res, rej) => {
            Comment.deleteMany({locId: locationId})
            .exec((err, e) => {
            if (err) rej(err)
            else if (e.deletedCount === 0) rej("Comment of Location NOT EXIST" )
            else res();
            })
        })
        return deletLocation(locationId)
        //.then (()=> deletComment(locationId))
    }
    */
}

module.exports = Locations;