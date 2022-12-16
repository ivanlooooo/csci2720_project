const mongoose = require("mongoose");

const FavouriteSchema = mongoose.Schema({
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' }
})
const Favourite = mongoose.model('User', FavouriteSchema);

module.exports = Favourite;