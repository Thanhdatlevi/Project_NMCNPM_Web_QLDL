const AccountService = require("../account/accountService");
const HotelService = require('../hol/hotelService');
const RestaurantService = require('../restaurant/restaurantService');
const ReservationService = require(`../reservation/reservationService`);

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

    static async getReserveHotelsByTouristId(accountId) {
        try {
            const touristId = await AccountService.getTouristId(accountId);
            const hotels = await ReservationService.getReserveHotelsByTouristId(touristId);
            return hotels;
        } catch (error) {
            console.log("Error in getHotelsByProviderId in hotelService:", error);
            throw new Error("Unable to fetch hotels by provider.");
        }
    }

    static async getReserveRestaurantByTouristId(accountId) {
        try {
            const touristId = await AccountService.getTouristId(accountId);
            const restaurants = await ReservationService.getReserveRestaurantByTouristId(touristId);
            return restaurants;
        } catch (error) {
            console.log("Error in ProviderService.getRestaurantByProviderId:", error);
            throw new Error("Unable to fetch restaurants by provider.");
        }
    }
}

module.exports = TouristService