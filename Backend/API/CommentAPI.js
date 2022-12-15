const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Comment = require('../Schema/comment');
const UserInfo = require('../Schema/UserInfo');

CommentAPI={
    create:(name, locationId, newComments) => {
        let createComment=( result,newComments)=> new Promise(async(res, rej) => {
            Comment.create({locId: result.locationId ,User : result.userId,content: newComments,updatedAt:Date.now()}
            ,(err, e) => {
                if (err)
                  rej(err)
                else 
                  res(e)
              })
        });
        let findUser=(name)=> new Promise((res, rej) => {
            UserInfo.findOne({Usernmae: name})
            .exec((err, e) => {
                if (err) rej(err);
                else if (e === null) rej("Error: cannot find user");
                else {
                    result={}
                    result.userId=e._id
                    res (result);
                }
            })
        })
        let findLocation=(locationId,result)=> new Promise((res, rej) => {
            UserInfo.findOne({locId: locationId})
            .exec((err, e) => {
                if (err) rej(err);
                else if (e === null) rej("Error: cannot find user");
                else {
                    result.locationId=e._id
                    res (result);
                }
            })
        })
        return findUser(name)
        .then(result=>findLocation(locationId,result))
        .then(result => createComment(result,newComments))

    },
    read: (locationId) => {
        let readRecord=(locationId)=> new Promise((res, rej) => {
            Comment.find({
                locId: locationId
                })
                .populate('User')
                .exec((err, e) => {
                    if (err) {
                        rej(err.message);
                        return;
                    } else {
                        const results = [];
                        e.map(ele => {
                            const result = {};
                            result.name = ele.User.name;
                            result.comment = ele.content;
                            result.updateTime = ele.updatedAt;
                            results.push(result);
                        });
                        res(results);
                        return;
                    }
                })
            });
        let findLocation=(locationId)=> new Promise((res, rej) => {
            UserInfo.findOne({locId: locationId})
            .exec((err, e) => {
                if (err) rej(err);
                else if (e === null) rej("Error: cannot find user");
                else {
                    res (e._id);
                }
            })
        })
        return findLocation(locationId)
        .then((result)=> readRecord(result))
    }
}

module.exports = CommentAPI;