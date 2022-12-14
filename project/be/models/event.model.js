//Group members


var mongoose = require('../db/db.js');

// schema
const classSchema = new mongoose.Schema({
    event_id: String,
    titlec: String,
    titlee: String,
    user_id: String,
    cat1: String,
    cat2: String,
    predateC: Date,
    predateE: Date,
    progtimec: String, //duration
    progtimee: String,
    venue_id: String,
    agelimitc: Number,
    pricec: String,
    pricee: String,
    descc: String, //discription_Chi
    desce: String, //discription_Eng
    urlc: String,
    //urle: String,
    tagenturlc: String, //ticket url
    //tagenturle: String,
    remarkc: String,
    remarke: String,
    enqquiry: String,
    fax: String,
    email: String,
    saledate: Date,
    presenterorgc: String,
    presenterorge: String,
    //image: {},
    //video: {},
    submitdate: Date,
})
// model
const classModel = mongoose.model('event', classSchema)

module.exports = classModel