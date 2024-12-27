const AdminModel = require('./adminModel');

const FacilityService = require('../facility/facilityService');
const AttractionService = require('../attraction/attractionService');

class AdminService {
    static async getAllUsers() {
        try {
            let users = await AdminModel.getAllUsers();
            return users || [];
        }
        catch (error) {
            console.log("Error getAllUsers in AdminController:", error);
            throw error;
        }

    }

    static async getAllocationsNum() {
        try {
            let allcationsNum = await AdminModel.getAllocationsNum();
            return allcationsNum || 0;
        } catch (error) {
            throw error;
        }
    }

    static async getFacilitiesNum() {
        try {
            let facilitiesNum = await AdminModel.getFacilitiesNum();
            return facilitiesNum || 0;
        } catch (error) {
            throw error;
        }
    }

    static async getUsersNum() {
        try {
            let usersNum = await AdminModel.getUsersNum();
            return usersNum || 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteAccount(accountId) {
        try {
            const isDeleted = await AdminModel.deleteAccount(accountId);
            if (!isDeleted) {
                return { success: false, message: 'Không tìm thấy tài khoản để xóa.' };
            }
            return { success: true, message: 'Tài khoản đã được xóa thành công.' };
        } catch (error) {
            console.error("Error in AdminService.deleteAccount:", error);
            throw error;
        }
    }

    static async deleteFacility(facilityId) {
        try {
            const deletedFacility = await FacilityService.deleteFacility(facilityId);
            if (!deletedFacility) {
                return { success: false, message: "Facility không tồn tại." };
            }
            return { success: true, message: "Facility đã được xóa thành công." };

        } catch (error) {
            console.error("Error in ProviderService.deleteFacility:", error.message);
            throw error;
        }
    }

    static async addAttractions(name, description, location, phone, openingHours, rating, img_url) {
        try {
            const attractions = await AttractionService.addAttractions(name, description, location, phone, openingHours, rating, img_url);
            return attractions;

        } catch (error) {
            console.error("Error in add AdminService.addAttractions: ", error);
            throw error;
        }
    }
    static async updateAttractions(attractionID, name, description, location, phone, openingHours, rating, img_url) {
        try {
            const attractions = await AttractionService.updateAttractions(attractionID, name, description, location, phone, openingHours, rating, img_url);
            return attractions;

        } catch (error) {
            console.error("Error in add AdminService.updateAttractions: ", error);
            throw error;
        }
    }
    static async deleteAttractions(attractionID) {
        try {
            const attractions = await AttractionService.deleteAttractions(attractionID);
            return attractions;

        } catch (error) {
            console.error("Error in AdminService.deleteAttractions: ", error);
            throw error;
        }
    }

    static async getHotelRequests() {
        try {
            const hotelRequests = await AdminModel.getHotelRequests();
            return hotelRequests || [];
        } catch (error) {
            console.error('Error in AdminService.getHotelRequests:', error.message);
            throw error;
        }
    }

    static async getRestaurantRequests() {
        try {
            const restaurantRequests = await AdminModel.getRestaurantRequests();
            return restaurantRequests || [];
        } catch (error) {
            console.error('Error in AdminService.getRestaurantRequests:', error.message);
            throw error;
        }
    }

}

module.exports = AdminService;

