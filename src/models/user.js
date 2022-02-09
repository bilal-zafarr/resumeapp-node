mongoose = require('mongoose');
const imageToBase64 = require('image-to-base64');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

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
  },
  img:{
    type: Buffer,
    //contentType: String,
    type: String,
    //default: imageToBase64(path.join(__dirname, '../../public/img/pic.png')),
    // .then(
    //     (response) => {
    //         //console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
    //     }
    // )
    // .catch(
    //     (error) => {
    //         console.log(error); // Logs an error if there was one
    //     }
    // )
  },
  name:{
    type: String,
    default: 'Your Name'
  },
  role:{
    type: String,
    default: 'Your Role'
  },
  info:{
    type: String,
    default: 'Write about yourself in 3 -4 Sentences'
  },
  address:{
    type: String,
    default: 'Your Address'
  },
  phone:{
    type: String,
    default: '+92 000 000 0000'
  },
  email:{
    type: String,
    default: 'example@email.com'
  },
  skills:{
    type: String,
    default: `HTML
    CSS
    Javascript
    Node.js
    React.js
    MongoD`
  },
  //education
  year1:{
    type: String,
    default: '2000 - 2010'
  },
  title1:{
    type: String,
    default: 'Title'
  },
  desc1:{
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  year2:{
    type: String,
    default: '2010 - 2013',
  },
  title2:{
    type: String,
    default: 'Title'
  },
  desc2:{
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  year3:{
    type: String,
    default: '2010 - 2013'
  },
  title3:{
    type: String,
    default: 'Title'
  },
  desc3:{
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  //experience
  year1ex:{
    type: String,
    default: '2000 - 2010'
  },
  title1ex:{
    type: String,
    default: 'Title'
  },
  desc1ex:{
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  year2ex:{
    type: String,
    default: '2010 - 2013'
  },
  title2ex:{
    type: String,
    default: 'Title'
  },
  desc2ex:{
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  year3ex:{
    type: String,
    default: '2000 - 2010'
  },
  title3ex:{
    type: String,
    default: 'Title'
  },
  desc3ex:{
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  year4ex:{
    type: String,
    default: '2000 - 2010'
  },
  title4ex:{
    type: String,
    default: 'Title'
  },
  desc4ex:{
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  year5ex:{
    type: String,
    default: '2000 - 2010'
  },
  title5ex:{
    type: String,
    default: 'Title'
  },
  desc5ex:{
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
}, {collection: 'users', versionKey: false}
);

const model = mongoose.model('User', userSchema);

module.exports = model;
