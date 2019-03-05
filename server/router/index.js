const express = require('express');
const router = express.Router();
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');


const auth = require('./auth');
const user = require('./users');

router.use('/api/auth', auth);
router.use('/api/user', user);

router.get('/', (req, res) =>{
    res.send('hello world');
})






module.exports = router;
