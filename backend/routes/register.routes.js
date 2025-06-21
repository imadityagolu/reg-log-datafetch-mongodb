const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register.controllers');
const loginControllers = require('../controllers/login.controllers');


// Registration Endpoint
router.post('/api/register', registerController.register);
router.post('/api/login', loginControllers.login);

module.exports = router;