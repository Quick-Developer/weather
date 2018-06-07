
Date.prototype.formatDDMMYYYY = function () {
    return this.getDate() +
        "/" + (this.getMonth() + 1) +
        "/" + this.getFullYear();
}
/**
     * @class UtilityFunction some function for information processing 
     */
class UtilityFunction {
    constructor() {
        this.index = 0;
        this.weatherList = [];
    }

    formatWeatherDetails(data) {
        var celsius = parseFloat(data.list[0].main.temp - 273.15).toFixed(2);
        var fahrenheit = (celsius * 1.8 + 32)
        var arr = data.list[0].dt_txt.split(" ");
        return celsius + ' C ' + ' / ' + fahrenheit + ' F' +
            ' at ' + arr[1] + ' on ' + new Date(arr[0]).formatDDMMYYYY();
    }

    createObj(data) {
        var weatherForecast = {
            id: this.index,
            cityName: 'Weather in ' + data.city.name,
            WeatherDetails: this.formatWeatherDetails(data),
            comments: []
        }
        this.index++;
        return weatherForecast;
    }

    createRowsObj(data) {
        for (var i = 0; i < data.list.length; i++) {
            var rowObj = {
                dt: data.list[0].dt_txt,
                temp: parseFloat((data.list[0].main.temp - 273.15)).toFixed(2),
                tempMin: parseFloat((data.list[0].main.temp_min - 273.15)).toFixed(2) + ' C ',
                tempMax: parseFloat((data.list[0].main.temp_max - 273.15)).toFixed(2) + ' C ',
                pressure: data.list[0].main.pressure + ' hpa',
                humidity: data.list[0].main.humidity + ' %',
                speed: data.list[0].wind.speed + ' m/s',
                direction: data.list[0].wind.deg
            }
            this.weatherList.push(rowObj);
        }
        return this.weatherList;
    }
}

export default UtilityFunction