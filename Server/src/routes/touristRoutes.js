const express = require('express');
const router = express.Router();

const AccountController = require('../component/account/accountController');
const TouristController = require('../component/tourist/touristController');

router.post('/submitFeedback/:facilityId', TouristController.submitFeedback);

router.get('/getReservationHistory', TouristController.getReservationHistory);
router.get('/getPublicProfile', AccountController.getPublicProfile);
router.post('/updateProfile', AccountController.updateProfile);

router.post('/createReservation', TouristController.createReservation);

router.get('/reservehotel/by-tourist', TouristController.getReserveHotelsByTouristId);
router.get('/reserverestaurant/by-tourist', TouristController.getReserveRestaurantByTouristId);

module.exports = router;