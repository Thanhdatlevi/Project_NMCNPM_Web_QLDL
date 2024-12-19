const db = require('../../config/db'); // Import database config

class LocationModel {
    static async getAllLocations() {
        try {
            const query = 'SELECT l.location_id, l.location_name FROM locations l';
            const result = await db.query(query);
            const locations = result.rows.map(row => ({
                locationId: row.location_id,
                locationName: row.location_name,
            }));
            return locations;
        } catch (error) {
            console.error('Error getAllLocations in LocationModel:', error);
            throw error;
        }
    }
}

module.exports = LocationModel;
