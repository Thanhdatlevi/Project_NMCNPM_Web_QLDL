const { generateAccessToken, generateRefreshToken } = require("../../utils/generateTokensUtils");
const loginModel = require("./loginModel");

class LoginService {
    static async authenticateAccount(accountId, accountName, roleID, deviceId) {
        try {
            const accessToken = generateAccessToken(accountId, accountName, roleID, deviceId);
            const refreshToken = generateRefreshToken(accountId, accountName, roleID, deviceId);

            // Lưu refresh token vào cơ sở dữ liệu
            await loginModel.saveRefreshToken(accountId, refreshToken, deviceId);

            return { accessToken, refreshToken };
        } catch (error) {
            console.error("Error in authenticateUser:", error); // In lỗi chi tiết
            throw error;
        }
    }
};

module.exports = LoginService;
