const db = require('../../config/db');

class LoginModel {
    static async saveRefreshToken(accountId, refreshToken, deviceID) {
        const query = `INSERT INTO refresh_tokens (account_id, token, device_ID) VALUES ($1, $2, $3)
         ON CONFLICT (account_id, device_ID) DO UPDATE SET token = $2`;
        await db.query(query, [accountId, refreshToken, deviceID]);
    }
}
module.exports = LoginModel;
