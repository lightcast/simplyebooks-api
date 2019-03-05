const mongoose = require('mongoose');

const EbookStylesSchema = new mongoose.Schema({
    ebookUUID: { type: String, required: true },
    styles: { type: String },
    dateCreated: {type: Date, default: Date.now},
});

const EbookStyles = mongoose.model('EbookStyles', EbookStylesSchema);

module.exports = EbookStyles;
