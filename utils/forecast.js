const forecast = (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Unable to connect to weather services!');
            }
            return res.json();
        })
        .then((body) => {
            if (body.error) {
                throw new Error('Unable to find location!');
            }
            return `Today's weather is ${body.weather[0].description}. Current temperature is ${body.main.temp_max}°C out there.`;
        })
        .catch(() => {
            throw new Error('Unable to connect to weather services!');
        });
};

module.exports = forecast;
