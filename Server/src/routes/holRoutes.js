const express = require('express');
const router = express.Router();
const hotelController = require('../hol/holController');

router.get('/getAllHotel', hotelController.getAllHotel);

router.get('/getFilterhotel', hotelController.getFilterHotel);

router.get('/3-PopularHol', hotelController.get_3_PopularHotels);

router.get('/getRelatedhotel/:hotelID', hotelController.getRelatedHotel);

router.get('/gethotelByProviderid/:providerID', hotelController.getHotelByProviderid);

router.get('/by-location/:locationId', hotelController.getHotelsByLocationID);

router.get('/:hotelID', hotelController.getHotelByID)

module.exports = router;
