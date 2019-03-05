const mongoose = require('mongoose');

const EbookTableOfContentsSchema = new mongoose.Schema({
    ebookUUID: { type: String, required: true },
    chapterUUID: {type: String },
    chapterTitle: {type: String },
    chapterOrderID: {type: String },
    chapterLink: {type: String },
    dateCreated: {type: Date, default: Date.now},
});

const EbookTableOfContents = mongoose.model('UserEbooks', EbookTableOfContentsSchema);

module.exports = EbookTableOfContents;
