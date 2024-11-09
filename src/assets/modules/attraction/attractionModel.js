const db = require('../../config/db');

const AttractionModel = {
    // Phương thức để lấy tất cả các facility
    getPopularAttractions: async () => {
        try {
            // Truy vấn tất cả dữ liệu từ bảng facilities
            const query = `
                SELECT * FROM attractions
                ORDER BY rating DESC
                LIMIT 6;
            `;
            const res = await db.query(query);  // Thực thi câu truy vấn
            return res.rows;  // Trả về tất cả các hàng dữ liệu
        } catch (error) {
            console.error('Error fetching all facilities:', error);
            throw error;  // Ném lỗi nếu có sự cố trong quá trình truy vấn
        }
    },
};



module.exports = AttractionModel;
