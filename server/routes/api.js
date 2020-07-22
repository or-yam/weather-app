const express = require('express');
const axios = require('axios');
const city = require('../model/City');

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
    .then((data) => res.send(data.data))
    .catch((err) => res.send(err));
});


router.get('/cities')


// router.post('/city/:cityName')

// router.delete('/city/:cityName')



module.exports = router;
