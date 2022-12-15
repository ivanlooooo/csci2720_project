const mongoose = require("mongoose");

const FacvouriteSchema = mongoose.Schema({
    favlocations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
})
const Favourite = mongoose.model('User', FacvouriteSchema);

module.exports = Favourite;