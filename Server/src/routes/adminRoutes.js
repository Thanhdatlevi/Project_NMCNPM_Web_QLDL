const express = require('express');
const router = express.Router();
const AdminController = require('../component/admin/adminController');

router.get('/getAllUsers', AdminController.getAllUsers);

module.exports = router