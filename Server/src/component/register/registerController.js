const RegisterService = require('./registerService');
class RegisterController {
    static async registerAccount(req, res) {
        const { user_name, email, password, confirmPassword, role } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Mật khẩu không khớp!"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Email không đúng!"
            });
        }


        try {
            let roleId = null;
            if (role === 'tourist') roleId = 3;
            else if (role === 'provider') roleId = 2;
            else return res.status(400).json({ message: "Vai trò không hợp lệ" });
            const result = await RegisterService.registerAccount(user_name, email, password, roleId);
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(200).json({ message: result.message });

        } catch (error) {
            console.error("Error registerAccount in registerController: ", error.message);
            return res.status(500).json({ message: "Hê thống lỗi! Vui lòng thử lại sau" });
        }
    }
}

module.exports = RegisterController;
