const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    locId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    commentedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' },
    comments: { type: String },
    updatedAt: { type: Date }
});
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;