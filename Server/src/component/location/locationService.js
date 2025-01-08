const LocationModel = require('../location/locationModel');

class LocationService {
    static async getAllLocations() {
        try {
            const locations = await LocationModel.getAllLocations();
            return locations || [];
        } catch (error) {
            console.error('Error in getAllLocations in LocationService:', error);
            throw error;
        }
    }
}

module.exports = LocationService;
