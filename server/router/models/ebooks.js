 var mongoose = require('mongoose');

 var EbookSchema = new mongoose.Schema({
     authorUUID: { type: String, required: true },
     ebookTitle: { type: String, required: true },
     coverImg: { type: String },
     coverImage: { type: String },
     backCoverImg: { type: String  },
     css: { type: String },
     dateCreated: {type: Date, default: Date.now},
     deletedDate: {type: Date}
 });

 var Ebook = mongoose.model('Ebook', EbookSchema);

 module.exports = Ebook;
