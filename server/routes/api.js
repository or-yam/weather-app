const express = require('express');
const axios = require('axios');
const City = require('../model/City');
const city = require('../model/City');

const router = express.Router();

const getWeatherFromAPI = (cityName) => {
  const API_KEY = 'bd21f266154151d21e6ec78724fa391e';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
  return axios.get(API_URL);
};

router.get('/weather/:cityName', function (req, res) {
  const { cityName } = req.params;
  getWeatherFromAPI(cityName)
    .then((data) => {
      const city = {
        name: data.data.name,
        temperature: Math.floor(data.data.main.feels_like),
        condition: data.data.weather[0].description,
        conditionPic: data.data.weather[0].icon,
        favorite: false,
      };
      res.send(city);
    })
    .catch((err) => res.send(err));
});

router.get('/cities', function (req, res) {
  City.find({}).exec((err, data) => res.send(data));
});

router.post('/cities', function (req, res) {
  const { name, temperature, condition, conditionPic, favorite } = req.body;
  const city = new City({
    name,
    temperature,
    condition,
    conditionPic,
    favorite,
  });
  city.save().then((s) => res.send(s));
});

router.delete('/cities/:cityName', function (req, res) {
  const { cityName } = req.params;
  City.findOneAndDelete({ name: cityName }).exec(
    res.send('Removed From Favorites')
  );
});

router.put('/cities/:cityName', function (req, res) {
  const { cityName } = req.params;
  getWeatherFromAPI(cityName).then((data) => {
    City.findOneAndUpdate(
      { name: cityName },
      {
        $set: {
          temperature: Math.floor(data.data.main.feels_like),
          condition: data.data.weather[0].description,
          conditionPic: data.data.weather[0].icon,
        },
      },
      { new: true },(err,data)=>res.send(data)
    )
  });
});

module.exports = router;
