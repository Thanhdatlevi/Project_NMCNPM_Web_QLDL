const express = require('express');
const router = express.Router();

const AccountController = require('../component/account/accountController');

router.get('/getPublicProfile', AccountController.getPublicProfile);

module.exports = router;