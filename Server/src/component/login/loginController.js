const passport = require("../../config/passportConfig");
const LoginService = require("./loginService");
require('dotenv').config();
const { getDeviceId } = require("../../utils/deviceID")


class loginController {

    static async loginAccount(req, res) {
        passport.authenticate('local', { session: false }, async (err, account, info) => {
            if (err) {
                console.error("Error during authentication:", err.message);
                return res.status(500).json({ message: 'Xác thực lỗi! Vui lòng thử lại sau!' });
            }

            if (!account) {
                return res.status(400).json({
                    message: info.message,
                });
            }
            try {
                const userAgent = req.get('user-agent')
                const deviceId = getDeviceId(userAgent);

                const { accessToken, refreshToken } = await LoginService.authenticateAccount(account.accountId, account.accountName, account.accountRole, deviceId);
                res.cookie(process.env.ACCESS_TOKEN_NAME, accessToken, {
                    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax'
                });
                res.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken, {
                    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax'
                });

                return res.status(200).json({ success: true });

            } catch (error) {
                console.error("Error in loginController:", error.message);
                res.status(500).json({ message: 'Hệ thống đang lỗi! Vui lòng thử lại sau!' });
            }
        })(req, res);
    }
}

module.exports = loginController;
