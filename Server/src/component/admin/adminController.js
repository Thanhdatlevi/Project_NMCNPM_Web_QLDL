const AdminService = require('./adminService');

class AdminController {
    static async getAllUsers(req, res) {
        try {
            let users = await AdminService.getAllUsers();
            if (!users) {
                return res.status(204).json({ message: 'No users found' });
            }
            return res.status(200).json(users);

        } catch (error) {
            console.error("Error in AdminController.getAllUsers:", error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
module.exports = AdminController;

