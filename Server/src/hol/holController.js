const HotelModel = require('./holModel');

const HotelController = {

    getPopularHotels: async (req, res) => {
        try {
            const popularHotels = await HotelModel.getPopularHotels();
            res.json(popularHotels); // Trả về 3 khách sạn có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },

};



module.exports = HotelController;