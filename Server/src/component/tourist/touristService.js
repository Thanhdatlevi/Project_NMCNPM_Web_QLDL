const AccountService = require("../account/accountService");
const ReservationService = require(`../reservation/reservationService`);
const FeedbackService = require(`../feedback/feedbackService`);
class TouristService {
    static async createReservation(accountId, status, detailReservation) {
        try {
            const touristId = await AccountService.getTouristId(accountId);
            if (!touristId) {
                return { success: false, message: "Tài khoản không tồn tại." };
            }
            const result = await ReservationService.createReservation(touristId, status, detailReservation);
            return result;
        } catch (error) {
            console.error("Error in TouristService.createReservation:", error.message);
            throw new Error("Có lỗi xảy ra khi tạo đơn đặt chỗ.");
        }
    }

    static async getReservationHistory(accountId) {
        try {
            const touristId = await AccountService.getTouristId(accountId);
            if (!touristId) {
                return { success: false, message: "Tài khoản không tồn tại." };
            }
            const result = await ReservationService.getReservationHistory(touristId);
            return result;
        } catch (error) {
            console.error("Error in TouristService.getReservationHistory:", error.message);
            throw new Error("Có lỗi xảy ra khi lấy lịch sử đặt chỗ.");
        }
    }

    static async submitFeedback(accountId, facilityId, rate, detail) {
        try {
            const touristId = await AccountService.getTouristId(accountId);
            if (!touristId) {
                return { success: false, message: "Tài khoản không tồn tại." };
            }
            const result = await FeedbackService.submitFeedBack(touristId, facilityId, rate, detail);
            if (result) {
                return { success: true };
            } else {
                return { success: false, message: "Không thể gửi phản hồi." };
            }
        } catch (error) {
            console.error("Error in TouristService.submitFeedback:", error.message);
            return { success: false, message: "Có lỗi xảy ra khi gửi phản hồi." };
        }
    }
}

module.exports = TouristService