const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.post('/register', user.register);


module.exports = router;