const db = require('../../config/db');

class AdminModel {
    static async getAllUsers() {
        try {
            const query = `
            SELECT a.account_id, a.account_name, a.account_email, a.account_role,
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
                    accountRole: row.account_role === 2 ? 'provider' : row.account_role === 3 ? 'tourist' : 'other',
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
    static async getAllocationsNum() {
        try {
            const query = `SELECT COUNT(*) AS total_attractions FROM attractions`;
            const res = await db.query(query);
            if (res.rows.length > 0) {
                return { allcationsNum: res.rows[0].total_attractions }
            }
            return null;
        } catch (error) {
            console.log("error AdminModel.getAllocationsNum: ", erorr);
            throw error;
        }
    }

    static async getFacilitiesNum() {
        try {
            const query = `SELECT COUNT(*) AS total_facilities FROM facilities`;
            const res = await db.query(query);
            if (res.rows.length > 0) {
                return { facilitiesNum: res.rows[0].total_facilities };
            }
            return null;
        } catch (error) {
            console.log("error AdminModel.getFacilitiesNum: ", error);
            throw error;
        }
    }

    static async getUsersNum() {
        try {
            const query = `SELECT COUNT(*) AS total_users FROM users`;
            const res = await db.query(query);
            if (res.rows.length > 0) {
                return { usersNum: res.rows[0].total_users };
            }
            return null;
        } catch (error) {
            console.log("error AdminModel.getUsersNum: ", error);
            throw error;
        }
    }


    static async deleteAccount(accountId) {
        try {
            const query = 'DELETE FROM accounts WHERE account_Id = $1 RETURNING *';
            const res = await db.query(query, [accountId]);
            if (res.rows.length === 0) {
                return null;
            }
            return true;
        } catch (error) {
            console.error("Error in adminModel.deleteAccount:", error);
            throw error;
        }
    }


}

module.exports = AdminModel;

