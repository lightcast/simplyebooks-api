const express = require('express');
const router = express.Router();

const {getUserProfile,updateUserProfile} = require('./users');
const {resetPassword} = require('./resetPassword');

router.put('/profile/:userId', updateUserProfile);
router.put('/profile/resetPassword/:userId', resetPassword);
router.get('/profile/:userId', getUserProfile);


module.exports = router;
