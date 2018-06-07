/**
 * @class Responsible for rendering weather - forecast and comments in the HTML
 */
class WeathersRenderer {
  constructor() {
    this.$forecasts = $(".forecast-list");
    this.$tableBody = $('tbody');
    //  Grab the template script
    this.$weatherTemplate = $('#Weather-template').html();
    this.$commentTemplate = $('#comment-template').html();
    this.$tbodyTemplate = $('#tbody-template').html();
  }

  renderForecasts(weathers) {
    this.$forecasts.empty();
    // Compile the template
    let template = Handlebars.compile(this.$weatherTemplate);
    for (let i = 0; i < weathers.length; i++) {
      // Pass our data to the template
      let newHTML = template(weathers[i]);
      // Add the compiled html to the page      
      this.$forecasts.append(newHTML);
      this.renderComments(weathers, i);
    }
  }

  renderComments(weathers, weathersIndex) {
    let forecast = $(".forecast")[weathersIndex];
    let $commentsList = $(forecast).find('.comments-list');
    $commentsList.empty();
    let template = Handlebars.compile(this.$commentTemplate);
    for (let i = 0; i < weathers[weathersIndex].comments.length; i++) {
      let newHTML = template(weathers[weathersIndex].comments[i]);
      $commentsList.append(newHTML);
    }
  }

  renderTable(weathers)  {
    this.$tableBody.empty();
    // Compile the template
    let template = Handlebars.compile(this.$tbodyTemplate);
   
    for (let i = 0; i < weathers.length; i++) {
      // Pass our data to the template
      let newHTML = template(weathers[i]);
      // Add the compiled html to the page      
      this.$tableBody.append(newHTML);
    }
  }
}

export default WeathersRenderer 