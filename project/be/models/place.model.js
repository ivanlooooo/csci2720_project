//Group members


var mongoose = require('../db/db.js');

// schema
const classSchema = new mongoose.Schema({
    venue_id: String,
    venuec: String,
    venuee: String,
    latitude: String,
    longitude: String,
})
// model
const classModel = mongoose.model('venue', classSchema)

module.exports = classModel