const db = require('../../config/db');

class AdminModel {
    static async getAllUsers(res, req) {
        try {
            const query = `
            SELECT a.account_id, a.account_name, a.account_email,
                u.user_fullname, u.user_birthday, u.user_contact, u.user_address
            FROM accounts a
            JOIN users u ON a.account_id = u.account_id
            WHERE a.account_role != 1;`
            const res = await db.query(query);
            if (res.rows.length > 0) {
                const users = res.rows.map(row => ({
                    accountId: row.account_id,
                    accountName: row.account_name,
                    accountEmail: row.account_email,
                    userFullName: row.user_fullname,
                    userBirthday: row.user_birthday,
                    userContact: row.user_contact,
                    userAddress: row.user_address
                }));
                return users;
            }
            return null;
        } catch (erorr) {
            console.log("error getAllUsers in AdminModel: ", erorr);
            throw error;
        }
    }
}

module.exports = AdminModel;

