const express = require('express');
const router = express.Router();
const HotelController = require('../component/hol/hotelController');


router.get('/getFilterhotel', HotelController.getFilterHotel);
router.get('/getRelatedhotel/:hotelID', HotelController.getRelatedHotel);

router.get('/', HotelController.getHotelByPage);
router.get('/:holId', HotelController.getHotelById_tourist)
router.get('/by-location/:locationId', HotelController.getHotelsByLocationId)

router.get('/api/3-PopularHol', HotelController.get_3_PopularHotels);
router.get('/api/getHotelsTotal', HotelController.getHotelsTotal);


module.exports = router;
