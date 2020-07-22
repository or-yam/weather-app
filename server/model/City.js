const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  temperature: Number,
  condition: String,
  conditionPic: String,
  favorite: Boolean,
});

const city = mongoose.model('city', citySchema);

module.exports = city;
