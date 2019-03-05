const User = require('./users');
const Ebook = require('./ebooks');
const UserEbooks = require('./userEbooks');
const UserEbookHistory = require('./ebookUserHistory');
const EbookTableOfContents = require('./ebookTableOfContents');
const EbookStyles = require('./ebookStyles');
const EbookUserActions = require('./ebookUserActions');
const EbookQuizChoices = require('./ebookQuizChoices');
const EbookQuizUserAnswers = require('./ebookQuizUserAnswers');

module.exports = {User, Ebook, UserEbooks, UserEbookHistory,
  EbookTableOfContents, EbookStyles, EbookQuizChoices,  EbookQuizUserAnswers};
