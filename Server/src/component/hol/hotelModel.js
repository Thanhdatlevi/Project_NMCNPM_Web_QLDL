const db = require('../../config/db');
const FacilityModel = require('../facility/facilityModel');
class HotelModel {

    static async get3PopularHotels() {
        try {
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
            const popularHotels = res.rows.map(row => ({
                holtelId: row.hotel_id,
                hotelName: row.hotel_name,
                hotelDeal: row.hotel_deal,
                hotelImage: row.hotel_img
            }));
            return popularHotels;
        } catch (error) {
            console.error('Error get3PopularRestaurants in restaurantModel:', error);
            throw error;
        }
    }

    static async getHotelsTotal() {
        try {
            const query = `SELECT COUNT(*) AS total_rows FROM hotels;`
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

    static async getHotelsByPage(limit, offset) {
        try {
            const query = `
                SELECT h.hotel_id AS id, 
                       f.facility_name name,
                       f.deal AS deal,
                       f.rating AS rating,
                       array_agg(i.img_url) AS images
                FROM hotels h
                JOIN facilities f ON h.facility_id = f.facility_id
                LEFT JOIN facility_images i ON f.facility_id = i.facility_id
                GROUP BY h.hotel_id, f.facility_name, f.deal, f.rating
                ORDER BY h.hotel_id
                LIMIT $1 OFFSET $2`;
            const res = await db.query(query, [limit, offset]);
            if (res.rows.length > 0) {
                const hotels = res.rows.map(row => ({
                    hotelId: row.id,
                    hotelName: row.name,
                    hotelDeal: row.deal,
                    hotelRating: row.rating,
                    hotelImages: row.images || []
                }));
                return hotels;
            }
            return null;
        } catch (error) {
            console.log("Error getHotelsByPage hotelModel: ", error.message);
            throw error;
        }
    }

    static async getHotelById_tourist(holId) {
        try {
            const query = `
                WITH facility_images_agg AS (
                    SELECT
                        f_i.facility_id,
                        array_agg(DISTINCT f_i.img_url) AS images -- Gom URL ảnh duy nhất
                    FROM facility_images f_i
                    GROUP BY f_i.facility_id
                )
                SELECT
                    f.facility_name AS name,
                    f.description AS description,
                    f.location_id as location_id,
                    l.location_name AS location_name,
                    f.status AS status,
                    f.rating AS rating,
                    f.contact AS contact,
                    f.deal AS deal,
                    f.specific_location AS specific_location,
                    COALESCE(fi.images, '{}') AS images, -- URL ảnh (nếu không có thì trả về mảng rỗng)
                    h.amenities AS amenities,
                    h.average_price AS average_price,
                    h.facility_id as facility_id
                FROM hotels h
                JOIN facilities f ON h.facility_id = f.facility_id
                JOIN locations l ON l.location_id = f.location_id
                LEFT JOIN facility_images_agg fi ON f.facility_id = fi.facility_id -- Kết nối với ảnh đã gom nhóm
                WHERE h.hotel_id = $1;
            `;
            const res = await db.query(query, [holId]);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                const hotelDetail = {
                    name: row.name,
                    description: row.description,
                    facilityId: row.facility_id,
                    locationId: row.location_id,
                    location: row.location_name,
                    status: row.status,
                    rating: row.rating,
                    contact: row.contact,
                    deal: row.deal,
                    specificLocation: row.specific_location,
                    images: row.images,
                    amenities: row.amenities,
                    averagePrice: row.average_price,
                };
                return hotelDetail;
            }
            return null;
        } catch (error) {
            console.log("Error getHotelById_tourist in hotelModel");
            throw error;
        }
    }

    static async getHotelById_provider(holId) {
        const query = `
                WITH facility_images_agg AS (
                    SELECT f_i.facility_id, array_agg(DISTINCT f_i.img_url) AS images
                    FROM facility_images f_i
                    GROUP BY f_i.facility_id
                ),
                rooms_agg AS (
                    SELECT r.hotel_id, array_agg(
                        JSON_BUILD_OBJECT( 'roomId', r.room_id, 'price', r.price, 'status', r.status
                        )) AS rooms
                    FROM rooms r
                    GROUP BY r.hotel_id
                )
                SELECT
                    f.facility_name AS name,
                    f.description AS description,
                    l.location_name AS location_name,
                    f.status AS status,
                    f.rating AS rating,
                    f.contact AS contact,
                    f.deal AS deal,
                    f.specific_location AS specific_location,
                    COALESCE(fi.images, '{}') AS images,
                    h.amenities AS amenities,
                    h.average_price AS average_price,
                    COALESCE(ta.rooms, '{}') AS rooms
                FROM hotels h
                JOIN facilities f ON h.facility_id = f.facility_id
                JOIN locations l ON l.location_id = f.location_id
                LEFT JOIN facility_images_agg fi ON f.facility_id = fi.facility_id
                LEFT JOIN rooms_agg ta ON h.hotel_id = ta.hotel_id
                WHERE h.hotel_id = $1;
            `;
        const res = await db.query(query, [holId]);
        if (res.rows.length > 0) {
            const row = res.rows[0];
            const hotelDetails = {
                hotelName: row.name,
                hotelDescription: row.description,
                hotelLocation: row.location_name,
                hotelStatus: row.status,
                hotelRating: row.rating,
                hotelContact: row.contact,
                hotelDeal: row.deal,
                hotelSpecificLocation: row.specific_location,
                hotelImages: row.images,
                hotelAmenities: row.amenities,
                hotelAveragePrice: row.average_price,
                hotelRooms: row.rooms
            };
            return hotelDetails;
        }
        return null;
    } catch(error) {
        console.error('Error getHotelById_provider in restaurantModel:', error);
        throw error;
    }

    static async getHotelsByLocation(locationId) {
        try {
            const query = `
                SELECT f.facility_name AS name, h.hotel_id
                FROM hotels h
                JOIN facilities f ON h.facility_id = f.facility_id
                WHERE f.location_id = $1;
            `;
            const res = await db.query(query, [locationId]);

            if (res.rows.length > 0) {
                const hotels = res.rows.map(row => ({
                    hotelId: row.hotel_id,
                    hotelName: row.name,
                }));
                return hotels;
            }
            return null;
        } catch (error) {
            console.error('Error getHotelsByLocation in hotelModel:', error);
            throw error;
        }
    }

    static async getHotelsByProviderId(providerId) {
        try {
            const query = `
            SELECT 
                h.hotel_id AS id,
                f.facility_name AS name,
                f.facility_id as facility_id,
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
                h.hotel_id, f.facility_name, f.facility_id,
                l.location_name, f.rating, f.deal;
        `;
            const res = await db.query(query, [providerId]);
            if (res.rows.length > 0) {
                const hotels = res.rows.map(row => ({
                    facilityId: row.facility_id,
                    hotelId: row.id,
                    hotelName: row.name,
                    location: row.location,
                    deal: row.deal,
                    rating: row.rating,
                    images: row.images || [], // Nếu không có ảnh, trả về mảng rỗng
                }));
                return hotels;
            }
            return null;
        } catch (error) {
            console.error('Error getHotelsByProviderId in hotelModel:', error);
            throw error;
        }
    }

    static async getFilterHotel(rate, location, input) {
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
    }

    static async getFacilityIdByHotelId(hotelId) {
        try {
            const query = `SELECT facility_id FROM hotels WHERE hotel_id = $1`;
            const result = await db.query(query, [hotelId]);
            if (result.rows.length > 0) {
                return result.rows[0].facility_id;
            }
            return null;
        } catch (error) {
            console.log("Error in HotelModel.getFacilityIdByHotelId: ", error);
            throw error;
        }
    }

    static async updateHotel(hotelId, amenities, averagePrice) {
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

            values.push(hotelId);
            const query = ` UPDATE hotels SET ${fieldsToUpdate.join(', ')} WHERE hotel_id = $${index}`;
            const result = await db.query(query, values);
            if (result.rowCount > 0) {
                return true;
            }
            return false;

        } catch (error) {
            console.log('Error in HotelModel.updateHotel: ', error);
            throw error;
        }
    }

    static async getRelatedHotel(hotelID) {
        try {
            const query = `
            SELECT
                h.hotel_id AS id,
                f.facility_id AS facid,
                f.facility_name AS name,
                f.description AS description,
                f.rating AS rating,
                f.contact AS contact,
                f.deal AS  deal,
                array_agg(f_i.img_url) AS images,
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
                f.facility_id,
                f.facility_name,
                f.description,
                f.rating,
                f.contact,
                f.deal,
                l.location_name
            LIMIT 3
            `;
            const res = await db.query(query, [hotelID]);  // Truyền tham số hotelID vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của khách sạn
        } catch (error) {
            console.error('Error fetching hotel details:', error);
            throw error;
        }
    }

    static async insertHotel(facilityId) {
        try {
            const hotelQuery = `INSERT INTO hotels (facility_id) VALUES ($1) RETURNING hotel_id;`;
            const result = await db.query(hotelQuery, [facilityId]);
            return result.rows[0]?.hotel_id || null;
        } catch (error) {
            console.error("Error in HotelModel.insertHotel:", error.message);
            throw error;
        }
    }


}


module.exports = HotelModel