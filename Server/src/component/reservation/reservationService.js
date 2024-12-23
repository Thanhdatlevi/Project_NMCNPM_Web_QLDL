const ReservationModel = require('./reservationModel');

class ReservationService {

    static async createReservation(touristId, status, detailReservations) {
        try {
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

    static async getReservationHistory(touristId) {
        try {
            const result = await ReservationModel.getReservationHistory(touristId);
            if (result) {
                return { success: true, data: result };
            }
            return { succes: false };
        } catch (error) {
            console.error("Error in ReservationService.createReservation:", error.message);
            throw error;
        }
    }



}

module.exports = ReservationService;