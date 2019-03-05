const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid/v4');
const moment = require('moment');
const {requiredFields} = require('../utilities');
const {sendEmail} = require('../utilities/emailer');
let Promise = require('promise');


const updateConfimrationUID = (emailAddress) => {
  let confirmationUID = uuidV4();
  User.update({emailAddress},{$set: {confirmationUID}}, function(err, user){
      if(err || !user){
        console.log(err);
          return res.status(500).json({
              message: "Internal Server Error2"
          });
      }
     return res.status(201).json(user);
   });
}


const forgotPassword = (req, res) => {
    const requiredFieldsArry = ['emailAddress'];

    let fields = requiredFields(requiredFieldsArry, req.body);
    console.log(fields);
    if(fields.message !== null){
      return res.status(400).send(fields.message);
    }

    let emailAddress = req.body.emailAddress;
    let server = 'https://simplybooks.org';
    let subject = "Reset Password for simplybooks.org";


    User.count({"emailAddress": emailAddress}, {password:0, confirmationUID:0 }, function(err, count){
           if(err || !count){
             console.log(err);
               return res.status(500).json({
                   message: "Internal Server Error2"
               });
           }

           if (count > 0) {
             let to = emailAddress;
             let from = "zetsway@gmail.com";

             let confirmationUID = uuidV4();
             let url = server + "/resetPassword?q=" + confirmationUID;
             let html = `<p>Please click on the following link to reset your password:
             <a href=${url}>Click Here</a></p>`;

             updateConfimrationUID(emailAddress);

             sendEmail(from, to, subject, html);

          return res.status(201).json({
            success: true,
            data: "An email was sent to reset your password."
          });
        }
    });
}

const confirmResetPassword = (req, res) => {

    const requiredFieldsArry = ['password'];
    let fields = requiredFields(requiredFieldsArry, req.body);
    console.log(fields);
    if(fields.message !== null){
      return res.status(400).send(fields.message);
    }

    let confirmationUID = req.params.uid;
    let password = req.body.password;

    User.count({confirmationUID}, function(err, count){
           if(err || !count){
             console.log(err);
               return res.status(500).json({
                   message: "There was a problem tryign to reset your password"
               });
           }

           bcrypt.genSalt(10, (err, salt) => {
             if (err) return res.status(500).send("Internal server error");
             bcrypt.hash(password, salt, (err, hash) => {
               if (err) return res.status(500).send("Internal server error");
               User.update({confirmationUID},{$set:{password:hash, confirmationUID: ''}}, function(err, user){
                   if(err || !user){
                     console.log(err);
                     //"There was an error trying to update your password."
                       return res.status(500).json({
                           message: "Internal Server Error2"
                       });
                   }
                  return res.status(201).json(user);
                  //"Your password has been reset"
                });
             });
           });
  })
}

module.exports = {confirmResetPassword, forgotPassword}
