const express = require('express');
const router = express.Router();
const locationController = require('../location/locationController');

// Route lấy tất cả các địa điểm
router.get('/allLocation', locationController.getAllLocations);

module.exports = router;
