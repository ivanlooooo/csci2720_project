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
                favourite : result._id
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
            } else {
                const user={};
                user._id = String(result._id);
                user.name = result.password;
                user.role = result.role;
                res(user);
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
    update : async(userId,  newUsername,newPassword ) =>{
        if(newUsername === "" || newUsername=== null || newPassword === "" || newPassword=== null){
            rej("User name or password cannot be empty");
            return;
        }
        UserInfo.findOne({_id: mongoose.Types.ObjectId(String(userId))})
        .exec(async(error, result) => {
            if(error){
                rej(error);
                return;
            }else if (result === null){
                rej("User Id not found")
            } else {
                salt = result.salt;
                const hash_password = await bcrypt.hash(newCredential.password, salt);
                result.Username = newUsername;
                user.Password = newPassword;
                result. save()
                    .then(result=>{res(result)})
                    .catch(err=> rej(err))
            }
        })

    },
    delete : async(userId) =>{
        let checkRole = (userId) =>new Promise((res, rej) => {
            UserInfo.findOne({_id: mongoose.Types.ObjectId(String(userId))}).exec(async(error, result) => {
                result.role === "admin"? rej("Admin cannot be deleted"):res();
            })
        })
        let findFavId = (userId) => new Promise((res, rej) => {
            UserInfo.findOne({ _id: mongoose.Types.ObjectId(String(userId))})
            .populate('favourite')
            .exec((error, e) => {
                if(error){
                    rej(error);
                    return;
                }else if (e === null){
                    rej("Favourite Id not found")
                } else {
                    if ('favourite' in e && e.favourite !== undefined) {
                        res(e.favourite._id);
                    }
                }
            });
        });
        let deleteFavourite =(favouritelistId)=> new Promise((res, rej) => {
            Favourite.deleteOne({_id: mongoose.Types.ObjectId(String(favouritelistId)) })
            .exec((err, e) => {
                if(error){
                    rej(error);
                    return;
                }else if (e === null){
                    rej("Favourite Id cannot be delete");
                    return;
                } else {
                    res(e);
                    return;
                }
            });
        });

        let deleteComment = (userId) => new Promise((res, rej) => {
            Comment.deleteMany({User: mongoose.Types.ObjectId(String(userId))})
            .exec((err, e) => {
                if(error){
                    rej(error);
                    return;
                }else {
                    res(e);
                    return;
                }
            });
        });

        let delUser =(userId) => new Promise((res, rej) => {
            UserInfo.deleteOne({_id: mongoose.Types.ObjectId(String(userId)) })
            .exec((err, e) => {
                if(error){
                    rej(error);
                    return;
                }else {
                    res(e);
                    return;
                }
            });
        });

        return checkRole(userId)
        .then(()=>findFavId(userId))
        .then((result)=>deleteFavourite(userId))
        .then(()=>deleteComment(userId))
        .then(()=>delUser(userId))
        .then((e)=> console.log(e))
        .catch(err =>console.log(err));
    }
}

module.exports = Users;