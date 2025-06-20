const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register.controllers');


// Registration Endpoint
router.post('/api/register', registerController.register);

module.exports = router;