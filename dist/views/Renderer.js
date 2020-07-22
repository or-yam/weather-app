export class Renderer {
  constructor() {}

  // renderFavoritesList = (list) => {
  //   const source = $('#favorite-template').html();
  //   const template = Handlebars.compile(source);
  //   const newHTML = template(list);
  //   $('#favorite-container').empty().append(newHTML);
  // };

  renderCities = (data) => {
    const source = $('#weather-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template(data);
    $('#weather-container').empty().append(newHTML);
  };
}
