const express = require('express');
const router = express.Router();

const AccountController = require('../component/account/accountController');
const ReservationController = require('../component/reservation/reservationController');

router.get('/getPublicProfile', AccountController.getPublicProfile);
router.post('/createReservation', ReservationController.createReservation);
module.exports = router;