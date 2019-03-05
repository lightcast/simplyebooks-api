const mongoose = require('mongoose');

const EbookQuizUserAnswersSchema = new mongoose.Schema({
    ebookUUID: { type: String, required: true },
    userUUID: { type: String, required: true },
    quizUUID: { type: String },
    quizUserAnswer: { type: String },
    dateCreated: {type: Date, default: Date.now},
    deletedDate: {type: Date}
});

const EbookQuizUserAnswers = mongoose.model('EbookQuizUserAnswers', EbookQuizUserAnswersSchema);

module.exports = EbookQuizUserAnswers;
