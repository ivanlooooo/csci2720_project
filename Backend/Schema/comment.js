const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    locId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    comments: { type: String },
    updatedAt: { type: Date },
    userName:{type: String}
});
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;