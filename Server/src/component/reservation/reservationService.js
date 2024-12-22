const ReservationModel = require('./reservationModel');
const AccountModel = require('../account/accountModel');
class ReservationService {
    static async createReservation(accountId, status, detailReservations) {
        try {
            const touristId = await AccountModel.getTouristId(accountId);
            if (!touristId) {
                return { success: false, message: "Tài khoản không tồn tại." };
            }
            const reservationDate = new Date().toISOString();
            const result = await ReservationModel.createReservation(touristId, reservationDate, status, detailReservations);
            if (result) {
                return { success: true, message: "Tạo đơn thành công.", reserveId: result };
            } else {
                return { success: false, message: "Có lỗi xảy ra. Vui lòng thử lại sau." };
            }
        } catch (error) {
            console.error("Error in ReservationService.createReservation:", error.message);
            throw error;
        }
    }
}

module.exports = ReservationService;