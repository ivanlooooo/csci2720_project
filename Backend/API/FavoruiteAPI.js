const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Location = require('./Schema/Location');
const UserInfo = require('./Schema/UserInfo');

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
            .findOne({_id: mongoose.Types.ObjectId(String(usrId)) })
            .pop
        })  

        return checkLocation(locationId)
            .then(()=>findFavourite(userId))
            .then((result => updateFav(result,locationId)))
    }
}
module.exports = FavouriteAPI;