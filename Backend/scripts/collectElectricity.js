require('dotenv').config();
const mongoose = require('mongoose');
const { getCarbonIntensity } = require('../services/electricityService');
const CarbonIntensity = require('../models/CarbonIntensity');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Mongo connecté'))
    .catch(err => console.error('❌ Erreur MongoDB :', err));

(async () => {
    try {
        const data = await getCarbonIntensity('FR');
        if (!data || !data.carbonIntensity) {
            console.log('❌ Donnée carbone manquante ou malformée :', data);
            return;
        }

        const doc = new CarbonIntensity({
            zone: data.zone,
            value: data.carbonIntensity, // 👈 direct
            unit: 'gCO2eq/kWh',
            datetime: new Date(data.datetime),
            updatedAt: new Date(data.updatedAt),
            isEstimated: data.isEstimated,
            emissionFactorType: data.emissionFactorType,
            estimationMethod: data.estimationMethod
        });


        await doc.save();
        console.log('✅ Donnée carbone enregistrée :', doc);
    } catch (err) {
        console.error('❌ Erreur :', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
