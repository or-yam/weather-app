export class Renderer {
  constructor() {}

  renderCities = (data) => {
    const source = $('#weather-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template(data);
    $('#weather-container').empty().append(newHTML);
  };
}
