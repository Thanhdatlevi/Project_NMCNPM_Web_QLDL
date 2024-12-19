const express = require('express');
const router = express.Router();
const VerifyController = require('../component/verify/verifyController'); // Nhập controller

// Route để xác minh tài khoản
router.get('/:token', VerifyController.verifyAccount);

module.exports = router;
