mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true
  },
  email: { 
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String 
  }
}, {collection: 'users', versionKey: false}
);

const model = mongoose.model('User', userSchema);

module.exports = model;
