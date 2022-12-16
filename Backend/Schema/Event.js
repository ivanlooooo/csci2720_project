const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    title: { type: String, require: true },
    time: { type: Number}, 
    description: { type: String},
    presenter: { type: String} , 
    price:  { type: Number},
    location :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;