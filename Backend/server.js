const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error(err));

// Ex: API météo
const weatherRoutes = require('./routes/weather');
app.use('/api/weather', weatherRoutes);

const carbonRoutes = require('./routes/carbon');
app.use('/api/carbon', carbonRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
