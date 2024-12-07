const express = require('express');
const router = express.Router();
const ReservationController = require('../reservation/reservationController');

// Lấy thông tin đơn đặt hàng theo tourist_id và provider_id
router.get('/reservation/:touristID/:providerID', ReservationController.getReservationByTouristAndProvider);

// Lấy tất cả đơn đặt hàng của tourist
router.get('/reservations/tourist/:touristID', ReservationController.getAllReservationsByTourist);

// Lấy tất cả đơn đặt hàng của provider
router.get('/reservations/provider/:providerID', ReservationController.getAllReservationsByProvider);

module.exports = router;
