export class DataManager {
  constructor() {
    this._data = {
      citiesWeather: [], // remove the object, use just array
    };
  }

  findCityIndexByName(name) {
    return this._data.citiesWeather.findIndex((city) => city.name === name);
  }

  getCityWeather = async (cityName) => {
    let city = await $.get(`/weather/${cityName}`);
    city.temperature
      ? this._data.citiesWeather.unshift(city)
      : alert('City Was Not Found');
  };

  getLocationWeather = async (coordinates) => {
    let location = await $.get(`/location`, coordinates);
    this._data.citiesWeather.push(location);
  };

  getFavoritesFromDB = async () => {
    let cities = await $.get('/cities');
    this._data.citiesWeather = [...cities]; // it works
    // cities.forEach((city) => this._data.citiesWeather.push(city));
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
      success: () => {
        const i = this.findCityIndexByName(cityName);
        this._data.citiesWeather[i].favorite = false;
      },
      //error handle
    });
  };

  updateWeatherToDB = async (cityName) => {
    let city = await $.ajax({
      url: `/cities/${cityName}`,
      type: 'PUT',
      //success:
      //error
    });
    const i = this.findCityIndexByName(cityName);// move to outer function
    this._data.citiesWeather[i] = city;// move to outer function
  };
}
