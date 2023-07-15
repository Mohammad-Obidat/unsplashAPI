require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/', require('./routes/api/products.js'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`listening on ${PORT}`));
