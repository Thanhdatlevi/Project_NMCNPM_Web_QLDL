const express = require('express');
const router = express.Router();
const RegisterController = require('../component/register/registerController');


// Route đăng ký người dùng
router.post('/api/postRegister', RegisterController.registerAccount);

module.exports = router;
