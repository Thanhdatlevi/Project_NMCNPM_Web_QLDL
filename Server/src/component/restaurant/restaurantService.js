const RestaurantModel = require('./restaurantModel');
const AccountModel = require(`../account/accountModel`);

class RestaurantService {

    static async getRestaurantsByPage(pageNum, limit) {
        try {
            const offset = (pageNum - 1) * limit;
            const restaurants = await RestaurantModel.getRestaurantsByPage(limit, offset);
            return restaurants;
        } catch (error) {
            throw error;
        }
    }

    static async getRestaurantsTotal() {
        try {
            const total = await RestaurantModel.getRestaurantsTotal();
            return total;
        } catch (error) {
            console.error("Error in getRestaurantsTotal in restaurantService: ", error.message);
            throw error;
        }
    }

    static async getRestaurantById_tourist(resId) {
        try {
            const restaurant = await RestaurantModel.getRestaurantById_tourist(resId);
            return restaurant;
        } catch (error) {
            console.error("Error in getRestaurantById_tourist:", error.message);
            throw new Error("Unable to retrieve restaurant information");
        }
    }

    static async getRestaurantById_provider(resId) {
        try {
            const restaurant = await RestaurantModel.getRestaurantById_provider(resId);
            return restaurant;
        } catch (error) {
            console.error("Error in getRestaurantById_tourist:", error.message);
            throw new Error("Unable to retrieve restaurant information");
        }
    }

    static async getRelatedRestaurantAboutLocation(resId) {
        try {
            const locationId = await RestaurantModel.getLocationIdOfRestaurant(resId);
            if (!locationId) {
                return null;
            }
            const relatedResArray = await RestaurantModel.getRelatedRestaurantAboutLocation(resId, locationId);
            return relatedResArray; // Trả về danh sách nhà hàng liên quan nếu có
        } catch (error) {
            console.log("Error in getRelatedRestaurantAboutLocation in restaurantService:", error);
            throw new Error("Unable to fetch related restaurants by location.")
        }
    }

    static async get_3_PopularRestaurants() {
        try {
            const popularRestaurants = await RestaurantModel.get3PopularRestaurants();
            return popularRestaurants;
        } catch (error) {
            console.log("Error in get_3_PopularRestaurants in restaurantService:", error);
            throw new Error("Unable to fetch popular restaurants.")
        }
    }

    static async getRestaurantsByLocationId(locationId) {
        try {
            const restaurants = await RestaurantModel.getRestaurantsByLocation(locationId);
            return restaurants;
        } catch (error) {
            console.log("Error in getRestaurantsByLocationId in restaurantService:", error);
            throw new Error("Unable to fetch restaurants by location.");
        }
    }

    static async getRestaurantByProviderId(providerId) {
        try {
            const restaurants = await RestaurantModel.getRestaurantByProviderId(providerId);
            return restaurants;
        } catch (error) {
            console.log("Error in getRestaurantByProviderId in restaurantService:", error);
            throw new Error("Unable to fetch restaurants by provider.");
        }
    }

    /**
    * Lấy Facility ID từ Restaurant ID.
    * @param {number} restaurantId - ID của nhà hàng.
    * @returns {number|null} - Facility ID hoặc null nếu không tìm thấy.
    */
    static async getFacilityIdByRestaurantId(restaurantId) {
        if (!restaurantId) {
            throw new Error('Restaurant ID là bắt buộc.');
        }
        try {
            return await RestaurantModel.getFacilityIdByRestaurantId(restaurantId);
        } catch (error) {
            console.error('Error in RestaurantService.getFacilityIdByRestaurantId:', error.message);
            throw new Error('Đã xảy ra lỗi khi lấy Facility ID.');
        }
    }

    /**
     * Cập nhật thông tin nhà hàng.
     * @param {number} restaurantId - ID của nhà hàng.
     * @param {string} amenities - Tiện nghi mới của nhà hàng.
     * @param {number} averagePrice - Giá trung bình mới của nhà hàng.
     * @returns {boolean} - Trạng thái cập nhật (true: thành công, false: thất bại).
     */
    static async updateRestaurant(restaurantId, amenities, averagePrice) {
        if (!restaurantId) {
            throw new Error('Restaurant ID là bắt buộc.');
        }
        try {
            return await RestaurantModel.updateRestaurant(restaurantId, amenities, averagePrice);
        } catch (error) {
            console.error('Error in RestaurantService.updateRestaurant:', error.message);
            throw new Error('Đã xảy ra lỗi khi cập nhật nhà hàng.');
        }
    }
}

module.exports = RestaurantService;