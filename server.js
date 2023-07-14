require('dotenv').config();
const express = require('express');
const path = require('path');
const api = require('./routes/api.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', api);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`listening on ${PORT}`));
