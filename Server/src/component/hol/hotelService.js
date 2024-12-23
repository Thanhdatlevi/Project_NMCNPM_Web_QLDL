const HotelModel = require('./hotelModel');

const FacilityService = require('../facility/facilityService');
class HotelService {

    static async get_3_PopularHotels() {
        try {
            const popularHotels = await HotelModel.get3PopularHotels();
            return popularHotels;
        } catch (error) {
            console.log("Error in get_3_PopularHotels in hotelService:", error);
            throw new Error("Unable to fetch popular hotels.")
        }
    }

    static async getHotelsTotal() {
        try {
            const total = await HotelModel.getHotelsTotal();
            return total;
        } catch (error) {
            console.error("Error in getHotelsTotal in hotelService: ", error.message);
            throw error;
        }
    }

    static async getHotelsByPage(pageNum, limit) {
        try {
            const offset = (pageNum - 1) * limit;
            const hotels = await HotelModel.getHotelsByPage(limit, offset);
            return hotels;
        } catch (error) {
            throw error;
        }
    }

    static async getHotelById_tourist(holId) {
        try {
            const hotel = await HotelModel.getHotelById_tourist(holId);
            return hotel;
        } catch (error) {
            console.error("Error in getHotelById_tourist in hotelService:", error.message);
            throw new Error("Unable to retrieve restaurant information");
        }
    }

    static async getHotelById_provider(holId) {
        try {
            const hotel = await HotelModel.getHotelById_provider(holId);
            return hotel;
        } catch (error) {
            console.error("Error in getHotelById_provider in hotelService:", error.message);
            throw new Error("Unable to retrieve restaurant information");
        }
    }

    static async getHotelsByLocationId(locationId) {
        try {
            const hotels = await HotelModel.getHotelsByLocation(locationId);
            return hotels;
        } catch (error) {
            console.log("Error in getHotelsByLocationId in hotelService:", error);
            throw new Error("Unable to fetch hotels by location.");
        }
    }

    static async getHotelsByProviderId(providerId) {
        try {
            const hotels = await HotelModel.getHotelsByProviderId(providerId);
            return hotels;
        } catch (error) {
            console.log("Error in getHotelsByProviderId in hotelService:", error);
            throw new Error("Unable to fetch hotels by provider.");
        }
    }

    /**
    * Cập nhật thông tin khách sạn.
    * @param {number} hotelId - ID của khách sạn.
    * @param {string} amenities - Tiện nghi mới của khách sạn.
    * @param {number} averagePrice - Giá trung bình mới của khách sạn.
    * @returns {Object} - Trạng thái cập nhật và thông báo.
    */
    static async updateHotel(hotelId, amenities, averagePrice) {
        try {
            if (!hotelId) {
                return { success: false, message: 'Hotel ID là bắt buộc.' };
            }
            const isUpdated = await HotelModel.updateHotel(hotelId, amenities, averagePrice);
            if (isUpdated) {
                return { success: true, message: 'Cập nhật thông tin khách sạn thành công.' };
            } else {
                return { success: false, message: 'Không tìm thấy khách sạn hoặc không có thông tin nào được cập nhật.' };
            }
        } catch (error) {
            console.error('Error in HotelService.updateHotel:', error.message);
            throw new Error('Đã xảy ra lỗi khi cập nhật khách sạn.');
        }
    }

    static async createHotel(providerId, facilityName, description, locationId, contact, specificLocation, facilityImgs) {
        try {
            const facilityId = await FacilityService.createFacility
                (providerId, facilityName, description, locationId, contact, specificLocation, facilityImgs);

            if (!facilityId) {
                return { success: false, message: "Failed to create facility. Facility ID is null." }
            }
            const hotelId = await HotelModel.insertHotel(facilityId);
            if (!hotelId) {
                return { success: false, message: "Failed to insert hotel. Hotel ID is null." }
            }
            return { success: true, facilityId, hotelId };
        } catch (error) {
            console.error("Error in HotelService.createHotel: ", error.message);
            throw error;
        }
    }

}
module.exports = HotelService;