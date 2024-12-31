const FeedbackService = require('./feedbackService');

class FeedbackController {
  static async getFeedbacksByFacilityId(req, res) {
    try {
      const { facilityId } = req.params;
      const result = await FeedbackService.getFeedbacksByFacilityId(facilityId);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error in FeedbackController.getFeedbacksByFacilityId:", error.message);
      return res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại sau." });
    }
  }
}
module.exports = FeedbackController;
