const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    title: { type: String, require: true },
    time: { type: Number}, 
    description: { type: String},
    presenter: { type: String} , 
    price:  { type: Number}
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;