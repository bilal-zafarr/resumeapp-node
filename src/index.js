const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));


app.get('/',(req, res) => {
    res.render('index');
})

app.get('/resume',(req, res) => {
  res.render('resume');
})

app.listen(port, () => {
  console.log('Server running on port 3000');
  console.log(path.join(__dirname, '../public/generateResume.html'));
})
