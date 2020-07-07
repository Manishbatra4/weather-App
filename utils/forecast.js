const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=21c9ae97f01c5cac6d9bbfd9db78c4c8&units=metric";
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather services api!', undefined);
        } else if (body.error) {
            callback('unable to find location!', undefined);
        } else {
            callback(undefined, "Today's weather is " + body.weather[0].description + " Current Temperature is " + body.main.temp_max + " degree out there.");
        }
    });
}

module.exports = forecast;