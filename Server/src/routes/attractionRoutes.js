// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const AttractionController = require('../component/attraction/attractionController');

router.get('/getFilterattraction', AttractionController.getFilterAttraction);
router.get('/', AttractionController.getAttractionsByPage);
router.get('/api/getAttractionsTotal', AttractionController.getAttractionsTotal);
router.get('/_10PopularAttraction', AttractionController.get_10_PopularAttractions);
router.get('/by-location/:locationId', AttractionController.getAttractionsByLocationId);
router.get('/:attractionId', AttractionController.getAttractionById);

module.exports = router;