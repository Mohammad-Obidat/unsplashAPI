require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));
app.use('/', require('./routes/api/products.js'));

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`listening on ${PORT}`));
