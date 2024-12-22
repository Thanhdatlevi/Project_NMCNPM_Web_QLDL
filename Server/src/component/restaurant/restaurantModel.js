const db = require('../../config/db');

class RestaurantModel {
    // Lọc nhà hàng theo tiêu chí
    static async getFilterRes(rate, location, input) {
        try {
            const query = `
                SELECT *, f.facility_name FROM public.restaurants r
                JOIN facilities f ON f.facility_id = r.facility_id
                JOIN locations l ON l.location_id = f.location_id
                JOIN facility_images fi ON fi.facility_id = f.facility_id AND fi.img_id = 1
                WHERE (($1 = -1) OR (f.rating >= $1 AND f.rating <= $1+1))
                AND (($2 = 'default') OR (l.location_name LIKE '%' || $2 || '%'))
                AND (($3 = 'default') OR (f.facility_name LIKE '%' || $3 || '%') OR (f.description LIKE '%' || $3 || '%'));
            `;
            const values = [rate, location, input];
            const res = await db.query(query, values);
            return res.rows;
        } catch (error) {
            console.error('Error filtering restaurants:', error);
            throw error;
        }
    }

    static async getRestaurantsTotal() {
        try {
            const query = `SELECT COUNT(*) AS total_rows FROM restaurants;`
            const res = await db.query(query);
            if (res.rows.length > 0) {
                const total = { total: res.rows[0].total_rows }
                return total;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    // Lấy nhà hàng theo provider ID
    static async getRestaurantByProviderId(providerId) {
        try {
            const query = `
            SELECT 
                r.restaurant_id AS res_id,
                f.facility_name AS res_name,
                l.location_name AS location,
                f.deal AS res_deal,
                f.rating AS res_rating,
                array_agg(f_i.img_url) AS images
            FROM restaurants r
            JOIN facilities f ON r.facility_id = f.facility_id
            JOIN locations l ON l.location_id = f.location_id
            JOIN facility_images f_i ON f.facility_id = f_i.facility_id
            WHERE f.provider_id = $1
            GROUP BY
                r.restaurant_id, f.facility_name,
                l.location_name, f.rating, f.deal;
        `;
            const res = await db.query(query, [providerId]);
            if (res.rows.length > 0) {
                const restaurants = res.rows.map(row => ({
                    restaurantId: row.res_id,
                    restaurantName: row.res_name,
                    location: row.location,
                    deal: row.res_deal,
                    rating: row.res_rating,
                    images: row.images || [], // Nếu không có ảnh, trả về mảng rỗng
                }));
                return restaurants;
            }
            return null;
        } catch (error) {
            console.error('Error getRestaurantByProviderId in restaurantModel:', error);
            throw error;
        }
    }

    static async getRestaurantsByPage(limit, offset) {
        try {
            const query = `
                SELECT r.restaurant_id AS res_id, 
                       f.facility_name AS res_name,
                       f.deal AS deal,
                       f.rating AS rating,
                       array_agg(i.img_url) AS images
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                LEFT JOIN facility_images i ON f.facility_id = i.facility_id
                GROUP BY r.restaurant_id, f.facility_name, f.deal, f.rating
                ORDER BY r.restaurant_id
                LIMIT $1 OFFSET $2`;
            const res = await db.query(query, [limit, offset]);
            if (res.rows.length > 0) {
                const restaurants = res.rows.map(row => ({
                    restaurantId: row.res_id,
                    restaurantName: row.res_name,
                    restaurantDeal: row.deal,
                    restaurantRating: row.rating,
                    restaurantImages: row.images || []
                }));
                return restaurants;
            }
            return null;
        } catch (error) {
            console.log("Error getRestaurantsByPage in restaurantModel: ", error.message);
            throw error;
        }
    }

    // Lấy 3 nhà hàng phổ biến
    static async get3PopularRestaurants() {
        try {
            const query = `
                SELECT r.restaurant_id, f.facility_name AS restaurant_name, f.deal AS restaurant_deal, i.img_url AS res_img
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                LEFT JOIN facility_images i ON f.facility_id = i.facility_id
                WHERE i.img_id = 1 AND f.rating >= 4.5
                ORDER BY f.rating DESC
                LIMIT 3;
            `;
            const res = await db.query(query);
            const popularRestaurants = res.rows.map(row => ({
                restaurantId: row.restaurant_id,
                restaurantName: row.restaurant_name,
                restaurantDeal: row.restaurant_deal,
                restaurantImage: row.res_img
            }));
            return popularRestaurants;
        } catch (error) {
            console.error('Error get3PopularRestaurants in restaurantModel:', error);
            throw error;
        }
    }

    // Lấy thông tin chi tiết nhà hàng theo ID cho role provider
    static async getRestaurantById_provider(resId) {
        try {
            const query = `
                WITH facility_images_agg AS (
                    SELECT f_i.facility_id, array_agg(DISTINCT f_i.img_url) AS res_images
                    FROM facility_images f_i
                    GROUP BY f_i.facility_id
                ),
                tables_agg AS (
                    SELECT t.restaurant_id, array_agg(
                        JSON_BUILD_OBJECT( 
                        'table_id', t.table_id, 'price', t.price, 'status', t.status, 'bookedDates', t.dates_booked
                        )) AS res_tables
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
                    f.specific_location AS res_specific_location,
                    COALESCE(fi.res_images, '{}') AS res_images,
                    r.amenities AS res_amenities,
                    r.average_price AS res_average_price,
                    COALESCE(ta.res_tables, '{}') AS res_tables
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                JOIN locations l ON l.location_id = f.location_id
                LEFT JOIN facility_images_agg fi ON f.facility_id = fi.facility_id
                LEFT JOIN tables_agg ta ON r.restaurant_id = ta.restaurant_id
                WHERE r.restaurant_id = $1;
            `;
            const res = await db.query(query, [resId]);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                const restaurantDetails = {
                    resName: row.res_name,
                    resDescription: row.res_description,
                    resLocation: row.location_name,
                    resStatus: row.res_status,
                    resRating: row.res_rating,
                    resContact: row.res_contact,
                    resDeal: row.res_deal,
                    resSpecificLocation: row.res_specific_location,
                    resImages: row.res_images,
                    resAmenities: row.res_amenities,
                    resAveragePrice: row.res_average_price,
                    resTables: row.res_tables
                };
                return restaurantDetails;
            }
            return null;
        } catch (error) {
            console.error('Error getRestaurantByID_provider in restaurantModel:', error);
            throw error;
        }
    }

    // Lấy thông tin chi tiết nhà hàng theo ID cho role tourist
    static async getRestaurantById_tourist(resId) {
        try {
            const query = `
                WITH facility_images_agg AS (
                    SELECT
                        f_i.facility_id,
                        array_agg(DISTINCT f_i.img_url) AS res_images -- Gom URL ảnh duy nhất
                    FROM facility_images f_i
                    GROUP BY f_i.facility_id
                )
                SELECT
                    f.facility_name AS res_name,
                    f.description AS res_description,
                    l.location_name AS location_name,
                    f.status AS res_status,
                    f.rating AS res_rating,
                    f.contact AS res_contact,
                    f.deal AS res_deal,
                    f.specific_location AS res_specific_location,
                    COALESCE(fi.res_images, '{}') AS res_images, -- URL ảnh (nếu không có thì trả về mảng rỗng)
                    r.amenities AS res_amenities,
                    r.average_price AS res_average_price
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                JOIN locations l ON l.location_id = f.location_id
                LEFT JOIN facility_images_agg fi ON f.facility_id = fi.facility_id -- Kết nối với ảnh đã gom nhóm
                WHERE r.restaurant_id = $1;
            `;
            const res = await db.query(query, [resId]);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                const restaurantDetails = {
                    name: row.res_name,
                    description: row.res_description,
                    location: row.location_name,
                    status: row.res_status,
                    rating: row.res_rating,
                    contact: row.res_contact,
                    deal: row.res_deal,
                    specificLocation: row.res_specific_location,
                    images: row.res_images,
                    amenities: row.res_amenities,
                    averagePrice: row.res_average_price,
                };
                return restaurantDetails;
            }
            return null;
        } catch (error) {
            console.log("Error getRestaurantById_tourist in restaurantModel: ", error.message);
            throw error;
        }
    }

    static async getLocationIdOfRestaurant(resId) {
        try {
            const locationQuery = `
                SELECT f.location_id
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                WHERE r.restaurant_id = $1;
            `;
            const locationResult = await db.query(locationQuery, [resId]);
            if (locationResult.rows.length === 0) {
                return null;
            }
            return { locationId: locationResult.rows[0].location_id }
        } catch (error) {
            console.error('Error in getLocationIdOfRestaurant in restaurantModel:', error);
            throw error;
        }
    }

    static async getRelatedRestaurantAboutLocation(resId, locationId) {
        try {
            const query = `
               SELECT
                    r.restaurant_id AS res_id,
                    f.facility_name AS res_name,
                    f.rating AS res_rating,
                    f.deal AS res_deal,
                    array_agg(f_i.img_url) AS res_images
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                JOIN facility_images f_i ON f.facility_id = f_i.facility_id
                WHERE f.location_id = $2 AND r.restaurant_id != $1
                GROUP BY
                    r.restaurant_id, f.facility_name, f.rating, f.deal
                LIMIT 3;
            `;
            const res = await db.query(query, [resId, locationId]);
            if (res.rows.length > 0) {
                const relatedRestaurantAboutLocationArray = res.rows.map(row => ({
                    resId: row.res_id,
                    resName: row.res_name,
                    resRating: row.res_rating,
                    resDeal: row.res_deal,
                    resImages: row.res_images
                }));

                return relatedRestaurantAboutLocationArray;
            }
            return null;
        } catch (error) {
            console.error('Error getRelatedResAboutLocation in restaurantModel:', error);
            throw error;
        }
    }

    // Lấy nhà hàng theo vị trí
    static async getRestaurantsByLocation(locationId) {
        try {
            const query = `
                SELECT f.facility_name AS restaurant_name, r.restaurant_id
                FROM restaurants r
                JOIN facilities f ON r.facility_id = f.facility_id
                WHERE f.location_id = $1;
            `;
            const res = await db.query(query, [locationId]);
            if (res.rows.length > 0) {
                const restaurants = res.rows.map(row => ({
                    restaurantId: row.restaurant_id,
                    restaurantName: row.restaurant_name
                }));
                return restaurants;
            }
            return null;
        } catch (error) {
            console.error('Error getRestaurantsByLocation in restaurantModel:', error);
            throw error;
        }
    }

    static async getFacilityIdByRestaurantId(restaurantId) {
        try {
            const query = `SELECT facility_id FROM restaurants WHERE restaurant_id = $1`;
            const result = await db.query(query, [restaurantId]);
            if (result.rows.length > 0) {
                return result.rows[0].facility_id;
            }
            return null;
        } catch (error) {
            console.log("Error in RestaurantModel.getFacilityIdByRestaurantId: ", error);
            throw error;
        }
    }

    static async updateRestaurant(restaurantId, amenities, averagePrice) {
        try {
            const fieldsToUpdate = [];
            const values = [];
            let index = 1;

            if (amenities !== undefined) {
                fieldsToUpdate.push(`amenities = $${index}`);
                values.push(amenities);
                index++;
            }
            if (averagePrice !== undefined) {
                fieldsToUpdate.push(`average_price = $${index}`);
                values.push(averagePrice);
                index++;
            }

            if (fieldsToUpdate.length === 0) {
                return false;
            }

            values.push(restaurantId);
            const query = `UPDATE restaurants SET ${fieldsToUpdate.join(', ')} WHERE restaurant_id = $${index}`;
            const result = await db.query(query, values);

            if (result.rowCount > 0) {
                return true;
            }
            return false;

        } catch (error) {
            console.log("Error in RestaurantModel.updateRestaurant: ", error);
            throw error;
        }
    }

    static async getRelatedRes(resID) {
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
                    l.location_name
                LIMIT 3
            `;
            const res = await db.query(query, [resID]);  // Truyền tham số resID vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của nhà hàng
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            throw error;
        }
    }
}

module.exports = RestaurantModel;
