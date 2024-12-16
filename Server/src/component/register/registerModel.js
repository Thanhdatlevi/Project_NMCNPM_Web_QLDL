const db = require('../../config/db');
require('dotenv').config();

class RegisterModel {

    static async createPendingAccount(accountName, email, encryptionPassword, verificationToken, role, salt) {
        try {
            const query = 'INSERT INTO pending_accounts (pending_name, pending_email, pending_password, verification_token, pending_role, salt) VALUES ($1, $2, $3, $4, $5, $6)';
            await db.query(query, [accountName, email, encryptionPassword, verificationToken, role, salt]);
        } catch (error) {
            console.error("Error createPendingAccount in RegisterModel: ", error.message);
            throw error;
        }
    }

}

module.exports = RegisterModel;
