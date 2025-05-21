const express = require('express');
const router = express.Router();
const CarbonIntensity = require('../models/CarbonIntensity');

router.get('/', async (req, res) => {
    try {
        const data = await CarbonIntensity.find().sort({ datetime: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
});

module.exports = router;
