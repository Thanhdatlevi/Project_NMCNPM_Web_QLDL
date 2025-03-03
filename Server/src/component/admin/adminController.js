const AdminService = require('./adminService');

class AdminController {
    static async getAllUsers(req, res) {
        try {
            let users = await AdminService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error in AdminController.getAllUsers:", error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getAllocationsNum(req, res) {
        try {
            let allcationsNum = await AdminService.getAllocationsNum();
            return res.status(200).json(allcationsNum);
        } catch (error) {
            console.error("Error in AdminController.getAllocationsNum:", error);
            return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
        }
    }

    static async getFacilitiesNum(req, res) {
        try {
            let facilitiesNum = await AdminService.getFacilitiesNum();
            return res.status(200).json(facilitiesNum);

        } catch (error) {
            console.error("Error in AdminController.getFacilitiesNum:", error);
            return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
        }
    }

    static async getUsersNum(req, res) {
        try {
            let usersNum = await AdminService.getUsersNum();
            return res.status(200).json(usersNum);

        } catch (error) {
            console.error("Error in AdminController.getUsersNum:", error);
            return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
        }
    }

    static async deleteAccount(req, res) {
        try {
            const { accountId } = req.body;
            if (!accountId) {
                return res.status(401).json({ message: 'Bạn chưa đăng nhập. Vui lòng đăng nhập để thực hiện thao tác này.' });
            }
            const result = await AdminService.deleteAccount(accountId);
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            return res.status(204).send();
        } catch (error) {
            console.error("Error in AdminController.deleteAccount:", error);
            return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
        }
    }

    static async deleteFacility(req, res) {
        try {
            const { facilityId } = req.body;
            if (!facilityId) {
                return res.status(400).json({ message: "Thiếu facilityId." });
            }
            const result = await AdminService.deleteFacility(facilityId);
            if (!result.success) {
                return res.status(404).json({ message: "Facility không tồn tại hoặc không thể xóa." });
            }
            return res.status(204).send();
        } catch (error) {
            console.error("Error in AdminController.deleteFacility:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
        }
    }

    static async addAttractions(req, res) {
        try {
            const { name, description, location, phone, openingHours, rating, img_url } = req.body;
            const attractionRelated = await AdminService.addAttractions(name, description, location, phone, openingHours, rating, img_url);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Can\'t add attraction' });
            }
            res.json(attractionRelated);
        } catch (error) {
            res.status(500).json({ message: 'Can\'t add attraction' });
        }
    }

    static async updateAttractions(req, res) {
        try {
            const { name, description, location, phone, openingHours, rating, img_url } = req.body;
            const { attractionID } = req.params;
            const attractionRelated = await AdminService.updateAttractions(attractionID, name, description, location, phone, openingHours, rating, img_url);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    }

    static async deleteAttractions(req, res) {
        try {
            const { attractionID } = req.params;
            const attractionRelated = await AdminService.deleteAttractions(attractionID);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    }

    static async getHotelRequests(req, res) {
        try {
            const hotelRequests = await AdminService.getHotelRequests();
            return res.status(200).json(hotelRequests);
        } catch (error) {
            console.error('Error in AdminController.getHotelRequests:', error.message);
            return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
        }
    }

    static async getRestaurantRequests(req, res) {
        try {
            const restaurantRequests = await AdminService.getRestaurantRequests();
            return res.status(200).json(restaurantRequests);
        } catch (error) {
            console.error('Error in AdminController.getRestaurantRequests:', error.message);
            return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
        }
    }
}
module.exports = AdminController;

