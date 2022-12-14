//Group members


var express = require('express');
var router = express.Router();
var usermodel = require("./../models/user.model.js");
const bcrypt = require("bcryptjs")


var regHanle = ({ username, password, role }) => {
    var user = new usermodel({
        username, password, role,
    })

    usermodel.find({
        password,
        username,
    }, (err, doc) => {
        if (doc.length) {
            return
        }
        user.save()
    })
}


[{
    username: 'admin',
    password: '$2a$10$Y0fFzeZcfxy1P.K5ZSXqb.5pmfB4nh6k0k2ytKFvOQuZaBWe9EFou',
    role: '2',
},
{
    username: 'a123',
    password: '$2a$10$H7jiuCPZSeXRTSz.wuV65.MKPt7OdJMiRwIdoPgLwm93LAdjMp4Ca',
    role: '1',
},
].map((it, index) => { regHanle(it) })



/* GET users listing. */
router.get('/', function (req, res, next) {
    usermodel.find({}, (err, doc) => {
        return res.json({ code: 0, msg: 'Datas Gets Successfully', data: doc })
    })
});

router.post('/login', async (req, res, next) => {
    var { username, password } = req.body;
    if (!username || !password) {
        return res.json({ code: 500, msg: 'Parameter cannot be empty' })
    }

const user = await usermodel.findOne({ username });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return res.json({ code: 200, msg: 'success', data: user });
      } else {
        return res.json({ code: 500, msg: 'Invalid Password' });
      }
    } else {
        return res.json({ code: 500, msg: 'User does not exist please register' });
    }
/*
    usermodel.find({
        username,
        password,
    }, (err, doc) => {
        if (!doc.length) {
            return res.json({ code: 500, msg: 'User does not exist please register' })
        }

        res.json({ code: 200, msg: 'success', data: doc[0] })
    }) */
});

router.post('/reg', async (req, res, next) => {
    const { username, password, role } = req.body;
    if (!username || !password) {
        return res.json({ code: 500, msg: 'Parameter cannot be empty' })
    }
    usermodel.find({
        username
    }, (err, doc) => {
        if (!doc.length) {
            var user = new usermodel({
                username, password, role,
            })
            user.save()
            res.json({ code: 200, msg: 'success', data: doc[0] })
            
        } else return res.json({ code: 500, msg: 'User already exists' })
})
});

router.post('/update', async (req, res, next1) => {
    var { username, password, role, _id } = req.body;
    if (!username || !password || !_id) {
        return res.json({ code: 500, msg: 'Parameter cannot be empty' })
    }

    /*var encrypt = await function (next) {
      
          bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
              return next(saltError)
            } else {
              bcrypt.hash(password, salt, function(hashError, hash) {
                if (hashError) {
                  return next(hashError)
                }
      
                password = hash
                next()
              })
            }
          })
      }
      
      var bencrypt = password;
      bcrypt.genSalt(10, function (saltError, salt) {
          bcrypt.hash(bencrypt, salt, function(hashError, hash) {
            password = hash
          })
      }) */

usermodel.findByIdAndUpdate(_id, { $set: { username, password, role, _id } }, function (err, doc) {
    res.send({ code: 200, data: 'ok' })
})

});

router.get('/del', (req, res, next) => {
    let id = req.query.id
    usermodel.findByIdAndRemove(id, function (err, doc) {
        return res.send({ code: 200, msg: 'success' })
    })
})


module.exports = router;
