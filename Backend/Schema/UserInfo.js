var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Username: {type: String, required: true, unique: true },
    Password: {type: String, required:true},
    favourite: { type: mongoose.Schema.Types.ObjectId, ref: 'Favourite'},
    role: {type: String ,required:true},
    salt: { type: String }
}, {
    versionKey: false // You should be aware of the outcome after set to false
})

const UserInfo = mongoose.model('UserInfo',UserSchema);

module.exports = UserInfo ;