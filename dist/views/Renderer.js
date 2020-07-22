export class Renderer {
  constructor() {}

  renderFavoritesList = (list) => {
    const source = $('#favorite-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template(list);
    $('#favorite-container').empty().append(newHTML);
  };

  renderCitiesDisplay = (data) => {
    const source = $('#forecast-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template(data);
    $('#forecast-container').empty().append(newHTML);
  };
}
