const express = require('express');
const router = express.Router();
const LocationController = require('../component/location/locationController');

// Route lấy tất cả các địa điểm
router.get('/allLocation', LocationController.getAllLocations);

module.exports = router;
