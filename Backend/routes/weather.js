// routes/weather.js
const express = require('express');
const router = express.Router();
const Weather = require('../models/weather');

router.get('/', async (req, res) => {
    const data = await Weather.find().sort({ timestamp: 1 });
    res.json(data);
});

module.exports = router;
