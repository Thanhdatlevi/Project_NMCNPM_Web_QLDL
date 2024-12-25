const db = require('../../config/db');


class ProviderModel {

    static async addRequestHotel(providerId, facilityName, description, specificLocation,
        contact, imageUrls, locationId) {
        try {
            const query = `insert into hol_requests( provider_id, 
                facility_name, description, specific_location, contact,
                image_urls, location_id) 
                values ($1, $2, $3, $4, $5, $6, $7)
                returning hol_request_id`
            const result = await db.query(query, [
                providerId,
                facilityName,
                description,
                specificLocation,
                contact,
                imageUrls,
                locationId
            ]);
            return result.rows[0].hol_request_id;
        } catch (error) {
            console.error("Error in ProviderModel.addRequestHotel: ", error.message);
            throw error;
        }
    }

    static async addRequestRestaurant(providerId, facilityName, description, specificLocation,
        contact, imageUrls, locationId) {
        try {
            const query = `insert into rest_requests( provider_id, 
                facility_name, description, specific_location, contact,
                image_urls, location_id) 
                values ($1, $2, $3, $4, $5, $6, $7)
                returning rest_request_id`
            const result = await db.query(query, [
                providerId,
                facilityName,
                description,
                specificLocation,
                contact,
                imageUrls,
                locationId
            ]);
            return result.rows[0].rest_request_id;
        } catch (error) {
            console.error("Error in ProviderModel.addRequestRestaurant: ", error.message);
            throw error;
        }
    }

    static async getHotelRequestById(holRequestId) {
        try {
            const query = `
            SELECT 
                provider_id,
                facility_name,
                description,
                specific_location,
                contact,
                note_content,
                image_urls,
                location_id
            FROM hol_requests
            WHERE hol_request_id = $1
        `;
            const result = await db.query(query, [holRequestId]);
            if (result.rows.length > 0) {
                const row = result.rows[0];
                return {
                    providerId: row.provider_id,
                    facilityName: row.facility_name,
                    description: row.description,
                    specificLocation: row.specific_location,
                    contact: row.contact,
                    noteContent: row.note_content,
                    imageUrls: row.image_urls,
                    locationId: row.location_id
                };
            }
            return null;
        } catch (error) {
            console.error("Error in ProviderModel.getHotelRequestById:", error.message);
            throw error;
        }
    }

    static async deleteHotelRequestById(holRequestId) {
        try {
            const deleteQuery = `DELETE FROM hol_requests WHERE hol_request_id = $1`;
            await db.query(deleteQuery, [holRequestId]);
        } catch (error) {
            console.error("Error in providerModel.deleteHotelRequestById:", error.message);
            throw error;
        }
    }

    static async getRestaurantRequestById(restRequestId) {
        try {
            const query = `
            SELECT 
                provider_id,
                facility_name,
                description,
                specific_location,
                contact,
                note_content,
                image_urls,
                location_id
            FROM rest_requests
            WHERE rest_request_id = $1
        `;
            const result = await db.query(query, [restRequestId]);
            if (result.rows.length > 0) {
                const row = result.rows[0];
                return {
                    providerId: row.provider_id,
                    facilityName: row.facility_name,
                    description: row.description,
                    specificLocation: row.specific_location,
                    contact: row.contact,
                    noteContent: row.note_content,
                    imageUrls: row.image_urls,
                    locationId: row.location_id
                };
            }
            return null;
        } catch (error) {
            console.error("Error in ProviderModel.getRestaurantRequestById:", error.message);
            throw error;
        }
    }

    static async deleteRestaurantRequestById(restRequestId) {
        try {
            const deleteQuery = `DELETE FROM rest_requests WHERE rest_request_id = $1`;
            await db.query(deleteQuery, [restRequestId]);
        } catch (error) {
            console.error("Error in providerModel.deleteRestaurantRequestById:", error.message);
            throw error;
        }
    }
}

module.exports = ProviderModel;