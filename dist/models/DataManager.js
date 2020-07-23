export class DataManager {
  constructor() {
    this._data = {
      citiesWeather: [],
    };
  }

  findCityIndexByName(name) {
    const i = this._data.citiesWeather.findIndex((city) => city.name === name);
    return i;
  }

  getCityWeather = async (cityName) => {
    let city = await $.get(`/weather/${cityName}`);
    this._data.citiesWeather.push(city);
  };

  getFavoritesFromDB = async () => {
    let cities = await $.get('/cities');
    cities.forEach((city) => this._data.citiesWeather.push(city));
  };

  addToFavorites = (cityName) => {
    const i = this.findCityIndexByName(cityName);
    this._data.citiesWeather[i].favorite = true;
    const cityObj = this._data.citiesWeather[i];
    $.post('/cities', cityObj);
  };

  removeFromFavorites = (cityName) => {
    $.ajax({
      url: `/cities/${cityName}`,
      type: 'DELETE',
    });
    const i = this.findCityIndexByName(cityName);
    this._data.citiesWeather[i].favorite = false;
  };
}
