    /**
     * @class Responsible for storing and manipulating weather - forecast, in-memory
     */
class WeathersRepository {
    constructor() {
        this.weatherForecasts = [];
    }

    addForecast(forecastObj) {
        this.weatherForecasts.push(forecastObj);
    }
    
    removeForecast(index) {
        this.weatherForecasts.splice(index, 1);
    }
    
    addComment(newComment, forecastIndex) {
        this.weatherForecasts[forecastIndex].comments.push(newComment);
    };

    deleteComment(forecastIndex, commentIndex) {
        this.weatherForecasts[forecastIndex].comments.splice(commentIndex, 1);
      };
}
export default WeathersRepository

