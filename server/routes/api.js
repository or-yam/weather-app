const express = require('express');
const axios = require('axios');
const City = require('../model/City');

const router = express.Router();

const getWeatherFromAPI = (cityName, lat, lng) => {
  const API_KEY = 'bd21f266154151d21e6ec78724fa391e';
  let API_URL;
  lat && lng
    ? (API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`) // get weather by location
    : (API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
  return axios.get(API_URL);
};

//getting city weather from the api by name
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

//getting city weather from the api by lat-lng
router.get('/location', function (req, res) {
  const { lat, lng } = req.body;
  getWeatherFromAPI(x, lat, lng)
    .then((data) => {
      const location = {
        name: 'Current Location',
        temperature: Math.floor(data.data.main.feels_like),
        condition: data.data.weather[0].description,
        conditionPic: data.data.weather[0].icon,
        favorite: false,
      };
      res.send(location);
    })
    .catch((err) => res.send(err));
});

//get saved cities from db
router.get('/cities', function (req, res) {
  City.find({}).exec((err, data) => res.send(data));
});


//save city to db
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

//remove city from db
router.delete('/cities/:cityName', function (req, res) {
  const { cityName } = req.params;
  City.findOneAndDelete({ name: cityName }).exec(
    res.send('Removed From Favorites')
  );
});

//update favorite city weather from api
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
      { new: true },
      (err, data) => res.send(data)
    );
  });
});

module.exports = router;
