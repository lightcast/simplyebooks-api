var mongoose = require('mongoose');

var EbookCodeSchema = new mongoose.Schema({
    ebookCode: { type: String, required: true },
    ebookTitle: { type: String, required: true },
    expirationDate: { type: String },
    dateCreated: {type: Date, default: Date.now},
    deletedDate: {type: Date}
});

var EbookCode = mongoose.model('EbookCode', EbookCodeSchema);

module.exports = EbookCode;
