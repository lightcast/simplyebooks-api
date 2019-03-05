const express = require('express');
const router = express.Router();

const {createJSONToken} = require('../utilities/auth');
const {sendEmail} = require('../utilities/emailer');
const {requiredFields} = require('../utilities');
const {User} = require('../models');

const bcrypt = require('bcryptjs');
const Promise = require('promise');

const verifyUserCount = (userName) => {
   return new Promise(function(resolve, reject) {
    User.count({"userName": userName}, function(err, count){
        if(err)reject(err);
        resolve(count);
    });
  });
}


const register = (req, res) => {
  const requiredFieldsArry = ["emailAddress", "password"];

  let fields = requiredFields(requiredFieldsArry, req.body);
  console.log(fields);
  if(fields.message !== null){
    return res.status(400).send(fields.message);
  }

  let emailAddress = req.body.emailAddress;
  let password = req.body.password;
  let firstName = req.body.firstName ? req.body.firstName : '';
  let lastName = req.body.lastName ? req.body.lastName : '';
  let userName = req.body.userName ? req.body.userName: req.body.emailAddress;

  verifyUserCount(userName).then((results)=>{
    console.log(results);
    if(results > 0){
      return res.status(200).json({
        success: false,
        data: "There's already a user registered with that email address."
      })
    }else{
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(401).json({
            success: false,
            data: "Internal server error"
          })
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return res.status(401).json({
              success: false,
              data: "Internal server erro1r"
            })
          }

          User.create({
                 emailAddress,
                 userName,
                 password: hash,
                 firstName,
                 lastName
             }, function(err, user){
                 if(err || !user){
                   console.log(err);
                     return res.status(500).json({
                         message: "Internal Server Error2"
                     });
                 }

                const token = createJSONToken(user).token;
                return res.status(201).json({
                  success: true,
                  data: {token: 'JWT ' + token, 'UUID': user._id}
                });

             });

        })
      })

    }
  })
}

module.exports = {
  register
}
