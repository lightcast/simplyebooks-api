const mongoose = require('mongoose');

const EbookQuizSchema = new mongoose.Schema({
      ebookUUID: { type: String, required: true },
      quizQuestion: { type: String, required: true },
      quizAnswer: { type: String },
      quizAnswerText: { type: String },
      dateCreated: {type: Date, default: Date.now},
      deletedDate: {type: Date}
});

const EbookQuiz = mongoose.model('EbookQuiz', EbookQuizSchema);

module.exports = EbookQuiz;
