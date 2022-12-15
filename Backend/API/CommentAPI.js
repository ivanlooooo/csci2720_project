const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Comment = require('../Schema/comment');


CommentAPI={
    create : (userId, locationId, newComments) => new Promise((res, rej) => {
        Comment.create({locId: locationId ,User : userId,content: newComments,updatedAt:Date.now()}, (err, e) => {
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
    }),
    read:  locationId => new Promise((res, rej) => { 
        Comment.find({
            locId: mongoose.Types.ObjectId(String(locationId))
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
        });
    })
}

module.exports = CommentAPI;