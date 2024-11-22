const express = require('express');
const router = express.Router();
const restaurantController = require('../res/resController');

// router.get('/tours/:location_name', tourController.getToursByLocation);
router.get('/res/3-PopularRes', restaurantController.get_3_PopularRestaurants);
// router.get('/tour_detail/:tour_id', tourController.getTourByID);
router.get('/:resID', restaurantController.getRestaurantByID)

router.get('/res/:locationId', restaurantController.getRestaurantsByLocationID)

module.exports = router;
