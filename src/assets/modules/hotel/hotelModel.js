const db = require('../../config/db');

const HotelModel = {

    // getAllHotels: async () => {
    //     const res = await db.query('SELECT * FROM Hotel');
    //     return res.rows;
    // },

    // getHotelByName: async (hotelName) => {
    //     const res = await db.query(`
    //         SELECT * 
    //         FROM Hotel h
    //         JOIN Service s ON h."ServiceID" = s."ServiceID"
    //         where s."Name" = $1
    //     `, [hotelName]);
    //     return res.rows;
    // },

    // getHotelByID: async (hotelID) => {
    //     const res = await db.query(`
    //         SELECT *
    //         FROM Hotel
    //         WHERE "hotelID" = $1    
    //     `, [hotelID]);
    //     return res.rows;
    // }

    getPopularHotels: async () => {
        try {
            // Truy vấn SQL lấy 3 nhà hàng có rating cao nhất
            const query = `
            SELECT r.hotel_id, f.facility_name, f.deal, i.img_url
            FROM hotels r
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
// Test hàm ngay trong file
(async () => {
    try {
        const popularHotels = await HotelModel.getPopularHotels();
        console.log('Popular Attractions:', popularHotels);
    } catch (error) {
        console.error('Error during test:', error);
    }
})();
module.exports = HotelModel;