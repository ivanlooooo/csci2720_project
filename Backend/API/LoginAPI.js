const mongoose = require("mongoose");
const UserInfo = require('../Schema/UserInfo.js');
const bcrypt = require("bcrypt");

LoginAPI = {
    verify:(name, pw) => new Promise (async(res,rej)=>{
        UserInfo.find({
            username: name
        })
        .exec(async(err,e)=>{
            if (err)
                    rej(err)
                else if (e.length === 0)
                    rej("User is not founded");
                else{
                    for (let ele of e) {
                        let hashed = await bcrypt.hash(pw, ele.salt); //salt=seed
                        if (hashed === ele.password) { // rej if wrong
                            res(ele._id);
                        } else {
                            rej("user credential is not matched");
                        }
                    }
                }
        })
    }),
    checkRole: (userId)  => new Promise((res, rej) => {
        UserInfo.findOne({
            _id: mongoose.Types.ObjectId(String(usrId))
        }).exec((err, e) => {
            if (err) {
                rej(err);
            } else if (e === null)
                rej("Error in \"checkr\" in checkRole() function");
            else
                res( e.urole === "admin" ? "admin": "user");
        });
    })
}

module.exports = LoginAPI;