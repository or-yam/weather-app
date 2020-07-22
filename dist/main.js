import { DataManager } from './models/DataManager.js';
import { Renderer } from './views/Renderer.js';

const dataManager = new DataManager();
const renderer = new Renderer();

const loadPage = async () => {
  await dataManager.getFavoritesFromDB();
  renderer.renderCities(dataManager._data.citiesWeather);
};

const searchCity = async (cityName) => {
  await dataManager.getCityWeather(cityName);
  renderer.renderCities(dataManager._data.citiesWeather);
};

const addToFavorites = async (cityName) => {
  await dataManager.addToFavorites(cityName);
  renderer.renderCities(dataManager._data.citiesWeather);
};

const removeFromFavorites = async (cityName) => {
  await dataManager.removeFromFavorites(cityName);
  renderer.renderCities(dataManager._data.citiesWeather);
};

loadPage();
$('#search-btn').on('click', () => {
  const city = $('#search-input').val();
  searchCity(city);
});
$('#weather-container').on('click', '.favorite', () => {
  const name = $(this).closest('.city-container').find('.name').html();
  console.log(name);
});
// $('#weather-container').on('click','.remove-btn',removeFromFavorites(this.name));
