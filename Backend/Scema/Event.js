const mongoose = require("mongoose");

const EventtSchema = mongoose.Schema({
    titleee: { type: String, require: true },
    venue :{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }, 
    time: { type: Number}, 
    description: { type: String},
    presenter: { type: String} , 
    price:  { type: Number}
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;