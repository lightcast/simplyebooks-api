const moment = require('moment');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const {User} = require('../models');
const {requiredFields} = require('../utilities');

const resetPassword = (req, res) => {
  const requiredFieldsArry = ['password'];

  let fields = requiredFields(requiredFieldsArry, req.body);
  console.log(fields);
  if(fields.message !== null){
    return res.status(400).send(fields.message);
  }

  const userId = req.params.UserId;
  const password = req.body.password;
  const _id = mongoose.Types.ObjectId(userId);


  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send("Internal server error");
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.status(500).send("Internal server error");

      User.update({"_id": _id},{$set:{password:hash}}, function(err, user){
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
}

module.exports = {resetPassword};
