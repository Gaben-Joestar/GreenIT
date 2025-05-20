// collectWeather.js
const cron = require('node-cron');
const Weather = require('./models/Weather');
const getWeatherData = require('./services/weatherService');

cron.schedule('*/30 * * * *', async () => {
    const data = await getWeatherData('Paris');
    await new Weather(data).save();
    console.log("Nouvelle donnée météo enregistrée");
});
