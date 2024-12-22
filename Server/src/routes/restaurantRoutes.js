const express = require('express');
const router = express.Router();
const RestaurantController = require('../component/restaurant/restaurantController');

router.get('/', RestaurantController.getRestaurantByPage);
//resId: restaurantId
router.get('/getFilterrestaurant', RestaurantController.getFilterRes);
router.get('/getRelatedrestaurant/:resID', RestaurantController.getRelatedRes);


router.get('/by-location/:locationId', RestaurantController.getRestaurantsByLocationId)
router.get('/by-provider/:providerId', RestaurantController.getRestaurantByProviderId)
router.get('/api/3-PopularRes', RestaurantController.get_3_PopularRestaurants);
router.get('/api/getRestaurantsTotal', RestaurantController.getRestaurantsTotal)
router.get('/:resId', RestaurantController.getRestaurantById_tourist)


module.exports = router;
