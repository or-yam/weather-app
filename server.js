const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./server/routes/api');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 2053;

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', api);

app.listen(PORT, function () {
  console.log(`Running on port ${PORT}`);
});
