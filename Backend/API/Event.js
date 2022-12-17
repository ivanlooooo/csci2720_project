const Event = require('../Schema/Event.js')
const Location = require('../Schema/Location.js')

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");


Events = {
    create: new_info => {
        let createEvent = new_info => new Promise((res, rej) => {
            Event.create({
                eventid: new_info.eventId,
                title: new_info.event_title,
                location: new_info.locationId,
                time: new_info.event_time,
                description: new_info.event_description,
                presenter: new_info.event_presenter,
                price: new_info.event_price,
            }, (err, e) => err ? rej(err) : res(`new event ${e} created`))
        })

        let mapLocId = new_info => new Promise((res, rej) => {
            Location.find()
                .where('locId').in(new_info.locationId)
                .exec((err, e) => {
                    if (err) rej("error: " + err);
                    else {
                        new_info.locationId = e.map(ele => ele._id)
                        res(new_info);
                    }
                });
        })

        return mapLocId(new_info)
            .then(res => createEvent(res))
    },

    read_all: () => new Promise((res, rej) => {
        Event.find()
            .populate('location')
            .exec((err, e) => {
                if (err) rej("error: " + err);
                else {
                    event_list = e.map(ele => {
                        return {
                            eventid: ele.eventid,
                            title: ele.title,
                            venue: ele.location.map(loc => loc.name),
                            time: ele.time,
                            description: ele.description,
                            presenter: ele.presenter,
                            price: ele.price
                        }
                    })
                    res(event_list);
                }
            })
    }),

    read: eventId => new Promise((res, rej) => {
        Event.findOne({ eventid: eventId })
            .populate('location')
            .exec((err, e) => {
                if (err) rej("error: " + err);
                else res({
                    eventid: e.eventid,
                    title: e.title,
                    venue: e.location.map(loc => loc.name),
                    time: e.time,
                    description: e.description,
                    presenter: e.presenter,
                    price: e.price
                });
            })
    }),

    readByLoc: async (locId)=>{
        let findLocation = (locationId)  => new Promise((res, rej) => {
            console.log("locId" +locationId)
            Location.findOne({locId: locationId})
                .exec((err, e) => {
                if (err)
                rej("Error:" + err);
                else if (e === null)
                rej(`{"error":"cannot find location}`)
                else{
                    res(e._id)
                    console.log(e._id)
                }
            });
        })
        let findEvent = async(id) =>new Promise((res, rej) => {
            Event.find({ location: mongoose.Types.ObjectId(String(id)) })
            .exec((err, e) => {
                if (err) rej("error: " + err);
                else {
                    event_list = e.map(ele => {
                        return {
                            eventid: ele.eventid,
                            title: ele.title,
                            venue: ele.location.map(loc => loc.name),
                            time: ele.time,
                            description: ele.description,
                            presenter: ele.presenter,
                            price: ele.price
                        }
                    })
                    res(event_list);
                }
            })
        })
        return findLocation(locId)
        .then(res=>findEvent(res))
    },

    update: new_info => {
        let getEvent = eventId => new Promise((res, rej) => {
            Event.findOne({ eventid: eventId })
                .populate('location')
                .exec((err, e) => {
                    if (err) rej("error: " + err);
                    else res({
                        eventid: e.eventid,
                        title: e.title,
                        venue: e.location.map(loc => loc.locId),
                        time: e.time,
                        description: e.description,
                        presenter: e.presenter,
                        price: e.price
                    });
                })
        })

        let mapLocId = new_info => new Promise((res, rej) => {
            Location.find()
                .where('locId').in(new_info.locationId)
                .exec((err, e) => {
                    if (err) rej("error: " + err);
                    else {
                        new_info.locationId = e.map(ele => ele._id)
                        res(new_info);
                    }
                });
        })

        let updateEvent = new_info => new Promise((res, rej) => {
            Event.findOne({ eventid: new_info.eventId })
                .exec((err, e) => {
                    if (err) rej("error: " + err);
                    else if (e === null) rej("cannot find event id: " + id);
                    else {
                        e.title = new_info.event_title
                        e.location = new_info.locationId
                        e.time = new_info.event_time
                        e.description = new_info.event_description
                        e.presenter = new_info.event_presenter
                        e.price = new_info.event_price
                        e.save().then(() => res(e.eventid));
                    }
                })
        })

        return getEvent(new_info.eventId)
            .then(res => {
                return {
                    eventId: new_info.eventId ? new_info.eventId : res.eventId,
                    event_title: new_info.event_title ? new_info.event_title : res.title,
                    locationId: new_info.locationId ? new_info.locationId : res.venue,
                    event_time: new_info.event_time ? new_info.event_time : res.time,
                    event_description: new_info.event_description ? new_info.event_description : res.description,
                    event_presenter: new_info.event_presenter ? new_info.event_presenter : res.presenter,
                    event_price: new_info.event_price ? new_info.event_price : res.price
                }
            })
            .then(res => mapLocId(res))
            .then(res => updateEvent(res))
            .then(res => `successfully updated event id: ${res}`)

    },


    delete_all: () => new Promise((res, rej) => {
        Event.find()
            .remove()
            .exec((err, e) => {
                if (err) rej("error: " + err);
                else res("all data deleted");
            })
    }),

    delete: eventId => new Promise((res, rej) => {
        Event.findOne({ eventid: eventId })
            .remove()
            .exec((err, e) => {
                if (err) rej("error: " + err);
                else if (e.deletedCount === 0) rej("cannot find event id: " + req.params.eventId);
                else res(`event deleted`);
            })
    }),
}


module.exports = Events;