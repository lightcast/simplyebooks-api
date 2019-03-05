const mongoose = require('mongoose');

const AnnotationsSchema = new mongoose.Schema({
    userUUID: { type: String, required: true },
    ebookUUID: { type: String, required: true },
    notes: { type: String, required: true },
    chapterUUID: {type: String },
    page: {type: String },
    highlightedTextBegin: {type: String },
    highlightedText: {type: String },
    highlightedTime: {type: String },
    highlightedColor: {type: String default: 'highlight-yellow'},
    highlightedTextEntirePargraph: {type: String },
    bookmark: {type: String },
    dateCreated: {type: Date, default: Date.now},
});

const Annotations = mongoose.model('Annotations', AnnotationsSchema);

module.exports = Annotations;
