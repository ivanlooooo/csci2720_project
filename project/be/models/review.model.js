//Group members


var mongoose = require('../db/db.js');

// schema
const classSchema = new mongoose.Schema({
    venue_id: String,
    user_id: String,
    content: [],
})
// model
const classModel = mongoose.model('comment', classSchema)

module.exports = classModel