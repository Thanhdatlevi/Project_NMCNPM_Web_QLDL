const registerModel = require('./registerModel');
const { generateSalt, hashPassword } = require('../../utils/passwordUtils');

class RegisterController {
    static async registerUser(req, res) {
        const { user_name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Passwords do not match."
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức regex kiểm tra định dạng email
        if (!emailRegex.test(email)) {
            return res.json({
                success: false,
                message: "Invalid email format."
            });
        }

        try {
            const salt = generateSalt();
            const encryptedPassword = hashPassword(password, salt);

            await registerModel.registerUser(user_name, email, encryptedPassword, salt);
            return res.json({
                success: true,
                message: 'Registration successful, please check your email for verifying',
            });

        } catch (error) {
            return res.json({
                success: false,
                message: error.message || 'An unexpected error occurred. Please try again later.',
            });
        }
    }
}

module.exports = RegisterController;
