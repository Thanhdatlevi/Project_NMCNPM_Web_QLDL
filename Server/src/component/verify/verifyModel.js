const db = require('../../config/db');

// Kiểm tra xem token có hợp lệ không
async function findUserByToken(token) {
    const query = 'SELECT * FROM pending_accounts WHERE verification_token = $1';
    const result = await db.query(query, [token]);
    return result.rows[0] || null; // Trả về người dùng nếu có, ngược lại là null
}

// Chuyển người dùng từ bảng `pending_users` sang `users`
async function moveUserToVerified(user) {
    const query = `INSERT INTO accounts (account_name, account_email, account_password, salt, account_role) 
    VALUES ($1, $2, $3, $4, $5)`;
    await db.query(query, [user.pending_name, user.pending_email, user.pending_password, user.salt, user.pending_role]);
}

// Xóa người dùng khỏi bảng `pending_users`
async function deleteUserFromPending(token) {
    const query = 'DELETE FROM pending_users WHERE verification_token = $1';
    await db.query(query, [token]);
}

module.exports = {
    findUserByToken,
    moveUserToVerified,
    deleteUserFromPending,
};
