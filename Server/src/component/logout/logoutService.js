const logoutModel = require('./logoutModel');

class logoutService {
    static async deleteRefreshToken(accountId, deviceId) {
        try {
            await logoutModel.deleteRefreshToken(accountId, deviceId);
        } catch (error) {
            console.error('Error while deleting refresh token:', error);
            throw new Error('There was an issue processing your logout request. Please try again later.');
        }
    }
}
module.exports = logoutService;
