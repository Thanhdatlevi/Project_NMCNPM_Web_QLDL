const db = require('../../config/db');

class VerifyModel {
    static async findAccountByToken(token) {
        const query = 'SELECT * FROM pending_accounts WHERE verification_token = $1';
        const result = await db.query(query, [token]);
        return result.rows[0] || null;
    }

    static async moveAccountToVerified(account) {
        const query = `
            INSERT INTO accounts (account_name, account_email, account_password, salt, account_role) 
            VALUES ($1, $2, $3, $4, $5)`;
        await db.query(query, [account.pending_name, account.pending_email, account.pending_password, account.salt, account.pending_role]);
    }

    static async deleteAccountFromPending(token) {
        const query = 'DELETE FROM pending_accounts WHERE verification_token = $1';
        await db.query(query, [token]);
    }
}

module.exports = VerifyModel;
