//Group members


var mongoose = require('../db/db.js');
const bcrypt = require("bcryptjs")


// schema
const classSchema = new mongoose.Schema({
    username: { type: String, unique: true,  minLength: 4, maxLength: 20 },
    password: { type: String },
    role: {
        type: String,
        default: '1'
    },
} , {timestamps: true});


classSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
});
classSchema.pre('findOneAndUpdate', async function (next) {
  const user = this;
  if (user._update.$set.password) {
    user._update.$set.password = await bcrypt.hash(user._update.$set.password, 10);
  }
  next();
});

// model
const classModel = mongoose.model('user', classSchema);

module.exports = classModel


