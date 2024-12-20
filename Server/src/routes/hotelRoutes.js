const express = require('express');
const router = express.Router();
const HotelController = require('../component/hol/hotelController');



router.get('/getFilterhotel', HotelController.getFilterHotel);


router.get('/', HotelController.getHotelByPage);
router.get('/:holId', HotelController.getHotelById_tourist)
router.get('/by-location/:locationId', HotelController.getHotelsByLocationId)
router.get('/by-provider/:providerId', HotelController.getHotelsByProviderId)

router.get('/api/3-PopularHol', HotelController.get_3_PopularHotels);
router.get('/api/getHotelsTotal', HotelController.getHotelsTotal);

router.get('/provider/:holId', HotelController.getHotelById_provider);

module.exports = router;
