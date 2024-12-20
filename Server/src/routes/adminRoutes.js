const express = require('express');
const router = express.Router();
const AdminController = require('../component/admin/adminController');

router.get('/getAllUsers', AdminController.getAllUsers);
router.get('/getAllocationsNum', AdminController.getAllocationsNum);
router.get('/getFacilitiesNum', AdminController.getFacilitiesNum);
router.get('/getUsersNum', AdminController.getUsersNum);
router.delete('/deleteuser', AdminController.deleteAccount);
module.exports = router