const db = require('../config/db');

const RestaurantModel = {

    get_3_PopularRestaurants: async () => {
        try {
            // Truy vấn SQL lấy 3 nhà hàng có rating cao nhất
            const query = `
            SELECT r.restaurant_id, f.facility_name as restaurant_name, f.deal as restaurant_deal, i.img_url as res_img
            FROM restaurants r
            JOIN facilities f ON r.facility_id = f.facility_id
            LEFT JOIN facility_images i ON f.facility_id = i.facility_id
            WHERE i.img_id = 1 and f.rating >= 4.5
            ORDER BY f.rating DESC
            LIMIT 3;
        `;

            const res = await db.query(query);

            // Kiểm tra nếu có kết quả trả về
            if (res.rows.length > 0) {
                return res.rows; // Trả về danh sách 3 nhà hàng có rating cao nhất
            } else {
                return []; // Trả về mảng rỗng nếu không có kết quả
            }
        } catch (error) {
            console.error('Error fetching popular restaurants:', error);
            throw error; // Ném lỗi nếu có lỗi xảy ra
        }
    },

    getRestaurantByID: async (resID) => {
        try {
            const query = `
                SELECT
                    f.facility_name AS restaurant_name,
                    f.description AS restaurant_description,
                    f.rating AS restaurant_rating,
                    f.contact AS restaurant_contact,
                    f.deal AS restaurant_deal,
                    array_agg(f_i.img_url) AS res_images,  -- Gom các URL ảnh vào một mảng
                    r.cuisine_type AS restaurant_cuisine_type,
                    r.opening_hours AS restaurant_opening_hours,
                    l.location_name AS restaurant_location
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                JOIN facility_images f_i ON f.facility_id = f_i.facility_id
                JOIN locations l ON l.location_id = f.location_id
                WHERE r.restaurant_ID = $1
                GROUP BY
                    f.facility_name,
                    f.description,
                    f.rating,
                    f.contact,
                    f.deal,
                    r.cuisine_type ,
                    r.opening_hours,
                    l.location_name

            `;
            const res = await db.query(query, [resID]);  // Truyền tham số resID vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của nhà hàng
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            throw error;
        }
    },


    getRestaurantsByLocation: async (locationId) => {
        try {
            const query = `
                SELECT f.facility_name as restaurant_name, r.restaurant_id
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                WHERE f.location_id = $1
            `;
            const result = await db.query(query, [locationId]);  // Truyền locationId vào câu truy vấn
            return result.rows;  // Trả về danh sách nhà hàng
        } catch (error) {
            console.error('Error fetching restaurants by location:', error);
            throw error;  // Ném lỗi nếu có sự cố trong quá trình truy vấn
        }
    },

};

module.exports = RestaurantModel;