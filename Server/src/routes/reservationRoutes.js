const express = require('express');
const router = express.Router();
const ReservationController = require('../component/reservation/reservationController');

router.post('/', ReservationController.createReservation);

module.exports = router;