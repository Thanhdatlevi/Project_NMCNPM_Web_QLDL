const express = require('express');
const router = express.Router();
const HotelController = require('../hol/holController');

// router.get('/tours/:location_name', tourController.getToursByLocation);
router.get('/hol', HotelController.getPopularHotels);
// router.get('/tour_detail/:tour_id', tourController.getTourByID);

module.exports = router;
