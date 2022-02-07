const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = 'lkfahasdjfhalsfhasfajfa;257$%^&*(6546464';

//connecting databse
mongoose.connect('mongodb://localhost:27017/resume-app-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));


app.get('/',(req, res) => {
    res.render('index');
})

//resume api
app.get('/resume',(req, res) => {
  const token = req.query.token;
  const user = jwt.verify(token, JWT_SECRET);
  //console.log(user);
  res.render('resume');
})

//signup api
app.post('/api/signup', async (req, res) => {

  const {username, password: plainTextPassword, email} = req.body;

  //validating the data
  if(!username || typeof username !== 'string'){
    return res.json({status: 'error', error: 'Invalid Username'});
  }

  if(!plainTextPassword || typeof plainTextPassword !== 'string'){
    return res.json({status: 'error', error: 'Invalid Password'});
  }

  if(plainTextPassword.length < 6){
    return res.json({status: 'error', error: 'Password too short. Should be at least 6 characters'});
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    await User.create({
      username,
      email,
      password
    })
    
  } catch (error) {
    //duplicate key
    if(error.code === 11000){
      return res.json({status: 'error', error:"Username already exists, Try a different one"});
    }
    throw error;
  }
  return res.json({status: 'ok'})
})

//login api
app.post('/api/login', async (req, res)=>{
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if(!user){
    return res.json({status:'error' , error: 'Invalid Username/Password'});
  }

  if( await bcrypt.compare(password, user.password)){
    
    const token = jwt.sign({ 
      id:user._id,
      username:user.username
    }, JWT_SECRET);

    return res.json({ status: 'ok', data: token});
  }

  res.json({status:'error' , error: 'Invalid Username/Password'});
})

app.listen(port, () => {
  console.log('Server running on port ' + port);
})
