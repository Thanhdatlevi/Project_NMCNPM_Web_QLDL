// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const AttractionController = require('../attraction/attractionController');

router.get('/getAllAttraction', AttractionController.getAllAttraction);

router.get('/getFilterattraction', AttractionController.getFilterAttraction);

// Route đăng ký người dùng
router.get('/_10PopularAttraction', AttractionController.get_10_PopularAttractions);
module.exports = router;