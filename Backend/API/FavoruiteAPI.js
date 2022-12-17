const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Location = require('../Schema/Location');
const UserInfo = require('../Schema/UserInfo');
const Favourite  = require('../Schema/Favourite');

FavouriteAPI={
    create:(userId,locationId)=>{
        let checkLocation =(locationId) => new Promise((res, rej) => {
            Location.get(locationId)
            .then(e=>{
                if (typeof e === "string") {
                    rej("Please ensure the location format is correct");
                    return;
                } else {
                    res();
                    return;
                }
            });
        })

        let findFavourite = (userId)  => new Promise((res, rej) => {
            UserInfo
            .findOne({Username: userId})
            .populate('favourite')
            .exec((err, e) => {
                if (err) {
                    rej(err.message);
                    return;
                } else if (e === null)
                    rej("No user ID found");
                else{
                    if('favourite' in e && e.favourite !== undefined){
                        res(e.favourite._id);
                        return;
                    }
                }
            })
        })  
        let updateFav = (favourite_id, locationId)=>{
            Favourite
            .findOne({ _id: mongoose.Types.ObjectId(String(favourite_id))})
            .exec((err, e) => {
                if (err) {
                    rej(err.message);
                    return;
                } else if (e === null)
                    rej("Cannot find favoruite id");
                else{
                    e.locationId.addToSet(new mongoose.Types.ObjectId(locationId));
                    e.save().then(result => console.log("Save Favourite location"));
                    res(e);
                    return;
                }
            })
        }

        return checkLocation(locationId)
            .then(()=>findFavourite(userId))
            .then((result => updateFav(result,locationId)))
    },
    read: async(newuserName) =>new Promise((res, rej) => {
        Favourite.findOne({userName: newuserName})
        .populate('Location')
        .exec((err, e) => {
            if (err)
            rej("Error:" + err);
            else if (e === null)
            rej(`{"error":"cannot find location}`)
            else{
                console.log(e)
            const results = [];
            e.map(ele => {
                loc.name = ele.Location.name;
                loc.longitude = ele.Location.longitude; 
                loc.latitude= ele.Location.latitude;
                loc.locId  = ele.Location.locId;
            });
            res(results);
            console.log(results)
            return;
            };
        })
    }),
    deletFav : (userId, locationId) =>{
        let checkLocation =(locationId) => new Promise((res, rej) => {
            Location.get(locationId)
            .then(e=>{
                if (typeof e === "string") {
                    rej("Please ensure the location format is correct");
                    return;
                } else {
                    res();
                    return;
                }
            });
        })

        let findFavourite = (userId)  => new Promise((res, rej) => {
            UserInfo
            .findOne({_id: mongoose.Types.ObjectId(String(usrId)) })
            .populate('favourite')
            .exec((err, e) => {
                if (err) {
                    rej(err.message);
                    return;
                } else if (e === null)
                    rej("No user ID found");
                else{
                    if('favourite' in e && e.favourite !== undefined){
                        res(e.favourite._id);
                        return;
                    }
                }
            })
        })  
        let updateFav = (favourite_id, locationId)=>{
            Favourite
            .findOne({ _id: mongoose.Types.ObjectId(String(favourite_id))})
            .exec((err, e) => {
                if (err) {
                    rej(err.message);
                    return;
                } else if (e === null)
                    rej("Cannot find favoruite id");
                else{
                    e.locationId.pull(new mongoose.Types.ObjectId(locationId));
                    e.save().then(result => console.log("Delete Favourite location"));
                    res(e);
                    return;
                }
            })
        }
        return checkLocation(locationId)
            .then(()=>findFavourite(userId))
            .then((result)=> updateFav(result,locationId))
    }
}
module.exports = FavouriteAPI;
