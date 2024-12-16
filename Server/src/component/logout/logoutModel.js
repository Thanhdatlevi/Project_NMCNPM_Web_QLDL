const db = require('../../config/db');

class logoutModel {
    static async deleteRefreshToken(accountId, deviceId) {
        const query = `DELETE FROM refresh_tokens WHERE account_id = $1 AND device_id = $2`;
        return await db.query(query, [accountId, deviceId]);
    }
}

module.exports = logoutModel;
