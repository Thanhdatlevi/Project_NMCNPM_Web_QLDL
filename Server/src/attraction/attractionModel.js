const db = require('../config/db');

const AttractionModel = {
    // Phương thức để lấy tất cả các facility
    get_10_PopularAttractions: async () => {
        try {
            // Truy vấn tất cả dữ liệu từ bảng facilities
            const query = `
                SELECT a.attraction_id, a.attraction_name, a.rating, a.img_url FROM attractions a
                where a.rating >= 4.5
                ORDER BY rating DESC
                LIMIT 10;
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
