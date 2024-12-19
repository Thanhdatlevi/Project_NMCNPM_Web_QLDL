const express = require('express');
const router = express.Router();
const logoutController = require('../component/logout/logoutController');


router.post('/', logoutController.logoutAccount);


module.exports = router;
