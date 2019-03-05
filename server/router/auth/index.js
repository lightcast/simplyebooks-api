const express = require('express');
const router = express.Router();

const {login} = require('./login');
const {register} = require('./register');
const {forgotPassword, confirmResetPassword} = require('./forgotPassword');

router.post('/register', register);
router.post('/login',login);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword/confirmPassword/:uid', confirmResetPassword);

module.exports = router;
