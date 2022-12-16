
const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
    name: { type: String, required: true },
    longitude: { type: Number },
    latitude: { type: Number },
    locId: { type: Number, requied: true, unique: true }
});
const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;