const express = require('express');
const router = express.Router();
const ProviderController = require('../component/provider/providerController');
const AccountController = require('../component/account/accountController');


router.patch('/api/updateHotel/:hotelId', ProviderController.updateHotel);
router.patch('/api/updateRestaurant/:restaurantId', ProviderController.updateRestaurant);

router.post('/api/requestHotel', ProviderController.requestHotel);
router.post('/api/requestRestaurant', ProviderController.requestRestaurant);

router.delete('/deleteFacility', ProviderController.deleteFacility);

router.get('/hotel/by-provider', ProviderController.getHotelsByProviderId);
router.get('/restaurant/by-provider', ProviderController.getRestaurantByProviderId);

router.get('/hotel/:holId', ProviderController.getHotelById_provider);
router.get('/restaurant/:resId', ProviderController.getRestaurantById_provider);

router.get('/getPublicProfile', AccountController.getPublicProfile);

module.exports = router;