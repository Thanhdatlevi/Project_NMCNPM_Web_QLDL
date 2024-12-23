const express = require('express');
const router = express.Router();

const AccountController = require('../component/account/accountController');

router.get('/getPublicProfile', AccountController.getPublicProfile);
router.post('/updateProfile', AccountController.updateProfile);

module.exports = router;