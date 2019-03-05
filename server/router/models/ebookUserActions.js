const mongoose = require('mongoose');

const EbookUserActionsSchema = new mongoose.Schema({
    actionID: { type: Number},
    action: { type: String },
    dateCreated: {type: Date, default: Date.now},
});

const EbookUserActions = mongoose.model('EbookUserActions', EbookUserActionsSchema);

module.exports = EbookUserActions;
