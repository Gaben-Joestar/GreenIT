const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    pressure: Number,
    windSpeed: Number,
    windDirection: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Weather', weatherSchema);
