export class DataManager {
  constructor() {
    this._data = {
      cities: [],
    };
  }

  getCity = async (cityName) => {
    let city = await $.get(`/weather/${cityName}`);
    this._data.cities.push(city);
  };

  getFavorites = async () => {
    let cities = await $.get('/cities');
    cities.forEach((city) => this._data.cities.push(city));
  };

  addToFavorites = async (cityObj) => {
    let city = await $.post('/city', cityObj);
    this._data.cities.push(city);
  };

  removeSpot = async (cityName) => {
    let city = await $.ajax({
      url: `/city/:${cityName}`,
      type: 'DELETE',
    });
    const i = this._data.cities.findIndex((s) => s._id === id);
    this._data.userSpots.splice(i, 1);
  };
}
