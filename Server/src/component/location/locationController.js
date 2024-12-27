const LocationService = require('../location/locationService');

class LocationController {
    static async getAllLocations(req, res) {
        try {
            const locations = await LocationService.getAllLocations();
            res.status(200).json(locations);
        } catch (error) {
            console.error('Error in LocationController:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = LocationController;
