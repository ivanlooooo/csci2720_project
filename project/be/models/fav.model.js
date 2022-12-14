//Group members


var mongoose = require('../db/db.js');

//schema
const classSchema = new mongoose.Schema({
    venue_id: String,
    user_id: String,
})
//model
const classModel = mongoose.model('fav', classSchema)

module.exports = classModel