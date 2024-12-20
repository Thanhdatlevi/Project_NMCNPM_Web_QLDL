const db = require('../config/db');

const RestaurantModel = {
    getAllRes: async () => {
        try {
            // Truy vấn SQL lấy 3 nhà hàng có rating cao nhất
            const query = `
            SELECT * FROM restaurants r
            join facilities f on f.facility_id = r.facility_id
            join locations l on l.location_id = f.location_id
            join facility_images fi on f.facility_id = fi.facility_id and fi.img_id = 1
            ORDER BY r.restaurant_id ASC 
        `;

            const res = await db.query(query);

            return res.rows;  // Trả về kết quả chi tiết của nhà hàng
        } catch (error) {
            console.error('Error fetching popular restaurants:', error);
            throw error; // Ném lỗi nếu có lỗi xảy ra
        }
    },

    deleteRes: async (provider_id, facility_id, specificFacility_id) => {
        try {
            const deleteTablesQuery = `
                DELETE FROM tables
                WHERE restaurant_id = $1;
            `;
            await db.query(deleteTablesQuery, [specificFacility_id]);
        
            const deleteImagesQuery = `
                DELETE FROM facility_images
                WHERE facility_id = $1;
            `;
            await db.query(deleteImagesQuery, [facility_id]);
        
            const deleteRestaurantsQuery = `
                DELETE FROM restaurants
                WHERE facility_id = $1;
            `;
            await db.query(deleteRestaurantsQuery, [facility_id]);
        
            const deleteFacilitiesQuery = `
                DELETE FROM facilities
                WHERE facility_id = $1 AND provider_id = $2;
            `;
            await db.query(deleteFacilitiesQuery, [facility_id, provider_id]);
        } catch (error) {
            console.error('Error fetching popular restaurants:', error);
            throw error; // Ném lỗi nếu có lỗi xảy ra
        }
    },

    getFilterRes: async (rate, location, input) => {
        try {
            // Truy vấn SQL lấy 3 nhà hàng có rating cao nhất
            const query = `
            SELECT *, f.facility_name FROM public.restaurants r
            join facilities f on f.facility_id = r.facility_id
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
                WITH facility_images_agg AS (
                    SELECT
                        f_i.facility_id,
                        array_agg(DISTINCT f_i.img_url) AS res_images -- Gom URL ảnh duy nhất
                    FROM facility_images f_i
                    GROUP BY f_i.facility_id
                ),
                tables_agg AS (
                    SELECT
                        t.restaurant_id,
                        array_agg(
                            JSON_BUILD_OBJECT(
                                'table_id', t.table_id,
                                'price', t.price,
                                'status', t.status
                            )
                        ) AS res_tables -- Gom thông tin bàn thành mảng JSON
                    FROM tables t
                    GROUP BY t.restaurant_id
                )
                SELECT
                    f.facility_name AS res_name,
                    f.description AS res_description,
                    l.location_name AS location_name,
                    f.status AS res_status,
                    f.rating AS res_rating,
                    f.contact AS res_contact,
                    f.deal AS res_deal,
                    COALESCE(fi.res_images, '{}') AS res_images, -- URL ảnh (nếu không có thì trả về mảng rỗng)
                    r.amenities AS res_amenities,
                    COALESCE(ta.res_tables, '{}') AS res_tables -- Bàn (nếu không có thì trả về mảng rỗng)
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                JOIN locations l ON l.location_id = f.location_id
                LEFT JOIN facility_images_agg fi ON f.facility_id = fi.facility_id -- Kết nối với ảnh đã gom nhóm
                LEFT JOIN tables_agg ta ON r.restaurant_id = ta.restaurant_id -- Kết nối với bàn đã gom nhóm
                WHERE r.restaurant_id = $1;
            `;
            const res = await db.query(query, [resID]);  // Truyền tham số resID vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của nhà hàng
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            throw error;
        }
    },

    getRelatedRes: async (resID) => {
        try {
            const query = `
                SELECT
                    r.restaurant_id AS id,
                    f.facility_name AS name,
                    f.description AS description,
                    f.rating AS rating,
                    f.contact AS contact,
                    f.deal AS deal,
                    array_agg(f_i.img_url) AS images,  -- Gom các URL ảnh vào một mảng
                    r.cuisine_type AS cuisine_type,
                    r.opening_hours AS opening_hours,
                    l.location_name AS location
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                JOIN facility_images f_i ON f.facility_id = f_i.facility_id
                JOIN locations l ON l.location_id = f.location_id
                JOIN restaurants r1 ON r1.restaurant_id=$1
                JOIN facilities f1 ON r1.facility_id = f1.facility_id and l.location_id = f1.location_id
                WHERE r.restaurant_id != r1.restaurant_id
                GROUP BY
                    r.restaurant_id,
                    f.facility_name,
                    f.description,
                    f.rating,
                    f.contact,
                    f.deal,
                    r.cuisine_type ,
                    r.opening_hours,
                    l.location_name
                LIMIT 3
            `;
            const res = await db.query(query, [resID]);  // Truyền tham số resID vào câu truy vấn
            console.log(res)
            return res.rows;  // Trả về kết quả chi tiết của nhà hàng
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            throw error;
        }
    },

    getresByProviderid: async (providerID) => {
        try {
            const query = `
                SELECT 
                    r.restaurant_id AS id,
                    f.facility_id AS facid,
                    f.facility_name AS name,
                    f.description AS description,
                    l.location_name AS location,
                    f.deal AS deal,
                    f.rating AS rating,
                    array_agg(f_i.img_url) AS images
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                JOIN locations l ON l.location_id = f.location_id
                JOIN facility_images f_i ON f.facility_id = f_i.facility_id
                WHERE f.provider_id = $1
                GROUP BY
                    r.restaurant_id,
                    f.facility_id,
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