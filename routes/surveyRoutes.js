const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

//test server
router.get('/api/', surveyController.testApi);

// List all available surveys
router.get('/api/surveys', surveyController.listSurveys);

// Create a new survey
router.post('/api/surveys', surveyController.createSurvey);

//Handle response submission
router.post('/api/responses', surveyController.submitResponse);


// Calculate similarity among responses
router.get('/api/similarity', surveyController.getSimilarity);


module.exports = router;