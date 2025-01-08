// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const AttractionController = require('../component/attraction/attractionController');

router.get('/getFilterattraction', AttractionController.getFilterAttraction);
router.get('/getRelatedattraction/:attractionID', AttractionController.getRelatedAttraction);
router.get('/_10PopularAttraction', AttractionController.get_10_PopularAttractions);

router.get('/', AttractionController.getAttractionsByPage);
router.get('/:attractionId', AttractionController.getAttractionById);

router.get('/api/getAttractionsTotal', AttractionController.getAttractionsTotal);
router.get('/by-location/:locationId', AttractionController.getAttractionsByLocationId);



module.exports = router;