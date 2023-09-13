function calculateSimilarity(answers1, answers2) {
  let matchingAnswers = 0;
  let totalQuestions = 0;

  for (let i = 0; i < answers1.length; i++) {
    // Check if both candidates have answered the question
    if (answers1[i] !== undefined && answers2[i] !== undefined) {
      totalQuestions++;
      if (answers1[i] === answers2[i]) {
        matchingAnswers++;
      }
    }
  }

  if (totalQuestions === 0) {
    return 0; // No matching questions, consider them as dissimilar
  }

  // Calculate similarity as a percentage
  const similarityPercentage = (matchingAnswers / totalQuestions) * 100;
  return similarityPercentage;
}

module.exports = calculateSimilarity;
