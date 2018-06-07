import WeathersRepository from './weather-repository.js'; 
import WeathersRenderer from './weather-renderer.js';
import EventsHandler from './events-handler.js';
import UtilityFunction from './utility.js';
let weathersRepository = new WeathersRepository();
let weathersRenderer = new WeathersRenderer();
let utility = new UtilityFunction();
let eventsHandler = new EventsHandler(weathersRepository, weathersRenderer, utility);

 eventsHandler.registerAddWeather();
eventsHandler.registerRemoveWeather();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();

  //--------