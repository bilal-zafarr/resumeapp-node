const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const pdfkit = require('pdfkit');
const fs = require('fs');
const imageToBase64 = require('image-to-base64');

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
app.get('/resume',async (req, res) => {
  const token = req.query.token;
  const {username} = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({ username }).lean();
  //console.log(user.img);
  res.render('resume',{
    img: user.img,
    name: user.name,
    role: user.role,
    info: user.info,
    address: user.address,
    phone: user.phone,
    email: user.email,
    skills: user.skills,
    year1: user.year1,
    title1: user.title1,
    desc1: user.desc1,
    year2: user.year2,
    title2: user.title2,
    desc2: user.desc2,
    year3: user.year3,
    title3: user.title3,
    desc3: user.desc3,
    year1ex: user.year1ex,
    title1ex: user.title1ex,
    desc1ex: user.desc1ex,
    year2ex: user.year2ex,
    title2ex: user.title2ex,
    desc2ex: user.desc2ex,
    year3ex: user.year3ex,
    title3ex: user.title3ex,
    desc3ex: user.desc3ex,
    year4ex: user.year4ex,
    title4ex: user.title4ex,
    desc4ex: user.desc4ex,
    year5ex: user.year5ex,
    title5ex: user.title5ex,
    desc5ex: user.desc5ex,
  });
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
    const user = await User.create({
      username,
      email,
      password
    });
    const token = jwt.sign({
      id:user._id,
      username
    }, JWT_SECRET);
    return res.json({status: 'ok', data: token});
    
  } catch (error) {
    //duplicate key
    if(error.code === 11000){
      return res.json({status: 'error', error:"Username already exists, Try a different one"});
    }
    throw error;
  }
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

//uploading pic
const upload = multer({
  dest: 'images'
});

//updating info api
app.post('/api/update', async (req, res) => {
  const {token} = req.body;
  const {id} = jwt.verify(token, JWT_SECRET);
  const {name, role, info, address, phone, email, skills, year1, title1, desc1, year2, title2, desc2, year3, title3, desc3, year1ex, title1ex, desc1ex, year2ex, title2ex, desc2ex, year3ex, title3ex, desc3ex, year4ex, title4ex, desc4ex, year5ex, title5ex, desc5ex} = req.body;
  try{
    const my = await User.findByIdAndUpdate(id, {
      name,
      role,
      info,
      address,
      phone,
      email,
      skills,
      year1,
      title1,
      desc1,
      year2,
      title2,
      desc2,
      year3,
      title3,
      desc3,
      year1ex,
      title1ex,
      desc1ex,
      year2ex,
      title2ex,
      desc2ex,
      year3ex,
      title3ex,
      desc3ex,
      year4ex,
      title4ex,
      desc4ex,
      year5ex,
      title5ex,
      desc5ex
    })
    if(my){
      res.json({status: 'ok'});
    }
    else{
      res.json({status: 'error'});
    }
  }catch(e){
    res.json({status: 'error', error: e});
  }
})

app.get('/api/pdf', async (req, res) => {
  const doc = new pdfkit();
  doc.pipe(fs.createWriteStream('resume.pdf'));
})

app.listen(port, () => {
  console.log('Server running on port ' + port);
})
