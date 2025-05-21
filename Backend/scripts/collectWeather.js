// collectWeather.js
console.log('✅ Script collectWeather.js lancé');

const cron = require('node-cron');
const mongoose = require('mongoose');
const Weather = require('../models/weather');
const getWeatherData = require('../services/weatherService');

// Clés en dur (à usage local uniquement)
const MONGO_URI = 'mongodb://localhost:27017/greenit';
const OPENWEATHER_API_KEY = '885a71aeec8641a53909400f0281f05f';

// Injection de la clé API dans process.env pour que weatherService la récupère
process.env.OPENWEATHER_API_KEY = OPENWEATHER_API_KEY;

// Connexion à MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connexion à MongoDB réussie');
}).catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
});

// Tâche planifiée toutes les 30 secondes
cron.schedule('*/30 * * * * *', async () => {
    try {
        const data = await getWeatherData('Paris');
        await new Weather(data).save();
        console.log("🌦️ Nouvelle donnée météo enregistrée à", new Date().toLocaleTimeString());
    } catch (error) {
        console.error('❌ Erreur lors de la collecte ou de l’enregistrement des données météo :', error.message || error);
    }
});
