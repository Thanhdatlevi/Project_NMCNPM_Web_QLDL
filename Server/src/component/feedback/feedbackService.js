const FeedbackModel = require('./feedbackModel');

class FeedbackService {
    static async getFeedbacksByFacilityId(facilityId) {
        try {
            const feedbacks = await FeedbackModel.getFeedbacksByFacilityId(facilityId);
            return feedbacks || [];
        } catch (error) {
            console.error("Error in FeedbackService.getFeedbacksByFacilityId:", error.message);
            throw error;
        }
    }
    static async submitFeedBack(touristId, facilityId, rate, detail) {
        try {
            const isInserted = await FeedbackModel.submitFeedBack(touristId, facilityId, rate, detail);
            if (!isInserted) {
                return { success: false, message: "Failed to submit feedback." };
            }
            return { success: true, message: "Feedback submitted successfully." };
        } catch (error) {
            console.error("Error in FeedbackService.submitFeedBack:", error.message);
            throw error;
        }
    }
}

module.exports = FeedbackService;
