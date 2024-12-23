const express = require('express');
const router = express.Router();
const AdminController = require('../component/admin/adminController');
const AccountController = require('../component/account/accountController');

router.get('/getAllUsers', AdminController.getAllUsers);
router.get('/getAllocationsNum', AdminController.getAllocationsNum);
router.get('/getFacilitiesNum', AdminController.getFacilitiesNum);
router.get('/getUsersNum', AdminController.getUsersNum);

router.post('/addAttractions', AdminController.addAttractions)
router.post('/updateAttractions/:attractionID', AdminController.updateAttractions)
router.post('/deleteAttractions/:attractionID', AdminController.deleteAttractions)

router.delete('/deleteuser', AdminController.deleteAccount);
router.delete('/deleteFacility', AdminController.deleteFacility);

router.get('/getPublicProfile', AccountController.getPublicProfile);

module.exports = router
