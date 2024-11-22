// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const AttractionController = require('../attraction/attractionController');

// Route đăng ký người dùng
router.get('/attraction', AttractionController.get_10_PopularAttractions);

module.exports = router;
