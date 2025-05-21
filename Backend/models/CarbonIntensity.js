const mongoose = require('mongoose');

const carbonSchema = new mongoose.Schema({
    zone: String,
    value: Number,
    unit: String,
    datetime: Date,
    updatedAt: Date,
    isEstimated: Boolean,
    emissionFactorType: String,
    estimationMethod: String
});

module.exports = mongoose.model('CarbonIntensity', carbonSchema);
