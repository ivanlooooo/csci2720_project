const mongoose = require("mongoose");
const UserInfo = require('../Schema/UserInfo');
const bcrypt = require("bcrypt");

LoginAPI = {
    verify:(name, pw) => new Promise (async(res,rej)=>{
        UserInfo.find({
            Username: name
        })
        .exec(async(err,e)=>{
            console.log(name)
            if (err)
                    rej(err)
                else if (e.length === 0)
                    rej("User name not found");
                else{
                    for (let ele of e) {
                        let hashed = await bcrypt.hash(pw, ele.salt); 
                        if (hashed === ele.Password) { // rej if wrong
                            res(ele._id);
                        } else {
                            rej("Plz ensure your username and password are correct");
                        }
                    }
                }
        })
    }),
    checkRole: (name)  => new Promise((res, rej) => {
        UserInfo.findOne({
            Username: name
        }).exec((err, e) => {
            if (err) {
                rej(err);
            } else if (e === null)
                rej("Error in checking role");
            else
                res( e.role === "admin" ? "admin": "user");
        });
    })
}

module.exports = LoginAPI;