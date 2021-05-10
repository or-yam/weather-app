export class DataManager {
  constructor() {
    this.citiesWeather = [];
  }

  findCity = name => this.citiesWeather.find(city => city.name === name);

  getCityWeather = async cityName => {
    const city = await $.get(`/weather/${cityName}`);
    city.temperature ? this.citiesWeather.unshift(city) : alert('City Was Not Found');
  };

  getLocationWeather = async coordinates => {
    const location = await $.get(`/location`, coordinates);
    this.citiesWeather.unshift(location);
  };

  getFavoritesFromDB = async () => {
    const cities = await $.get('/cities');
    this.citiesWeather = [...cities];
  };

  addToFavorites = cityName => {
    const city = this.findCity(cityName);
    city.favorite = true;
    $.post('/cities', city);
  };

  removeFromFavorites = cityName => {
    $.ajax({
      url: `/cities/${cityName}`,
      type: 'DELETE',
      success: () => {
        const city = this.findCity(cityName);
        city.favorite = false;
      },
      error: (req, status, error) => {
        console.log(error);
      }
    });
  };

  updateWeatherToDB = async cityName => {
    await $.ajax({
      url: `/cities/${cityName}`,
      type: 'PUT',
      success: async () => {
        this.getFavoritesFromDB();
      },
      error: (req, status, error) => console.log(error)
    });
  };
}
