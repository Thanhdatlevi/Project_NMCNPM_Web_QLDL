const express = require('express');
const router = express.Router();

const AccountController = require('../component/account/accountController');
const TouristController = require('../component/tourist/touristController');

router.get('/getReservationHistory', TouristController.getReservationHistory);
router.get('/getPublicProfile', AccountController.getPublicProfile);

router.post('/createReservation', TouristController.createReservation);


module.exports = router;