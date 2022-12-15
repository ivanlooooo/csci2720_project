var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Username: {type: String, required: true, unique: true },
    Password: {type: String, required:true}
},
{
    collection : "UserInfo"
})

mongoose.model('UserInfo', UserSchema);