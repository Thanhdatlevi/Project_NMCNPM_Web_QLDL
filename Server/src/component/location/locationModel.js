const db = require('../../config/db');  // Import db để truy vấn cơ sở dữ liệu

const LocationModel = {
    getAllLocations: async () => {
        try {
            // Truy vấn tất cả các địa điểm từ bảng locations
            const query = 'SELECT l.location_id, l.location_name FROM locations l';
            const result = await db.query(query);  // Thực thi câu truy vấn
            return result.rows;  // Trả về kết quả
        } catch (error) {
            console.error('Error retrieving locations:', error);
            throw error;  // Ném lỗi nếu có sự cố trong quá trình truy vấn
        }
    },
};

module.exports = LocationModel;
