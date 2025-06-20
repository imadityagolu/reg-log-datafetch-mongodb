const express = require("express");
const router = express.Router();

const loginControllers = require('../controllers/login.controllers');

router.get("/api/login", loginControllers.login);

module.exports = router;