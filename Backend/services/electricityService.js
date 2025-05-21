const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const BASE_URL = 'https://api.electricitymap.org/v3';

const getCarbonIntensity = async (zone = 'FR') => {
    try {
        const res = await axios.get(`${BASE_URL}/carbon-intensity/latest`, {
            headers: {
                'auth-token': process.env.ELECTRICITYMAP_API_KEY
            },
            params: { zone }
        });

        return res.data;
    } catch (err) {
        console.error('❌ Erreur ElectricityMap :', err.message);
        return null;
    }
};

module.exports = {
    getCarbonIntensity
};
