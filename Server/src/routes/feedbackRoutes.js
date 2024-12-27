const express = require('express');
const router = express.Router();
const FeedbackController = require('../component/feedback/feedbackController')

router.get('/getFeedBackByFaciltyId/:facilityId', FeedbackController.getFeedbacksByFacilityId);

module.exports = router;
