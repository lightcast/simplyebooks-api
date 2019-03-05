const mongoose = require('mongoose');

const EbookQuizChoicesSchema = new mongoose.Schema({
    quizUUID: { type: String, required: true },
    quizChoiceOrder: { type: String, required: true },
    quizChoice: { type: String },
    dateCreated: {type: Date, default: Date.now},
    deletedDate: {type: Date}
});

const EbookQuizChoices = mongoose.model('EbookQuizChoices', EbookQuizChoicesSchema);

module.exports = EbookQuizChoices;
