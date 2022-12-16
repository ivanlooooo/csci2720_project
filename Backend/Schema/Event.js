const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    eventid: { type: Number, require: true, unique: true },
    title: { type: String, require: true },
    time: { type: String },
    description: { type: String },
    presenter: { type: String },
    price: { type: String },
    location: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;