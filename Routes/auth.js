const express = require('express');
const router = express.Router();

const { login, register } = require('../Controllers/auth');


// router.route('/register').post( register)
// router.route('/login').post( register)
//Both are same
router.post('/register', register)
router.post('/login', login)

module.exports = router