const FeedbackModel = require('./feedbackModel');

class FeedbackService {
    static async getFeedbacksByFacilityId(facilityId) {
        try {
            const feedbacks = await FeedbackModel.getFeedbacksByFacilityId(facilityId);
            if (feedbacks) {
                return { success: true, data: feedbacks };
            } else {
                return { success: false, message: "Không tìm thấy phản hồi cho cơ sở dịch vụ này." };
            }
        } catch (error) {
            console.error("Error in FeedbackService.getFeedbacksByFacilityId:", error.message);
            throw error;
        }
    }
}

module.exports = FeedbackService;
