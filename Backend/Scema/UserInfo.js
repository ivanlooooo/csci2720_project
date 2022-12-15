var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Username: {type: String, required: true, unique: true },
    Password: {type: String, required:true},
    userlink: { type: mongoose.Schema.Types.ObjectId, ref: 'Favourite' },
    salt: { type: String, required: true }
})

const UserInfo = mongoose.model('UserInfo',UserSchema);

module.exports = UserInfo ;