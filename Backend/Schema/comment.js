const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    locId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' },
    content: { type: String },
    updatedAt: { type: Date }
});
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;