
const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
    name: { type: String, required: true },
    longitude: { type: Number },
    latitude: { type: Number },
    Event: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});
const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;