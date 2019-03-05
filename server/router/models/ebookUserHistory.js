const mongoose = require('mongoose');

const UserEbookHistorySchema = new mongoose.Schema({
    userUUID: { type: String, required: true },
    ebookUUID: { type: String, required: true },
    ebookCode: { type: String, required: true },
    chapterUUID: {type: String },
    pageId: {type: String },
    paragraphLastRead: {type: String },
    action: {type: String },
    link: {type: String },
    longitude: {type: String },
    latitude: {type: String },
    ipAddress: {type: String },
    dateCreated: {type: Date, default: Date.now},
});

const UserEbookHistory = mongoose.model('UserEbooks', UserEbookHistorySchema);

module.exports = UserEbookHistory;
