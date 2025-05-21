const axios = require('axios');

async function getWeatherData(city) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        throw new Error("❌ Clé API OpenWeather manquante. Vérifie ton fichier .env");
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await axios.get(url);
        const data = res.data;

        return {
            temperature: data.main.temp,
            windSpeed: data.wind.speed,
            lightIntensity: data.clouds.all, // approximation
            location: data.name,
            timestamp: new Date()
        };
    } catch (err) {
        console.error(`❌ Erreur lors de la récupération des données météo pour ${city} :`, err.response?.data || err.message);
        throw err;
    }
}

module.exports = getWeatherData;
