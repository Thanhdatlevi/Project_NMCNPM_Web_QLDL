const express = require('express');
const router = express.Router();
const userController = require('../user/userController');

// Route đăng ký người dùng
router.get('/:userId', userController.getPersonalInf);
// router.get('/users/:userId/bookings', userController.getBookingHistory);

module.exports = router;