const LocationService = require('../location/locationService');

class LocationController {
    static async getAllLocations(req, res) {
        try {
            const locations = await LocationService.getAllLocations();
            if (!locations) {
                return res.status(404).json({ message: 'No locations found' }); // Thêm JSON cho status 404
            }
            res.status(200).json(locations); // Trả về JSON khi tìm thấy locations
        } catch (error) {
            console.error('Error in LocationController:', error);
            return res.status(500).json({ message: 'Internal server error' }); // Thêm JSON cho status 500
        }
    }
}

module.exports = LocationController;
