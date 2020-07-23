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
    city.temperature
      ? this._data.citiesWeather.push(city)
      : alert('City Was Not Found');
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

  updateWeatherToDB = async (cityName) => {
    let city = await $.ajax({
      url: `/cities/${cityName}`,
      type: 'PUT',
    });
    const i = this.findCityIndexByName(cityName);
    this._data.citiesWeather[i] = city;
  };
}
