const express = require('express');
const bodyParser = require('body-parser');
const surveyRoutes = require('./routes/surveyRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


// Use survey routes
app.use('/', surveyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

