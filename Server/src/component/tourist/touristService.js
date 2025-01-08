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
            if (result.success) {
                return { success: true, message: result.message, reserveId: result.reserveId };
            } else {
                return { success: false, message: result.message };
            }
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
            return { success: true, data: result };
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

    static async getReserveHotelsByTouristId(accountId) {
        try {
            const touristId = await AccountService.getTouristId(accountId);
            if (!touristId) {
                return { success: false, message: "Tài khoản không tồn tại." };
            }
            const hotels = await ReservationService.getReserveHotelsByTouristId(touristId);
            return { success: true, data: hotels };
        } catch (error) {
            console.log("Error in getHotelsByProviderId in hotelService:", error);
            throw new Error("Unable to fetch hotels by provider.");
        }
    }

    static async getReserveRestaurantByTouristId(accountId) {
        try {
            const touristId = await AccountService.getTouristId(accountId);
            if (!touristId) {
                return { success: false, message: "Tài khoản không tồn tại." };
            }
            const restaurants = await ReservationService.getReserveRestaurantByTouristId(touristId);
            return { success: true, data: restaurants };
        } catch (error) {
            console.log("Error in ProviderService.getRestaurantByProviderId:", error);
            throw new Error("Unable to fetch restaurants by provider.");
        }
    }
}

module.exports = TouristService