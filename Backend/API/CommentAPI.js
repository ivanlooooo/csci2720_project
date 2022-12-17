const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Comment = require('../Schema/comment');
const Location = require('../Schema/Location');


CommentAPI={
    create: (userId, locationId, newComments)=>{
        let createComment = (userId,result,newComments)=> new Promise((res, rej) => {
            Comment.create({locId: result ,userName : userId,comments: newComments,updatedAt:Date.now()}, (err, e) => {
                if (err) {
                    rej(err.message);
                    return
                } else if (e === null)
                    rej("No comment input. Please verify it.");
                else {
                    res(e);
                    return;
            }
         })
        })
        let findLocation = async(locationId)  => new Promise((res, rej) => {
        Location.findOne({locId: locationId})
            .exec((err, e) => {
            if (err)
            res("Error:" + err);
            else if (e === null)
            res(`{"error":"cannot find location}`)
            else{
                res(e._id)
            }
        });
    })
        return  findLocation(locationId)
        .then((result => createComment(userId,result,newComments)))

    },
    read:(locationId)=>{ 
        let findLocation = async(locationId)  => new Promise((res, rej) => {
            Location.findOne({locId: locationId})
                .exec((err, e) => {
                if (err)
                res("Error:" + err);
                else if (e === null)
                res(`{"error":"cannot find location}`)
                else{
                    res(e._id)
                }
            });
        })
        let updateComment= async(locationId)  => new Promise((res, rej) => {
        Comment.find({
                locId: mongoose.Types.ObjectId(String(locationId))
                })
                .exec((err, e) => {
                    if (err) {
                        rej(err.message);
                        return;
                    } else {
                        const results = [];
                        e.map(ele => {
                            const result = {};
                            result.name = ele.userName;
                            result.comment = ele.comments;
                            result.updateTime = ele.updatedAt;
                            results.push(result);
                        });
                        res(results);
                        return;
                    }
                });
            })
        return  findLocation(locationId)
        .then((result => updateComment(result)))
    },
}

module.exports = CommentAPI;