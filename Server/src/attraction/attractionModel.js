const db = require('../config/db');

const AttractionModel = {
    // Phương thức để lấy tất cả các facility
    get_10_PopularAttractions: async () => {
        try {
            // Truy vấn tất cả dữ liệu từ bảng facilities
            const query = `
                SELECT a.attraction_id, a.attraction_name, a.rating, a.img_url, a.description, a.opening_hours FROM attractions a
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
    getAllAttraction: async () => {
        try {
            // Truy vấn tất cả dữ liệu từ bảng facilities
            const query = `
                SELECT * FROM public.attractions
                ORDER BY attraction_id ASC 
            `;
            const res = await db.query(query);  // Thực thi câu truy vấn
            return res.rows;  // Trả về tất cả các hàng dữ liệu
        } catch (error) {
            console.error('Error fetching all facilities:', error);
            throw error;  // Ném lỗi nếu có sự cố trong quá trình truy vấn
        }
    },
    getFilterAttraction: async (rate,location,input) => {
        const query = `
            SELECT * FROM public.attractions a
            join locations l on l.location_id = a.location_id
            WHERE (($1 = -1) OR (a.rating >= $1 AND a.rating <= $1+1))
            and (($2 = 'default') OR (l.location_name LIKE '%' || $2 || '%'))
            and (($3 = 'default') OR (a.attraction_name LIKE '%' || $3 || '%') OR (a.description LIKE '%' || $3 || '%'))
        `
            const values = [rate, location,input];
        try {
            const result = await db.query(query, values); // Remove values here
            return result.rows;
        } catch (err) {
            throw new Error('Error fetching tours by location: ' + err.message);
        }
    },
};



module.exports = AttractionModel;
