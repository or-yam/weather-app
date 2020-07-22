const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./server/routes/api');
const path = require('path');

const port = 2053;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', api);

mongoose.connect('mongodb://localhost/Weather', { useNewUrlParser: true });

app.listen(port, function () {
  console.log(`Running on port ${port}`);
});
