import { DataManager } from './models/DataManager.js';
import { Renderer } from './views/Renderer.js';

const dataManager = new DataManager();
const renderer = new Renderer();

const loadCities = async () => {
  await dataManager.getFavorites();
  renderer.FavoritesList(dataManager._data.cities);
  renderer.renderCitiesDisplay(dataManager._data.cities.map((s) => s.name));
};

const addToFavorites = async (lat, lng, name) => {
  await spotManager.addSpot(lat, lng, name);
  ///// render
};

const removeFromFavorites = async (id) => {
  await spotManager.removeSpot(id);
  //render
};

initLoadSpots();
