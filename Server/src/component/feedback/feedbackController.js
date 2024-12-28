const FeedbackService = require('./feedbackService');

class FeedbackController {
  static async getFeedbacksByFacilityId(req, res) {
    try {
      const { facilityId } = req.params;
      const result = await FeedbackService.getFeedbacksByFacilityId(facilityId);

      if (result.success) {
        return res.status(200).json(result.data);
      }
      return res.status(404).json({ message: result.message });
    } catch (error) {
      console.error("Error in FeedbackController.getFeedbacksByFacilityId:", error.message);
      return res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại sau." });
    }
  }

  static async submitFeedback(req, res) {
    try {
        const { rating, feedback_text} = req.body.data;
        const {facilityId} = req.params;
        
        const touristId = req.user.id; // Lấy từ JWT hoặc session của người dùng

        const result = await FeedbackService.submitFeedBack(touristId, serviceId, rating, feedback_text);

        if (result.success) {
            return res.status(200).json({ message: result.message });
        }
        return res.status(400).json({ message: result.message });
    } catch (error) {
        console.error("Error in FeedbackController.submitFeedback:", error.message);
        return res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại sau." });
    }
}

}

module.exports = FeedbackController;
