const express = require('express');
const router = express.Router();


const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid/v4');
const {loginRequired, createJSONToken} = require('../utilities/auth');


const login = (req, res) => {
  const requiredFields = ['password', 'emailAddress'];
  console.log('login...');
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.status(400).json({
        success: false,
        data: message
      });
    }
  }


  let emailAddress = req.body.emailAddress
  let password = req.body.password

  let userId = req.params.userId;
  let _id = mongoose.Types.ObjectId(userId);

  User.find({emailaddress}, {confirmationUID:0 }, function(err, user){
         if(err || !user){
           console.log(err);
             return res.status(500).json({
                 message: "Internal Server Error2"
             });
         }

         if (user) {
           let hash = user.password;
           // Load hash from your password DB.
           bcrypt.compare(pwd, hash, function(err, val) {

             if (val) {
               delete user.password; // delete the password from the session
               const token = createJSONToken(user).token;
               res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
               res.status(201).json({
                 success: true,
                 data: {token: 'JWT ' + token, UUID: user.UUID, isAdmin: user.isAdmin, isAuthor: user.isAuthor}
               })

             } else {
               res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
               res.status(403).json({
                 success: false,
                 data: "Username and or password is invalid"
               })
             }
           })
         } else {
           res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
           res.status(403).json({
             success: false,
             data: "Username and or password is invalid"
           })
         }
     });
}


module.exports = {login}
