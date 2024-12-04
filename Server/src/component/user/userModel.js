// models/UserModel.js

const db = require('../../config/db');
const CUser = require('./CUser');

class UserModel {
    static async checkUserExistsInUsers(userName, email) {
        const query = 'SELECT * FROM accounts WHERE account_name = $1 OR account_email = $2';
        const result = await db.query(query, [userName, email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const userObj = new CUser(
                user.account_id,
                user.account_name,
                user.account_password,
                user.account_email,
                user.salt,
                user.role,
            );
            return userObj;
        }

        return null;
    }

    static async checkUserExistsInPendingUsers(userName, email) {
        const query = 'SELECT * FROM pending_accounts WHERE pending_name = $1 OR pending_email = $2';
        const result = await db.query(query, [userName, email]);
        return result.rows[0] || null;
    }
}

module.exports = UserModel;
