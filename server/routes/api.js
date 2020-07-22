const express = require('express');
const axios = require('axios');
const City = require('../model/City');

const router = express.Router();

const getCityWeather = (cityName) => {
  const apiKey = 'bd21f266154151d21e6ec78724fa391e';
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  );
};

router.get('/weather/:cityName', function (req, res) {
  const { cityName } = req.params;
  getCityWeather(cityName)
    .then((data) => {
      const kalToCel = 273.15;
      const city = {
        name: data.data.name,
        temperature: Math.floor(data.data.main.feels_like - kalToCel),
        condition: data.data.weather[0].description,
        conditionPic: data.data.weather[0].icon,
      };
      res.send(city);
    })
    .catch((err) => res.send(err));
});

router.get('/cities', function (req, res) {
  City.find({}).exec((err, data) => res.send(data));
});

router.post('/city', function (req, res) {
  const { name, temperature, condition, conditionPic } = req.body;
  const city = new City({
    name,
    temperature,
    condition,
    conditionPic,
  });
  city.save().then((s) => res.send(s));
});

router.delete('/city/:cityName', function (req, res) {
  const { cityName } = req.params;
  City.findOneAndDelete({ name: cityName }).exec(
    res.send('Removed From Favorites')
  );
});

module.exports = router;
