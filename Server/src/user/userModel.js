const db = require('../config/db');

// Định nghĩa các phương thức của userModel
const userModel = {
    getPersonalInf: async (userId) => {  // Thêm tham số userId để lấy thông tin người dùng theo ID
        try {
            const query = `
                SELECT u.user_name, u.user_email, u.user_contact, u.user_birthday, u.user_address, u.full_name
                FROM users u 
                WHERE u.user_id = $1 
            `;
            const res = await db.query(query, [userId]);  // Truyền tham số userId vào câu truy vấn
            return res.rows;  // Trả về kết quả
        } catch (error) {
            console.error('Error fetching personal information:', error);
            throw error;  // Ném lỗi nếu có sự cố trong quá trình truy vấn
        }
    },
};

// Export toàn bộ mô-đun
module.exports = userModel;
