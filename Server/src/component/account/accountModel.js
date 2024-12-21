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

    static async getProviderId(accountId) {
        try {
            const query = 'select provider_id from providers p where p.account_id = $1';
            const result = await db.query(query, [accountId]);
            if (result.rows.length > 0) {
                return result.rows[0].provider_id;
            }
            return null;
        }

        catch (error) {
            console.log('Error in accountModel.getProviderId: ', error);
            throw error;
        }
    }

    static async getTouristId(accountId) {
        try {
            const query = 'select tourist_id from tourists t where t.account_id = $1';
            const result = await db.query(query, [accountId]);
            if (result.rows.length > 0) {
                return { touristId: result.rows[0].tourist_id };
            }
            return null;
        } catch (error) {
            console.log('Error in accountModel.getTouristId: ', error);
            throw error;
        }
    }

    static async getAdminId(accountId) {
        try {
            const query = 'select admin_id from admins a where a.account_id = $1';
            const result = await db.query(query, [accountId]);
            if (result.rows.length > 0) {
                return { adminId: result.rows[0].admin_id };
            }
            return null;
        } catch (error) {
            console.log('Error in accountModel.getAdminId: ', error);
            throw error;
        }
    }

    static async getPublicProfile(accountId) {
        try {
            const query = `SELECT u.user_fullname, u.user_birthday, u.user_contact, u.user_address, a.account_email
                FROM accounts a
                JOIN users u ON u.account_id = a.account_id
                WHERE a.account_id = $1`
            const res = await db.query(query, [accountId]);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                const userProfile = {
                    userFullname: row.user_fullname,
                    userBirthday: row.user_birthday,
                    userContact: row.user_contact,
                    userAddress: row.user_address,
                    accountEmail: row.account_email
                }
                return userProfile;
            }
            return null;
        } catch (error) {
            console.error("Error in accountModel.getPublicProfile:", error.message);
            throw error;
        }
    }

}

module.exports = AccountModel;
