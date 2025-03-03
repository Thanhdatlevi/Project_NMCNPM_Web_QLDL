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
            if (!result) return [];
            const formattedResult = result.map(reservation => {
                const date = new Date(reservation.reservationDate); // Tạo đối tượng Date từ UTC
                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Điều chỉnh về local time
                return {
                    ...reservation,
                    reservationDate: localDate.toISOString().split('T')[0], // Chuyển về định dạng YYYY-MM-DD
                };
            });
            return formattedResult;
        } catch (error) {
            console.error("Error in ReservationService.createReservation:", error.message);
            throw error;
        }
    }

    static async getReserveHotelsByTouristId(touristId) {
        try {
            const result = await ReservationModel.getReserveHotelsByTouristId(touristId);
            if (!result) return [];
            const formattedResult = result.map(reservation => {
                const date = new Date(reservation.reservationDate); // Tạo đối tượng Date từ UTC
                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Điều chỉnh về local time
                return {
                    ...reservation,
                    reservationDate: localDate.toISOString().split('T')[0], // Chuyển về định dạng YYYY-MM-DD
                };
            });
            return formattedResult;
        } catch (error) {
            console.error("Error in ReservationService.createReservation:", error.message);
            throw error;
        }
    }

    static async getReserveRestaurantByTouristId(touristId) {
        try {
            const result = await ReservationModel.getReserveRestaurantByTouristId(touristId);
            if (!result) return [];
            const formattedResult = result.map(reservation => {
                const date = new Date(reservation.reservationDate); // Tạo đối tượng Date từ UTC
                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Điều chỉnh về local time
                return {
                    ...reservation,
                    reservationDate: localDate.toISOString().split('T')[0], // Chuyển về định dạng YYYY-MM-DD
                };
            });
            return formattedResult;
        } catch (error) {
            console.error("Error in ReservationService.createReservation:", error.message);
            throw error;
        }
    }

    static async getReserveHotelsByProviderId(providerId) {
        try {
            const result = await ReservationModel.getReserveHotelsByProviderId(providerId);
            return result || [];
        } catch (error) {
            console.error("Error in ReservationService.createReservation:", error.message);
            throw error;
        }
    }

    static async getReserveRestaurantByProviderId(providerId) {
        try {
            const result = await ReservationModel.getReserveRestaurantByProviderId(providerId);
            return result || [];
        } catch (error) {
            console.error("Error in ReservationService.createReservation:", error.message);
            throw error;
        }
    }
}

module.exports = ReservationService;