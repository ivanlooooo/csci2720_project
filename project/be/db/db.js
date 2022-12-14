//Group members
//Hung Man Kei   (1155127099)	   Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)      Tsai Kwun Ki      (1155126289)

var mongoose = require('mongoose'),
    db = mongoose.connection,
    DB_URL = 'mongodb://s1155127099:x25349@127.0.0.1:27017/s1155127099';

mongoose.set('useFindAndModify', false);


mongoose.Promise = global.Promise;

//connect
mongoose.connect(DB_URL);

//successful
db.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

//error
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

//lost connection
db.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;