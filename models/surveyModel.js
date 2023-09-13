// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
});

// Define the schema for a survey
const surveySchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
});

// Create a model from the schema
const Survey = mongoose.model('Survey', surveySchema);

// Export the model
module.exports = Survey;
