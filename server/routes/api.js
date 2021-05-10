const express = require('express');
const router = express.Router();
const axios = require('axios');
const City = require('../model/City');

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherFromApi = (cityName, lat, lng) => {
  const API_URL =
    lat && lng
      ? `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
      : `${BASE_URL}?q=${cityName}&units=metric&appid=${process.env.API_KEY}`;
  return axios.get(API_URL);
};

// weather by city name
router.get('/weather/:cityName', (req, res) => {
  const { cityName } = req.params;
  getWeatherFromApi(cityName)
    .then(({ data }) => {
      const city = {
        name: data.name,
        temperature: Math.floor(data.main.feels_like),
        condition: data.weather[0].description,
        conditionPic: data.weather[0].icon,
        favorite: false
      };
      res.send(city);
    })
    .catch(err => res.send(err));
});

// weather by lat-lng
router.get('/location', (req, res) => {
  const { lat, lng } = req.body;
  getWeatherFromApi(_, lat, lng)
    .then(({ data }) => {
      const location = {
        name: 'Current Location',
        temperature: Math.floor(data.main.feels_like),
        condition: data.weather[0].description,
        conditionPic: data.weather[0].icon,
        favorite: false
      };
      res.send(location);
    })
    .catch(err => res.send(err));
});

// get saved cities from db
router.get('/cities', (req, res) => {
  City.find({}).exec((err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

// save city to db
router.post('/cities', (req, res) => {
  const { name, temperature, condition, conditionPic, favorite } = req.body;
  const city = new City({
    name,
    temperature,
    condition,
    conditionPic,
    favorite
  });
  city.save().then(data => res.send(data));
});

// remove city from db
router.delete('/cities/:cityName', (req, res) => {
  const { cityName } = req.params;
  City.findOneAndDelete({ name: cityName }).exec(res.send('Removed From Favorites'));
});

// update favorite city weather from api
router.put('/cities/:cityName', (req, res) => {
  const { cityName } = req.params;
  getWeatherFromAPI(cityName).then(data => {
    City.findOneAndUpdate(
      { name: cityName },
      {
        $set: {
          temperature: Math.floor(data.data.main.feels_like),
          condition: data.data.weather[0].description,
          conditionPic: data.data.weather[0].icon
        }
      },
      { new: true },
      (err, data) => res.send(data)
    );
  });
});

module.exports = router;
