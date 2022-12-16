const mongoose = require("mongoose");
const UserInfo = require('../Schema/UserInfo.js');
const bcrypt = require("bcrypt");

LoginAPI = {
    verify:(name, pw) => new Promise (async(res,rej)=>{
        console.log("work")
        UserInfo.findOne({
            Username: name
        })
        .exec(async(err,e)=>{
            if (err){
                rej(err)
                return
            }
            else if (e === null){
                rej("User name not found");
                return
            }
            else{
                result={}
                let hashed = await bcrypt.hash(pw, e.salt);
                console.log(hashed)
                console.log(e.Password) 
                if (hashed === e.Password) { 
                    console.log(e.role)
                    result.login = true
                    result.role =e.role
                } else {
                    result=false
                    rej("Plz ensure your username and password are correct");
                }
            }
            res(result)
        })
    })
}

module.exports = LoginAPI;