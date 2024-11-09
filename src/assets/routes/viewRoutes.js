const express = require('express');
const router = express.Router();
const hotelController = require('../modules/hotel/hotelController');
const restaurantController = require('../modules/restaurant/restaurantController');
const attractionController = require('../modules/attraction/attractionController');

router.get('/PopularHotels', hotelController.getPopularHotels);
router.get('/PopularRestaurants', restaurantController.getPopularRestaurants);
router.get('/PopularAttractions', attractionController.getPopularAttractions);

