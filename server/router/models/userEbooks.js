const mongoose = require('mongoose');

const UserEbooksSchema = new mongoose.Schema({
    userUUID: { type: String, required: true },
    ebookUUID: { type: String, required: true },
    ebookCode: { type: String, required: true },
    dateCreated: {type: Date, default: Date.now},
});

const UserEbooks = mongoose.model('UserEbooks', UserEbooksSchema);

module.exports = UserEbooks;
