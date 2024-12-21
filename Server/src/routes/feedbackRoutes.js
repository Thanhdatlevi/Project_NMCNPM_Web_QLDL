const express = require('express');
const router = express.Router();
const feedbackController = require('../feedback/feedbackController')

//Nhận feedback từ frontend và gọi controller xử lý
router.post('/', feedbackController.submitFeedback);

//Lấy tất cả feedbacks
router.get('/', feedbackController.getAllFeedbacks);

//Lấy feedback theo ID
router.get('/:id', feedbackController.getFeedbackByID);

//Lấy feedback theo tourist_id
router.get('/tourist/:tourist_id', feedbackController.getFeedbackByTouristID);

//Lấy feedback theo facility_id
router.get('/facility/:facility_id', feedbackController.getFeedbackByFacilityId);

//Lấy feedback có rate lớn hơn giá trị
router.get('/rate/higher/:rate', feedbackController.getFeedbackByHigherRate);

//Lấy feedback có rate nhỏ hơn giá trị
router.get('/rate/lower/:rate', feedbackController.getFeedbackByLowerRate);

//Lấy feedback có rate lớn hơn hoặc bằng giá trị
router.get('/rate/higher-equal/:rate', feedbackController.getFeedbackByHigherEqualRate);

//Lấy feedback có rate nhỏ hơn hoặc bằng giá trị
router.get('/rate/lower-equal/:rate', feedbackController.getFeedbackByLowerEqualRate);

//Xóa feedback theo id
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
