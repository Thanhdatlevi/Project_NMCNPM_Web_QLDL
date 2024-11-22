const userModel = require('./userModel');

const userController = {
    getPersonalInf: async (req, res) => {
        try {
            const { userId } = req.params;  // Lấy userId từ tham số URL (ví dụ: /users/:userId)
            const personalInfo = await userModel.getPersonalInf(userId);  // Truyền userId vào phương thức của userModel
            res.json(personalInfo);  // Trả về thông tin người dùng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving personal information' });  // Thông báo lỗi
        }
    },
};

module.exports = userController;
