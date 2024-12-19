const AdminModel = require('./adminModel');

class AdminService {
    static async getAllUsers(res, req) {
        try {
            let users = await AdminModel.getAllUsers();
            return users;
        }
        catch (error) {
            console.log("Error getAllUsers in AdminController:", error);
            throw error;
        }

    }
}

module.exports = AdminService;

