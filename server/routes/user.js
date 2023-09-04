const express = require('express');


//controller
const { signupUser, loginUser } = require('../controllers/userController');
const { sign } = require('jsonwebtoken');

const router = express.Router();

//login
router.post('/login', loginUser)

//signup
router.post('/signup', signupUser)

module.exports = router;