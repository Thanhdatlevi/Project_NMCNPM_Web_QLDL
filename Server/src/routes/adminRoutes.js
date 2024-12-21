const express = require('express');
const router = express.Router();
const AdminController = require('../component/admin/adminController');
const AccountController = require('../component/account/accountController');
const FacilityController = require('../component/facility/facilityController');

router.get('/getAllUsers', AdminController.getAllUsers);
router.get('/getAllocationsNum', AdminController.getAllocationsNum);
router.get('/getFacilitiesNum', AdminController.getFacilitiesNum);
router.get('/getUsersNum', AdminController.getUsersNum);
router.get('/getPublicProfile', AccountController.getPublicProfile);

router.delete('/deleteuser', AdminController.deleteAccount);
router.delete('/deleteFacility', FacilityController.deleteFacility);
module.exports = router
