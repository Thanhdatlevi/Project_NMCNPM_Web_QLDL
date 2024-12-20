// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const AttractionController = require('../component/attraction/attractionController');

router.get('/getFilterattraction', AttractionController.getFilterAttraction);

router.post('/addAttractions', AttractionController.addAttractions)

router.post('/updateAttractions/:attractionID', AttractionController.updateAttractions)

router.post('/deleteAttractions/:attractionID', AttractionController.deleteAttractions)
router.get('/', AttractionController.getAttractionsByPage);
router.get('/api/getAttractionsTotal', AttractionController.getAttractionsTotal);
router.get('/_10PopularAttraction', AttractionController.get_10_PopularAttractions);
router.get('/by-locationId/:locationId', AttractionController.getAttractionsByLocationId);
router.get('/:attractionId', AttractionController.getAttractionById);

module.exports = router;