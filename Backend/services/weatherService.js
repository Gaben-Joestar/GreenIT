// services/weatherService.js
const axios = require('axios');

async function getWeatherData(city) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await axios.get(url);
    const data = res.data;

    return {
        temperature: data.main.temp,
        windSpeed: data.wind.speed,
        lightIntensity: data.clouds.all, // approximation
        location: data.name
    };
}

module.exports = getWeatherData;
