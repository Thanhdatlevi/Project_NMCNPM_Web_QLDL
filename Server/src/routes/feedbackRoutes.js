const express = require('express');
const router = express.Router();
const FeedbackController = require('../feedback/feedbackController')

// // POST /feedback: Nhận feedback từ frontend và gọi controller xử lý
// router.post('/', feedbackController.submitFeedback);

// // GET /feedbacks: Lấy tất cả feedbacks
// router.get('/', feedbackController.getAllFeedbacks);

// // GET /feedback/:id: Lấy feedback theo ID
// router.get('/:id', feedbackController.getFeedbackByID);

// // GET /feedback/tourist/:tourist_id: Lấy feedback theo tourist_id
// router.get('/tourist/:tourist_id', feedbackController.getFeedbackByTouristID);

// // GET /feedback/facility/:facility_id: Lấy feedback theo facility_id
// router.get('/facility/:facility_id', feedbackController.getFeedbackByFacilityId);

// // GET /feedback/rate/higher/:rate: Lấy feedback có rate lớn hơn giá trị
// router.get('/rate/higher/:rate', feedbackController.getFeedbackByHigherRate);

// // GET /feedback/rate/lower/:rate: Lấy feedback có rate nhỏ hơn giá trị
// router.get('/rate/lower/:rate', feedbackController.getFeedbackByLowerRate);

// // GET /feedback/rate/higher-equal/:rate: Lấy feedback có rate lớn hơn hoặc bằng giá trị
// router.get('/rate/higher-equal/:rate', feedbackController.getFeedbackByHigherEqualRate);

// // GET /feedback/rate/lower-equal/:rate: Lấy feedback có rate nhỏ hơn hoặc bằng giá trị
// router.get('/rate/lower-equal/:rate', feedbackController.getFeedbackByLowerEqualRate);

// // DELETE /feedback/:id: Xóa feedback theo id
// router.delete('/:id', feedbackController.deleteFeedback);

router.get('/getFeedBackByFaciltyId/:facilityId', FeedbackController.getFeedbacksByFacilityId);

module.exports = router;
