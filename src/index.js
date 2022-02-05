const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/generateResume',(req, res) => {
//     res.render(path.join(__dirname, '../public/generateResume.html'));
// })

app.listen(port, () => {
  console.log('Server running on port 3000');
})
