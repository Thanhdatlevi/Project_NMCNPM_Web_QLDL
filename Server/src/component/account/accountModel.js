const db = require('../../config/db');

class AccountModel {

    static async checkAccountExistsInAccounts(accountName, email) {
        const query = 'SELECT * FROM accounts WHERE account_name = $1 OR account_email = $2';
        const result = await db.query(query, [accountName, email]);

        if (result.rows.length > 0) {
            const row = result.rows[0];
            const account = {
                accountId: row.account_id,
                accountName: row.account_name,
                accountPassword: row.account_password,
                email: row.account_email,
                salt: row.salt,
                accountRole: row.account_role
            };
            return account;
        }

        return null;
    }

    static async checkAccountExistsInPendingAccounts(accountName, email) {
        const query = 'SELECT * FROM pending_accounts WHERE pending_name = $1 OR pending_email = $2';
        const result = await db.query(query, [accountName, email]);
        return result.rows[0] || null;
    }

}

module.exports = AccountModel;
