// controllers/surveyController.js
const mongoose = require("mongoose");
const Response = require("../models/responseModel");
const Survey = require("../models/surveyModel");
const calculateSimilarity = require("../functions/CalculateSimilarity");
require("dotenv").config();

const mongoURI = process.env.db;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a reference to the default connection
const db = mongoose.connection;

// Event listeners for the connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

//testAPi
exports.testApi = (req, res) => {
  res.json("Hello, Test Successful");
};

// List all available surveys
exports.listSurveys = async (req, res) => {
  try {
    // Fetch surveys from the database
    const surveys = await Survey.find({});

    res.json(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new survey
exports.createSurvey = async (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions ) { //|| questions.length !== 20
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    // Create a new survey document
    const survey = new Survey({ title, questions });

    // Save the survey to the database
    await survey.save();

    res.status(201).json({ message: "Survey created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Submit a response for a survey from a user
exports.submitResponse = async (req, res) => {
  const { candidateName, answers } = req.body;

  if (!candidateName || !answers) { // || answers.length !== 20
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    // Create a new response document
    const response = new Response({ candidateName, answers });

    // Save the response to the database
    await response.save();

    res.status(201).json({ message: "Response submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSimilarity = async (req, res) => {
  const { candidate, page, perPage, search } = req.query;

  try {
    // Build a query to filter responses based on candidate name and search text
    const query = {};
    if (candidate) {
      query.candidateName = { $regex: new RegExp(candidate, "i") };
    }
    if (search) {
      query.candidateName = { $regex: new RegExp(search, "i") };
    }

    // Fetch responses from the database with pagination and query filters
    const options = {
      skip: (page - 1) * perPage,
      limit: parseInt(perPage),
    };
    const responses = await Response.find(query, {}, options);

    // Calculate similarity for each candidate pair
    const similarityResults = [];
    for (let i = 0; i < responses.length; i++) {
      for (let j = i + 1; j < responses.length; j++) {
        const response1 = responses[i];
        const response2 = responses[j];
        const similarity = calculateSimilarity(response1.answers, response2.answers);
        similarityResults.push({
          candidate1: response1.candidateName,
          candidate2: response2.candidateName,
          similarityPercentage: similarity.toFixed(2), // Rounded to 2 decimal places
        });
      }
    }
    res.json(similarityResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};