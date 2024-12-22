// const db = require('../../config/db');

// const AttractionModel = {
//     // Phương thức để lấy tất cả các facility
//     get_10_PopularAttractions: async () => {
//         try {
//             // Truy vấn tất cả dữ liệu từ bảng facilities
//             const query = `
//                 SELECT a.attraction_id, a.attraction_name, a.rating, a.img_url, a.description, a.opening_hours FROM attractions a
//                 where a.rating >= 4.5
//                 ORDER BY rating DESC
//                 LIMIT 10;
//             `;
//             const res = await db.query(query);  // Thực thi câu truy vấn
//             return res.rows;  // Trả về tất cả các hàng dữ liệu
//         } catch (error) {
//             console.error('Error fetching all facilities:', error);
//             throw error;  // Ném lỗi nếu có sự cố trong quá trình truy vấn
//         }
//     },
//     getAllAttraction: async () => {
//         try {
//             // Truy vấn tất cả dữ liệu từ bảng facilities
//             const query = `
//                 SELECT * FROM public.attractions
//                 ORDER BY attraction_id ASC 
//             `;
//             const res = await db.query(query);  // Thực thi câu truy vấn
//             return res.rows;  // Trả về tất cả các hàng dữ liệu
//         } catch (error) {
//             console.error('Error fetching all facilities:', error);
//             throw error;  // Ném lỗi nếu có sự cố trong quá trình truy vấn
//         }
//     },
//     getFilterAttraction: async (rate, location, input) => {
//         const query = `
//             SELECT * FROM public.attractions a
//             join locations l on l.location_id = a.location_id
//             WHERE (($1 = -1) OR (a.rating >= $1 AND a.rating <= $1+1))
//             and (($2 = 'default') OR (l.location_name LIKE '%' || $2 || '%'))
//             and (($3 = 'default') OR (a.attraction_name LIKE '%' || $3 || '%') OR (a.description LIKE '%' || $3 || '%'))
//         `
//         const values = [rate, location, input];
//         try {
//             const result = await db.query(query, values); // Remove values here
//             return result.rows;
//         } catch (err) {
//             throw new Error('Error fetching tours by location: ' + err.message);
//         }
//     },
//     getAttractionByID: async (attractionID) => {
//         try {
//             const query = `
//                 SELECT
//                     a.attraction_name AS name,
//                     a.description AS description,
//                     a.rating AS rating,
//                     a.contact AS contact,
//                     a.opening_hours AS opening_hours,
//                     a.img_url AS attractionimage,
//                     l.location_name AS location
//                 FROM attractions a
//                 JOIN locations l ON l.location_id = a.location_id
//                 WHERE a.attraction_ID = $1
//                 GROUP BY
//                     a.attraction_name,
//                     a.description,
//                     a.rating,
//                     a.contact,
//                     a.img_url,
//                     a.opening_hours,
//                     l.location_name

//             `;
//             const res = await db.query(query, [attractionID]);
//             return res.rows;
//         } catch (error) {
//             console.error('Error fetching restaurant details:', error);
//             throw error;
//         }
//     },
//     getRelatedAttraction: async (attractionID) => {
//         try {
//             const query = `
//                     SELECT
//                     a.attraction_id AS id,
//                     a.attraction_name AS name,
//                     a.description AS description,
//                     a.rating AS rating,
//                     a.img_url AS images,
//                     l.location_name AS location
//                 FROM attractions a
//                 JOIN locations l ON l.location_id = a.location_id
//                 JOIN attractions re ON re.attraction_id = $1 and re.location_id = l.location_id
//                 WHERE a.attraction_id != re.attraction_id
//                 LIMIT 3
//             `;
//             const res = await db.query(query, [attractionID]);
//             return res.rows;
//         } catch (error) {
//             console.error('Error fetching restaurant details:', error);
//             throw error;
//         }
//     },
// };



// module.exports = AttractionModel;


const db = require('../../config/db');

class AttractionModel {

    static async getAttractionById(attractionId) {
        try {
            const query = `
                SELECT
                    a.attraction_name AS name,
                    a.description AS description,
                    a.rating AS rating,
                    a.contact AS contact,
                    a.opening_hours AS opening_hours,
                    a.img_url AS attractionimage,
                    a.location_id as location_id,
                    l.location_name AS location,
                    a.detailed_location as detailed_location
                FROM attractions a
                JOIN locations l ON l.location_id = a.location_id
                WHERE a.attraction_ID = $1
            `;
            const res = await db.query(query, [attractionId]);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                const attraction = {
                    attractionName: row.name,
                    attractionDescription: row.description,
                    attractionRating: row.rating,
                    attractionContact: row.contact,
                    attractionOpeningHours: row.opening_hours,
                    attractionImageUrl: row.attraction_image,
                    attractionLocationId: row.location_id,
                    attractionLocation: row.location,
                    attractionDetailedLocation: row.detailed_location,
                };
                return attraction;
            }
            return null;
        } catch (error) {
            console.error('Error getAttractionById in attractionModel:', error);
            throw error;
        }
    }

    static async get_10_PopularAttractions() {
        try {
            const query = `
                SELECT a.attraction_id, a.attraction_name, a.rating, a.img_url, a.description, a.opening_hours FROM attractions a
                where a.rating >= 4.5
                ORDER BY rating DESC
                LIMIT 10;
            `;
            const res = await db.query(query);
            if (res.rows.length > 0) {
                const popularAttractions = res.rows.map(row => ({
                    id: row.attraction_id,
                    name: row.attraction_name,
                    rating: row.rating,
                    imageUrl: row.img_url,
                    description: row.description,
                    openingHours: row.opening_hours,
                }));
                return popularAttractions;
            }
            return null;
        } catch (error) {
            console.error('Error get_10_PopularAttractions in attractionModel:', error);
            throw error;
        }

    }

    static async getAttractionsByLocationId(locationId) {
        try {
            const query = `
            select a.attraction_id, a.attraction_name, a.rating, a.img_url, a.description, a.opening_hours
            from attractions a where a.location_id = $1
            `
            const res = await db.query(query, [locationId]);
            if (res.rows.length > 0) {
                const attractions = res.rows.map(row => ({
                    id: row.attraction_id,
                    name: row.attraction_name,
                    rating: row.rating,
                    imageUrl: row.img_url,
                    description: row.description,
                    openingHours: row.opening_hours,
                }));
                return attractions;
            }
            return null;
        } catch (error) {
            console.error('Error getAttractionByLocationId in attractionModel:', error);
            throw error;
        }
    }

    static async getAttractionsTotal() {
        try {
            const query = `SELECT COUNT(*) AS total_rows FROM attractions;`
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

    static async getAttractionsByPage(limit, offset) {
        try {
            const query = `  
                SELECT a.attraction_id, a.attraction_name, a.rating, a.img_url, a.description, a.opening_hours 
                FROM attractions a
                ORDER BY a.attraction_id
                LIMIT $1 OFFSET $2; 
            `
            const res = await db.query(query, [limit, offset]);
            if (res.rows.length > 0) {
                const attractions = res.rows.map(row => ({
                    id: row.attraction_id,
                    name: row.attraction_name,
                    rating: row.rating,
                    imageUrl: row.img_url,
                    description: row.description,
                    openingHours: row.opening_hours,
                }));
                return attractions;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async addAttractions(name, description, location, phone, openingHours, rating, img_url) {
        try {
            const query = `
                INSERT INTO attractions (attraction_id, attraction_name, description, location_id, contact, opening_hours, rating, img_url, detailed_location)
                VALUES ((SELECT 
                    'a' || LPAD(CAST(COALESCE(MAX(CAST(SUBSTRING(attraction_id FROM 2 FOR LENGTH(attraction_id) - 1) AS INT)), 0) + 1 AS VARCHAR), 3, '0')
                FROM attractions), $1, $2, 
                (select l.location_id
                from locations l
                where l.location_name = $3), $4, $5, $6, $7, '123')
                RETURNING *;
            `;
            const values = [name, description, location, phone, openingHours, rating, img_url];
            const res = await db.query(query, values);
            return res.rows[0];
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            throw error;
        }
    }

    static async updateAttractions(attractionID, name, description, location, phone, openingHours, rating, img_url) {
        try {
            const query = `
                UPDATE attractions
                SET 
                    attraction_name = $1,
                    description = $2,
                    location_id = (select l.location_id
                        from locations l
                        where l.location_name = $3),
                    contact = $4,
                    opening_hours = $5,
                    rating = $6,
                    img_url = $7,
                    detailed_location = '123'
                WHERE attraction_id = $8
                RETURNING *;
            `;
            const values = [name, description, location, phone, openingHours, rating, img_url, attractionID];
            const res = await db.query(query, values);
            return res.rows[0];
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            throw error;
        }
    }

    static async deleteAttractions(attractionID) {
        try {
            const query = `
                DELETE FROM attractions
                WHERE attraction_id = $1
                RETURNING *;
            `;
            const values = [attractionID];
            const res = await db.query(query, values);
            return res.rows[0];
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            throw error;
        }
    }

    static async getFilterAttraction(rate, location, input) {
        const query = `
                SELECT *, l.location_name FROM public.attractions a
                left join locations l on l.location_id = a.location_id
                WHERE (($1 = -1) OR (a.rating >= $1 AND a.rating <= $1+1))
                and (($2 = 'default') OR (l.location_name LIKE '%' || $2 || '%'))
                and (($3 = 'default') OR (a.attraction_name LIKE '%' || $3 || '%') OR (a.description LIKE '%' || $3 || '%'))
            `
        const values = [rate, location, input];
        try {
            const result = await db.query(query, values);
            return result.rows;
        } catch (err) {
            throw new Error('Error fetching tours by location: ' + err.message);
        }
    }
    static async getRelatedAttraction(attractionID) {
        try {
            const query = `
                    SELECT
                    a.attraction_id AS id,
                    a.attraction_name AS name,
                    a.description AS description,
                    a.rating AS rating,
                    a.img_url AS images,
                    l.location_name AS location
                FROM attractions a
                JOIN locations l ON l.location_id = a.location_id
                JOIN attractions re ON re.attraction_id = $1 and re.location_id = l.location_id
                WHERE a.attraction_id != re.attraction_id
                LIMIT 3
            `;
            const res = await db.query(query, [attractionID]);
            return res.rows;
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            throw error;
        }
    }
}

module.exports = AttractionModel
