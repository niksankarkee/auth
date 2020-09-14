const express = require('express');
const router = express.Router();
const { register } = require('../controllers/UserControllers');
const { UserValidator } = require('../validaotrs/validator');

router.post('/register', UserValidator, register);

module.exports = router;