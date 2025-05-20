// models/Weather.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    temperature: Number,
    windSpeed: Number,
    lightIntensity: Number,
    location: String
});

module.exports = mongoose.model('Weather', weatherSchema);
