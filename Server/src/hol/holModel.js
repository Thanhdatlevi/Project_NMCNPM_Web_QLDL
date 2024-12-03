const db = require('../config/db');

const HotelModel = {
    getAllHotel: async () => {
        try {
            // Truy vấn SQL lấy 3 nhà hàng có rating cao nhất
            const query = `
            SELECT * FROM public.hotels
            ORDER BY hotel_id ASC 
        `;

            const res = await db.query(query);  // Truyền tham số hotelID vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của khách sạn
        } catch (error) {
            console.error('Error fetching hotel details:', error);
            throw error;
        }
    },
    getFilterHotel: async (rate, location, input) => {
        try {
            // Truy vấn SQL lấy 3 nhà hàng có rating cao nhất
            const query = `
            SELECT *, f.facility_name FROM public.hotels h
            join facilities f on f.facility_id = h.facility_id
            join locations l on l.location_id = f.location_id
            join facility_images fi on fi.facility_id = f.facility_id and fi.img_id = 1
            WHERE (($1 = -1) OR (f.rating >= $1 AND f.rating <= $1+1))
            and (($2 = 'default') OR (l.location_name LIKE '%' || $2 || '%'))
            and (($3 = 'default') OR (f.facility_name LIKE '%' || $3 || '%') OR (f.description LIKE '%' || $3 || '%'))
        `;
            const values = [rate, location, input];
            const res = await db.query(query, values);  // Truyền tham số hotelID vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của khách sạn
        } catch (error) {
            console.error('Error fetching hotel details:', error);
            throw error;
        }
    },
    get_3_PopularHotels: async () => {
        try {
            // Truy vấn SQL lấy 3 nhà hàng có rating cao nhất
            const query = `
            SELECT r.hotel_id, f.facility_name as hotel_name, f.deal as hotel_deal, i.img_url as hotel_img
            FROM hotels r
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

    getHotelByID: async (hotelID) => {
        try {
            const query = `
            WITH facility_images_agg AS (
                SELECT
                    f_i.facility_id,
                    array_agg(DISTINCT f_i.img_url) AS hotel_images -- Gom URL ảnh duy nhất
                FROM facility_images f_i
                GROUP BY f_i.facility_id
            ),
            rooms_agg AS (
                SELECT
                    r.hotel_id,
                    array_agg(
                        JSON_BUILD_OBJECT(
                            'room_id', r.room_id,
                            'price', r.price,
                            'status', r.status
                        )
                    ) AS hotel_rooms -- Gom thông tin phòng thành mảng JSON
                FROM rooms r
                GROUP BY r.hotel_id
            )
            SELECT
                f.facility_name AS hotel_name,
                f.description AS hotel_description,
                l.location_name AS location_name,
                f.status AS hotel_status,
                f.rating AS hotel_rating,
                f.contact AS hotel_contact,
                f.deal AS hotel_deal,
                COALESCE(fi.hotel_images, '{}') AS hotel_images, -- URL ảnh (nếu không có thì trả về mảng rỗng)
                h.amenities AS hotel_amenities,
                COALESCE(ra.hotel_rooms, '{}') AS hotel_rooms -- Phòng (nếu không có thì trả về mảng rỗng)
            FROM hotels h
            JOIN facilities f ON h.facility_id = f.facility_id
            JOIN locations l ON l.location_id = f.location_id
            LEFT JOIN facility_images_agg fi ON f.facility_id = fi.facility_id -- Kết nối với ảnh đã gom nhóm
            LEFT JOIN rooms_agg ra ON h.hotel_id = ra.hotel_id -- Kết nối với phòng đã gom nhóm
            WHERE h.hotel_id = $1; -- Thay bằng ID khách sạn cụ thể nếu cần
            `;
            const res = await db.query(query, [hotelID]);  // Truyền tham số hotelID vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của khách sạn
        } catch (error) {
            console.error('Error fetching hotel details:', error);
            throw error;
        }
    },

    getRelatedHotel: async (hotelID) => {
        try {
            const query = `
            SELECT
                h.hotel_id AS id,
                f.facility_name AS name,
                f.description AS description,
                f.rating AS rating,
                f.contact AS contact,
                f.deal AS  deal,
                array_agg(f_i.img_url) AS images,
                h.number_of_rooms AS total_rooms,
                h.available_rooms AS available_rooms,
                l.location_name AS location
            FROM hotels h
            JOIN facilities f ON h.facility_id = f.facility_id
            JOIN facility_images f_i ON f.facility_id = f_i.facility_id
            JOIN locations l ON l.location_id = f.location_id
            JOIN hotels h1 ON h1.hotel_id=$1
            JOIN facilities f1 ON h1.facility_id = f1.facility_id and l.location_id = f1.location_id
            WHERE h.hotel_id != h1.hotel_id
            GROUP BY
                h.hotel_id,
                f.facility_name,
                f.description,
                f.rating,
                f.contact,
                f.deal,
                h.number_of_rooms,
                h.available_rooms,
                l.location_name
            LIMIT 3
            `;
            const res = await db.query(query, [hotelID]);  // Truyền tham số hotelID vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của khách sạn
        } catch (error) {
            console.error('Error fetching hotel details:', error);
            throw error;
        }
    },

    getHotelsByLocationID: async (locationId) => {
        try {
            const query = `
                SELECT f.facility_name as hotel_name, h.hotel_id
                FROM hotels h
                JOIN facilities f ON h.facility_id = f.facility_id
                WHERE f.location_id = $1
            `;
            const result = await db.query(query, [locationId]);
            return result.rows;  // Trả về kết quả truy vấn
        } catch (error) {
            console.error('Error fetching hotels by location:', error);
            throw error;  // Ném lỗi nếu có vấn đề với truy vấn
        }
    },

    getHotelByProviderid: async (providerID) => {
        try {
            const query = `
                SELECT
                    h.hotel_id AS id,
                    f.facility_name AS name,
                    f.description AS description,
                    l.location_name AS location,
                    f.deal AS deal,
                    f.rating AS rating,
                    array_agg(f_i.img_url) AS images
                FROM hotels h
                JOIN facilities f ON h.facility_id = f.facility_id
                JOIN locations l ON l.location_id = f.location_id
                JOIN facility_images f_i ON f.facility_id = f_i.facility_id
                WHERE f.provider_id = $1
                GROUP BY
                    h.hotel_id,
                    f.facility_name,
                    f.description,
                    l.location_name,
                    f.rating,
                    f.deal
            `;
            const result = await db.query(query, [providerID]);  // Truyền locationId vào câu truy vấn
            return result.rows;  // Trả về danh sách nhà hàng
        } catch (error) {
            console.error('Error fetching restaurants by location:', error);
            throw error;  // Ném lỗi nếu có sự cố trong quá trình truy vấn
        }
    },
};
module.exports = HotelModel;