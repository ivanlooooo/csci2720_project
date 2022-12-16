const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Comment = require('../Schema/comment');
const Location = require('../Schema/Location');
const UserInfo = require('../Schema/UserInfo');
const Favourite  = require('../Schema/Favourite');

UsersAPI = {
    create:(newUsername,newPassword,newRole) => {
        let hashPassword = (newPassword) =>new  Promise(async(res, rej) => {
            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(newPassword, salt)
            const result = {};
            result.salt = salt;
            result.hash_password = hash_password;
            res(result);
            console.log(result)
        });
        let CreateUser= (newUsername,result)=> new Promise(async(res, rej) => {
                UserInfo.findOne({Username: newUsername})
                .exec((err,e)=>{
                  if(err) {
                    rej(err); 
                  } 
                  else 
                  if (e !== null) rej("Username exist");
                  else{
                    UserInfo.create({
                        Username: newUsername,
                        salt: result.salt,
                        Password : result.hash_password,
                        role: newRole
                      },(err, e) => {
                        if (err)
                          rej(err)
                        else 
                          res(e)
                      })
                  }
        });
    })
        return hashPassword(newPassword)
        .then(result=> CreateUser(newUsername,result,newRole))
    },

    //Generate All user list
    read: async(newUsername)=>new Promise((res, rej) => {
        console.log(newUsername)
        UserInfo.findOne({ Username: newUsername})
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
    }),

    readAll : async =>new Promise((res, rej) => {
        UserInfo.find()
        .exec((err,e)=>{
            const userList=[]
            if(err){
                rej(err);
                return;
            }else if (e.length >0){
                for (let ele of e){
                    const user={};
                    user._id= ele._id
                    user.Username = ele.Username;
                    user.Password = ele.Password;
                    user.role = ele.role
                    userList.push(user);
                }
            }
            res(userList);
            return;
        })
    }),
    update : async(id, newUsername,newPassword ) =>new Promise((res, rej) =>{
        if(newUsername === "" || newUsername=== null || newPassword === "" || newPassword=== null){
            rej("User name or password cannot be empty");
            return;
        }
        UserInfo.findOne({_id: mongoose.Types.ObjectId(String(id))})
        .exec(async(error, result) => {
            console.log(result)
            if(error){
                rej(error);
                return;
            }else if (result === null){
                rej("User Id not found")
            } else {
                salt = result.salt;
                const hash_password = await bcrypt.hash(newPassword, salt);
                result.Username = newUsername;
                result.Password = hash_password;
                result. save()
                    .then(result=>{res(result)})
                    .catch(err=> rej(err))
            }
        })

    }),
    delete : async(userId) =>new Promise((res, rej) => {
        UserInfo.deleteOne({_id: mongoose.Types.ObjectId(String(userId))})
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
    delete : async(newUsername) =>{
        let checkRole = (newUsername) =>new Promise((res, rej) => {
            UserInfo.findOne({Username: newUsername}).exec(async(error, result) => {
                result.role === "admin"? rej("Admin cannot be deleted"):res();
            })
        })
        
        let findFavId = (newUsername) => new Promise((res, rej) => {
            UserInfo.findOne({ Username: newUsername})
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
        let deleteFavourite =(newUsername)=> new Promise((res, rej) => {
            Favourite.deleteOne({Username: newUsername})
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

        let deleteComment = (newUsername) => new Promise((res, rej) => {
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

        return checkRole(newUsername)
        .then(()=>findFavId(newUsername))
        .then((result)=>deleteFavourite(newUsername))
        .then(()=>deleteComment(newUsername))
        .then(()=>delUser(newUsername))
        .then((e)=> console.log(e))
        .catch(err =>console.log(err));
    }
    */
}

module.exports = UsersAPI;
