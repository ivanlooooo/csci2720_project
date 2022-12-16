const Event = require('../Schema/Event.js')

Events = {
    read_all: () => {
        let EventData = () => new Promise((res, rej) => {
            Event.find()
                .populate('location')
                .exec((err, e) => {
                    if (err) rej("error: " + err);
                    else res(e);
                })
        });

        return EventData()
    },
    create: () => "test_create",
    read: eventId => {
        let EventData = () => new Promise((res, rej) => {
            Event.findOne({ eventid: eventId })
                .populate('location')
                .exec((err, e) => {
                    if (err) rej("error: " + err);
                    else res(e);
                })
        })

        return EventData()
    },
    update: () => "test_update",
    delete: () => "test_delete",
}


module.exports = Events;