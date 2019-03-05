const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true },
    userName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String  },
    password: { type: String, required: true },
    confirmationUID: { type: String },
    dateCreated: {type: Date, default: Date.now},
    isAuthor: {type: Boolean,  require: true, default: false},
    isAdmin: {type: Boolean, require: true,  default: false},
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
