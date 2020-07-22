import { DataManager } from './models/DataManager.js';
import { Renderer } from './views/Renderer.js';

const dataManager = new DataManager();
const renderer = new Renderer();

const loadPage = async () => {
  await dataManager.getFavorites();
  renderer.renderCities(dataManager._data.cities);
  // renderer.renderFavoritesList(
  //   dataManager._data.cities.map((city) => {
  //     if (city.favorite) {
  //       return city.name;
  //     }
  //   })
  // );
};

const searchCity = async (cityName) => {
  await dataManager.getCityWeather(cityName);
  renderer.renderCities(dataManager._data.cities);
};

const addToFavorites = async (cityName) => {
  await dataManager.addToFavorites(cityName);
  renderer.renderCities(dataManager._data.cities);
  // renderer.renderFavoritesList(
  //   dataManager._data.cities.map((city) => city.name)
  // );
};

const removeFromFavorites = async (cityName) => {
  await dataManager.removeFromFavorites(cityName);
  renderer.renderCities(dataManager._data.cities);
  // renderer.renderFavoritesList(
  //   dataManager._data.cities.map((city) => city.name)
  // );
};

loadPage();
$('#search-btn').on('click', searchCity($('#search-input').val()));
$('#weather-container').on('click','.add-btn',addToFavorites(this.name));
$('#weather-container').on('click','.remove-btn',removeFromFavorites(this.name));