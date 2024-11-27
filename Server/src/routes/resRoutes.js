const express = require('express');
const router = express.Router();
const restaurantController = require('../res/resController');

router.get('/getAllres', restaurantController.getAllRes);

router.get('/getFilterres', restaurantController.getFilterRes);
// router.get('/tours/:location_name', tourController.getToursByLocation);
router.get('/3-PopularRes', restaurantController.get_3_PopularRestaurants);

router.get('/getRelatedres/:resID', restaurantController.getRelatedRes);

router.get('/:resID', restaurantController.getRestaurantByID)

router.get('/by-location/:locationId', restaurantController.getRestaurantsByLocationID)

module.exports = router;
