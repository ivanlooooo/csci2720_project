const Event = require('../Schema/Event.js')
const Location = require('../Schema/Location.js')

Events = {
    read_all: () => {
        let EventData = () => new Promise((res, rej) => {
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
        });

        return EventData()
    },
    create: () => "test_create",
    read: eventId => {
        let EventData = eventId => new Promise((res, rej) => {
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
        })

        return EventData(eventId)
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
                        e.time = new_info.event_date
                        e.description = new_info.event_description
                        e.presenter = new_info.event_presenter
                        e.price = new_info.event_price
                        e.save().then(() => res(e.eventId));
                    }
                })
        })

        return getEvent(new_info.eventId)
            .then(res => {
                return {
                    eventId: new_info.eventId ? new_info.eventId : res.eventId,
                    event_title: new_info.event_title ? new_info.event_title : res.title,
                    locationId: new_info.locationId ? new_info.locationId : res.venue,
                    event_date: new_info.event_time ? new_info.event_time : res.time,
                    event_description: new_info.event_description ? new_info.event_description : res.description,
                    event_presenter: new_info.event_presenter ? new_info.event_presenter : res.presenter,
                    event_price: new_info.event_price ? new_info.event_price : res.price
                }
            })
            .then(res => mapLocId(res))
            .then(res => updateEvent(res))

    },
    delete: () => "test_delete",
}


module.exports = Events;