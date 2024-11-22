const express = require('express');
const router = express.Router();
const hotelController = require('../hol/holController');

router.get('/3-PopularHol', hotelController.get_3_PopularHotels);

router.get('/:hotelID', hotelController.getHotelByID)

router.get('/by-location/:locationId', hotelController.getHotelsByLocationID);


module.exports = router;
