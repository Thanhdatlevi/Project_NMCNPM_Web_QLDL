const AdminModel = require('./adminModel');

class AdminService {
    static async getAllUsers() {
        try {
            let users = await AdminModel.getAllUsers();
            return users;
        }
        catch (error) {
            console.log("Error getAllUsers in AdminController:", error);
            throw error;
        }

    }

    static async getAllocationsNum() {
        try {
            let allcationsNum = await AdminModel.getAllocationsNum();
            return allcationsNum;
        } catch (error) {
            throw error;
        }
    }

    static async getFacilitiesNum() {
        try {
            let facilitiesNum = await AdminModel.getFacilitiesNum();
            return facilitiesNum;
        } catch (error) {
            throw error;
        }
    }

    static async getUsersNum() {
        try {
            let usersNum = await AdminModel.getUsersNum();
            return usersNum;
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

}

module.exports = AdminService;

