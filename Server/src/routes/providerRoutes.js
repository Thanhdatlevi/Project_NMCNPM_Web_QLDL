const express = require('express');
const router = express.Router();
const ProviderController = require('../component/provider/providerController');
const HotelController = require('../component/hol/hotelController');
const RestaurantController = require('../component/restaurant/restaurantController');
const AccountController = require('../component/account/accountController');
const FacilityController = require('../component/facility/facilityController');


router.patch('/api/updateHotel/:hotelId', ProviderController.updateHotel);
router.patch('/api/updateRestaurant/:restaurantId', ProviderController.updateRestaurant);

router.post('/api/requestHotel', ProviderController.requestHotel);
router.post('/api/requestRestaurant', ProviderController.requestRestaurant);
router.get('/getPublicProfile', AccountController.getPublicProfile);
router.post('/updateProfile', AccountController.updateProfile);

router.delete('/deleteFacility', FacilityController.deleteFacility);

router.get('/api/getProfile',)
router.get('/hotel/:holId', HotelController.getHotelById_provider);
router.get('/restaurant/:resId', RestaurantController.getRestaurantById_provider);

module.exports = router;