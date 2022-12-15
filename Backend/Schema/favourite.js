const mongoose = require("mongoose");

const FavouriteSchema = mongoose.Schema({
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
})
const Favourite = mongoose.model('User', FavouriteSchema);

module.exports = Favourite;