const {User} = require('../models');
const moment = require('moment');
const mongoose = require('mongoose');

const Promise = require('promise');

const getUserProfile = (req, res) =>{
  let userId = req.params.userId;
  let _id = mongoose.Types.ObjectId(userId);

  User.find({"_id": _id}, {password:0, confirmationUID:0 }, function(err, user){
         if(err || !user){
           console.log(err);
             return res.status(500).json({
                 message: "Internal Server Error2"
             });
         }
        return res.status(201).json(user);
     });
}



const updateUserProfile = (req, res) => {
    let userId = req.params.userUUID;
    let fullName = req.body.fullName;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailAddress = req.body.emailAddress;
    let isAdmin = req.body.isAdmin;
    let isAuthor = req.body.isAuthor;

    let _id = mongoose.Types.ObjectId(userId);

    User.update({"_id": _id},{$set:
      {fullName, firstName, lastName, emailAddress, isAdmin, isAuthor}}, function(err, user){
        if(err || !user){
          console.log(err);
            return res.status(500).json({
                message: "Internal Server Error2"
            });
        }
       return res.status(201).json(user);
     });
}

module.exports = {getUserProfile, updateUserProfile};
