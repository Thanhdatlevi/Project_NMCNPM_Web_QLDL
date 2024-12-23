// const FeedbackModel = require('../feedback/feedbackModel'); // Import FeedbackModel để truy cập cơ sở dữ liệu

// const feedbackController = {
//   // Xử lý POST request để gửi feedback
//   submitFeedback: async (req, res) => {
//     const {rate, details, facility_id } = req.body;

//     // Kiểm tra nếu có dữ liệu thiếu
//     if (!tourist_id || !details || !rate || !facility_id) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//       // Lưu feedback vào database
//       const newFeedback = await FeedbackModel.submitFeedback(rate, details, facility_id);

//       // Trả về feedback mới đã được lưu
//       res.status(201).json({
//         message: 'Feedback submitted successfully',
//         feedback: newFeedback,
//       });
//     } catch (error) {
//       console.error('Error saving feedback:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Lấy tất cả feedbacks
//   getAllFeedbacks: async (req, res) => {
//     try {
//       const feedbacks = await FeedbackModel.getAllFeedbacks();
//       res.status(200).json(feedbacks); // Trả về tất cả các feedbacks
//     } catch (error) {
//       console.error('Error fetching all feedbacks:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Lấy thông tin feedback theo ID
//   getFeedbackByID: async (req, res) => {
//     const { id } = req.params;

//     try {
//       const feedback = await FeedbackModel.getFeedbackByID(id);

//       if (feedback.length === 0) {
//         return res.status(404).json({ message: 'Feedback not found for the specified ID' });
//       }

//       res.status(200).json(feedback); // Trả về feedback cho id
//     } catch (error) {
//       console.error('Error fetching feedback by ID:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Lấy thông tin feedback theo tourist_id
//   getFeedbackByTouristID: async (req, res) => {
//     const { tourist_id } = req.params;

//     try {
//       const feedback = await FeedbackModel.getFeedbackByTouristID(tourist_id);

//       if (feedback.length === 0) {
//         return res.status(404).json({ message: 'Feedback not found for the specified tourist_id' });
//       }

//       res.status(200).json(feedback); // Trả về feedback cho tourist_id
//     } catch (error) {
//       console.error('Error fetching feedback by tourist_id:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Lấy thông tin feedback theo facility_id
//   getFeedbackByFacilityId: async (req, res) => {
//     const { facility_id } = req.params;

//     try {
//       const feedback = await FeedbackModel.getFeedbackByFacilityId(facility_id);

//       if (feedback.length === 0) {
//         return res.status(404).json({ message: 'Feedback not found for the specified facility_id' });
//       }

//       res.status(200).json(feedback); // Trả về feedback cho facility_id
//     } catch (error) {
//       console.error('Error fetching feedback by facility_id:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Lấy thông tin feedback có rate lớn hơn một giá trị
//   getFeedbackByHigherRate: async (req, res) => {
//     const { rate } = req.params;

//     try {
//       const feedbacks = await FeedbackModel.getFeedbackByHigherRate(rate);

//       if (feedbacks.length === 0) {
//         return res.status(404).json({ message: 'No feedbacks found with rate higher than the specified value' });
//       }

//       res.status(200).json(feedbacks); // Trả về feedbacks có rate lớn hơn giá trị cho trước
//     } catch (error) {
//       console.error('Error fetching feedbacks by rate:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Lấy thông tin feedback có rate nhỏ hơn một giá trị
//   getFeedbackByLowerRate: async (req, res) => {
//     const { rate } = req.params;

//     try {
//       const feedbacks = await FeedbackModel.getFeedbackByLowerRate(rate);

//       if (feedbacks.length === 0) {
//         return res.status(404).json({ message: 'No feedbacks found with rate lower than the specified value' });
//       }

//       res.status(200).json(feedbacks); // Trả về feedbacks có rate nhỏ hơn giá trị cho trước
//     } catch (error) {
//       console.error('Error fetching feedbacks by rate:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Lấy thông tin feedback có rate lớn hơn hoặc bằng một giá trị
//   getFeedbackByHigherEqualRate: async (req, res) => {
//     const { rate } = req.params;

//     try {
//       const feedbacks = await FeedbackModel.getFeedbackByHigherEqualRate(rate);

//       if (feedbacks.length === 0) {
//         return res.status(404).json({ message: 'No feedbacks found with rate greater than or equal to the specified value' });
//       }

//       res.status(200).json(feedbacks); // Trả về feedbacks có rate lớn hơn hoặc bằng giá trị cho trước
//     } catch (error) {
//       console.error('Error fetching feedbacks by rate:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Lấy thông tin feedback có rate nhỏ hơn hoặc bằng một giá trị
//   getFeedbackByLowerEqualRate: async (req, res) => {
//     const { rate } = req.params;

//     try {
//       const feedbacks = await FeedbackModel.getFeedbackByLowerEqualRate(rate);

//       if (feedbacks.length === 0) {
//         return res.status(404).json({ message: 'No feedbacks found with rate lower than or equal to the specified value' });
//       }

//       res.status(200).json(feedbacks); // Trả về feedbacks có rate nhỏ hơn hoặc bằng giá trị cho trước
//     } catch (error) {
//       console.error('Error fetching feedbacks by rate:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },

//   // Xóa feedback theo id
//   deleteFeedback: async (req, res) => {
//     const { id } = req.params;

//     try {
//       const deletedFeedback = await FeedbackModel.deleteFeedback(id);

//       if (!deletedFeedback) {
//         return res.status(404).json({ message: 'Feedback not found to delete' });
//       }

//       res.status(200).json({ message: 'Feedback deleted successfully', feedback: deletedFeedback });
//     } catch (error) {
//       console.error('Error deleting feedback:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   },


// };

// module.exports = feedbackController;



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
}

module.exports = FeedbackController;
