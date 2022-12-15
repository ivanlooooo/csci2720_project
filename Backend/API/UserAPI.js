const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Comment = require('../Schema/comment');
const Location = require('../Schema/Location');
const UserInfo = require('../Schema/UserInfo');
const Favourite  = require('../Schema/Favourite');

Users = {
    creat: async (newUsername,newPassword,favouritLoc) =>{
        let verifyUser = (newUsername,newPassword) =>  new Promise(async(res, rej) => {
                if(newUsername === "" || newUsername=== null || newPassword === "" || newPassword=== null){
                    rej("User name or password cannot be empty");
                    return;
                }
                UserInfo.find({
                    Username:newUsername
                })
                .exec((err, e) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    else if (e.length > 0)  {
                        rej("User name used by other.");
                        return;
                    }
                    else if (e.length === 0) {
                        res([])
                        return;
                    }
                })
        });
        let hashPassword = (newUsername,newPassword) => Promise(async(res, rej) => {
            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(newCredential.password, salt)
            const result = {};
            result.salt = salt;
            result.hash_password = hash_password;
            res(result);
        });
        let createFav = (result,favouriteLoc) => new Promise(async(res, rej) => {
            Favourite.create({
                locations: favouriteLoc.Comment,
            }, (err, e) => {
                if(err) {
                    rej(err);
                    return;
                }
                else if( e!== null) {
                    result._id =e._id;
                    return;
                }
                else {
                    res(result);
                    return;
                }
            })
        })
        let CreateUser= (newUsername,result)=> new Promise(async(res, rej) => {
            UserInfo.create({
                Username: newUsername,
                salt: result.salt,
                Password : result.hash_password,
                role: "User",
                Favourite : result._id
            }), (err, e) => {
                if(err) {
                    rej(err)
                    return;
                }
                else {
                    res("User account add sucessfully");
                    return;
                }
                }
        });
        return verifyUser(newUsername,newPassword).then(
            async()=>{
                return await hashPassword(newUsername,newPassword)
                    .then(result=> createFav(result,favouritLoc))
                    .then(result=> CreateUser(newUsername,result))
            }
        )
    },

    //Generate All user list
    read: async() =>{
        UserInfo.findOne({_id: mongoose.Types.ObjectId(String(usrId))})
        .exec(async(error, result) => {
            if (error){
                rej(error)
                return;
            }
            else if (result === null){
                rej("User Id not found")
            }
        })
    },

    readAll : async =>{
        UserInfo.find()
        .exec(async(error, results) => {
            const userList=[]
            if(error){
                rej(err);
                return;
            }else if (results.length >0){
                for (let ele in results){
                    const user={};
                    user._id = String(result._id);
                    user.Username = ele.Username;
                    user.Password = ele.Password;
                    user.role = ele.role
                    userList.push(user);
                }
            }
            res(userList);
        })
    },
    update : async =>{

    },
    delete : async =>{

    }
}

module.exports = Users;