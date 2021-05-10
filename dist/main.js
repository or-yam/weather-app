import { DataManager } from './models/DataManager.js';
import { Renderer } from './views/Renderer.js';

const dataManager = new DataManager();
const renderer = new Renderer();

const loadPage = async () => {
  await dataManager.getFavoritesFromDB();
  renderer.renderCities(dataManager.citiesWeather);
};

const searchCity = async cityName => {
  await dataManager.getCityWeather(cityName);
  renderer.renderCities(dataManager.citiesWeather);
};

const addToFavorites = async cityName => {
  await dataManager.addToFavorites(cityName);
  renderer.renderCities(dataManager.citiesWeather);
};

const removeFromFavorites = async cityName => {
  await dataManager.removeFromFavorites(cityName);
  renderer.renderCities(dataManager.citiesWeather);
};

loadPage();

const onSearchClick = () => {
  const city = $('#search-input').val().toLocaleLowerCase();
  const isInList = dataManager.citiesWeather.some(cty => cty.name.toLocaleLowerCase() === city);
  isInList ? alert('Already In The List') : searchCity(city);
  $('#search-input').val('');
};

$('#search-btn').on('click', onSearchClick);

$('#search-input').on('keypress', e => {
  if (e.key === 13) onSearchClick();
});

$('#weather-container').on('click', '.favorite', function () {
  const name = $(this).closest('.city-container').find('.name').text().trim();
  const city = dataManager._data.citiesWeather.find(city => city.name === name);
  city.favorite ? removeFromFavorites(name) : addToFavorites(name);
});

$('#weather-container').on('click', '.refresh', async function () {
  const name = $(this).closest('.city-container').find('.name').text();
  await dataManager.updateWeatherToDB(name);
  renderer.renderCities(dataManager._data.citiesWeather);
});

//--use user location--//
/*
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};
const showPosition = (position) => {
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  return location;
};

const getLocationData = async (coordinates) => {
  await dataManager.getLocationWeather(coordinates);
  renderer.renderCities(dataManager._data.citiesWeather);
};

$('#my-location-btn').on('click', function () {
  console.log(getLocation());
});
*/
