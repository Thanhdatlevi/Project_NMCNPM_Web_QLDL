const db = require('../../config/db');

const RestaurantModel = {

    // getAllRestaurant: async () => {
    //     const res = await db.query(`
    //         SELECT *
    //         FROM Restaurant    
    //     `);
    //     return res.rows;
    // },

    // getRestaurantByID: async (RestaurantID) => {
    //     const res = await db.query(`
    //         SELECT *
    //         FROM Restaurant
    //         WHERE "RestaurantID" = $1 
    //     `, [RestaurantID]);
    //     return res.rows;
    // },

    // getRestaurantByName: async (RestaurantName) => {
    //     const res = await db.query(`
    //         SELECT *
    //         FROM Restaurant r
    //         JOIN Service s ON s."ServiceID" = r."ServiceID"
    //         WHERE s."Name" = $1
    //     `, [RestaurantName]);
    //     return res.rows;
    // },

    getPopularRestaurants: async () => {
        try {
            // Truy vấn SQL lấy 3 nhà hàng có rating cao nhất
            const query = `
            SELECT r.restaurant_id, f.facility_name, f.deal
            FROM restaurants r
            JOIN facilities f ON r.facility_id = f.facility_id
            LEFT JOIN facility_images i ON f.facility_id = i.facility_id
            WHERE i.img_id = 1
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
    }

};

module.exports = RestaurantModel;