const express = require('express');
const router = express.Router();
const RestaurantController = require('../res/resController');

// router.get('/tours/:location_name', tourController.getToursByLocation);
router.get('/res', RestaurantController.getPopularRestaurants);
// router.get('/tour_detail/:tour_id', tourController.getTourByID);

module.exports = router;
