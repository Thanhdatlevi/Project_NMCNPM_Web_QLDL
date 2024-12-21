const db = require('../../config/db');


class ProviderModel {

    static async addRequestHotel(providerId, facilityName, description, specificLocation,
        contact, noteContent, imageUrls, roomsNum, locationId) {
        try {
            const query = `insert into hol_requests( provider_id, 
                facility_name, description, specific_location, contact,
                note_content, image_urls, rooms_num, location_id) 
                values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
            await db.query(query, [providerId, facilityName, description, specificLocation,
                contact, noteContent, imageUrls, roomsNum, locationId]);
        } catch (error) {
            console.error("Error in ProviderModel.addRequestHotel: ".error);
            throw error;
        }
    }

    static async addRequestRestaurant(providerId, facilityName, description, specificLocation,
        contact, noteContent, imageUrls, tablesNum, locationId) {
        try {
            const query = `insert into rest_requests( provider_id, 
                facility_name, description, specific_location, contact,
                note_content, image_urls, tables_num, location_id) 
                values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
            await db.query(query, [providerId, facilityName, description, specificLocation,
                contact, noteContent, imageUrls, tablesNum, locationId]);
        } catch (error) {
            console.error("Error in ProviderModel.addRequestRestaurant: ".error);
            throw error;
        }
    }

}

module.exports = ProviderModel;