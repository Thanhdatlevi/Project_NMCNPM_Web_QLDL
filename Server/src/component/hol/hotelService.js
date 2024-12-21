const HotelModel = require('./hotelModel');


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



}

module.exports = HotelService;