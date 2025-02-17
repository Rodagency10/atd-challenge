require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const cron = require('node-cron');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: 'http://localhost:5500', // Remplacez par l'origine de votre front-end
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);

const requestController = require('./controllers/requestController');
cron.schedule('0 0 * * *', requestController.sendReminders);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 

