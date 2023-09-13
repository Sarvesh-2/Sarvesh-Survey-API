// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for a candidate response
const responseSchema = new mongoose.Schema({
  candidateName: String,
  answers: [String],
});

// Create a model from the schema
const Response = mongoose.model('Response', responseSchema);

// Export the model
module.exports = Response;
