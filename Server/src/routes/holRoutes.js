const express = require('express');
const router = express.Router();
const hotelController = require('../hol/holController');

router.get('/holel/3-PopularHol', hotelController.get_3_PopularHotels);

router.get('/:holtelID', hotelController.getHotelByID)

router.get('/hotel/:locationId', hotelController.getHotelsByLocationID);


module.exports = router;
