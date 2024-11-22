const LocationModel = require('../location/locationModel');  // Import model

const LocationController = {
    getAllLocations: async (req, res) => {
        try {
            const locations = await LocationModel.getAllLocations();  // Gọi model để lấy tất cả các địa điểm
            if (locations.length > 0) {
                res.json(locations);  // Trả về danh sách các địa điểm
            } else {
                res.status(404).json({ message: 'No locations found' });  // Nếu không có địa điểm, trả về lỗi
            }
        } catch (error) {
            console.error('Error retrieving locations:', error);
            res.status(500).json({ message: 'Error retrieving locations' });  // Trả về lỗi server nếu có sự cố
        }
    },
};

module.exports = LocationController;
