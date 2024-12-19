const logoutService = require('./logoutService');

class logoutController {
    static async logoutAccount(req, res) {
        const account = res.locals.account;

        if (!account) {
            console.error("Error: Missing accountId or deviceId in the request");
            return res.status(400).json({ message: 'Missing accountId or deviceId in the request.' });
        }

        try {
            await logoutService.deleteRefreshToken(account.accountId, account.deviceId);

            res.clearCookie(process.env.ACCESS_TOKEN_NAME, { httpOnly: true, path: '/' });
            res.clearCookie(process.env.REFRESH_TOKEN_NAME, { httpOnly: true, path: '/' });

            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Logout error:', error); // Ghi lại lỗi cho mục đích debug
            return res.status(500).json({ message: 'There was an issue processing your logout request. Please try again later!' });
        }
    }
}

module.exports = logoutController;
