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

    static async getAllocationsNum(req, res) {
        try {
            let allcationsNum = await AdminService.getAllocationsNum();
            if (!allcationsNum) {
                return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
            }
            return res.status(200).json(allcationsNum);

        } catch (error) {
            console.error("Error in AdminController.getAllocationsNum:", error);
            return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
        }
    }

    static async getFacilitiesNum(req, res) {
        try {
            let facilitiesNum = await AdminService.getFacilitiesNum();
            if (!facilitiesNum) {
                return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
            }
            return res.status(200).json(facilitiesNum);

        } catch (error) {
            console.error("Error in AdminController.getFacilitiesNum:", error);
            return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
        }
    }

    static async getUsersNum(req, res) {
        try {
            let usersNum = await AdminService.getUsersNum();
            if (!usersNum) {
                return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
            }
            return res.status(200).json(usersNum);

        } catch (error) {
            console.error("Error in AdminController.getUsersNum:", error);
            return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
        }
    }

    static async deleteAccount(req, res) {
        try {
            console.log(111);
            const { accountId } = req.body; // Lấy accountId từ body

            if (!accountId) {
                return res.status(400).json({ message: 'Bắt buộc phải có accountId' });
            }
            const result = await AdminService.deleteAccount(accountId);

            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }

            return res.status(200).json({ message: result.message });
        } catch (error) {
            console.error("Error in AdminController.deleteAccount:", error);
            return res.status(500).json({ message: 'Hệ thống lỗi! Vui lòng thử lại sau.' });
        }
    }


}
module.exports = AdminController;

