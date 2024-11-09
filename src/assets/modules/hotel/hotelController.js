const HotelModel = require('./hotelModel');

const HotelController = {

    // getAllHotels: async (req, res) => {
    //     try {
    //         const hotel = await HotelModel.getAllHotels();
    //         if (!hotel) {
    //             return res.status(404).json({ message: 'Hotel not found ' });
    //         }
    //         res.status(200).json(hotel);
    //     }
    //     catch (err) {
    //         res.status(500).json({ message: err.message });
    //     }
    // },

    // getHotelByID: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const hotel = await HotelModel.getHotelByID(id);
    //         if (!hotel) {
    //             return res.status(404).json({ message: 'Hotel not found' });
    //         }
    //         res.status(200).json(hotel); // Trả về tên khách sạn
    //     }
    //     catch (err) {
    //         res.status(500).json({ message: err.message });
    //     }
    // },

    // getHotelByName: async (req, res) => {
    //     const { name } = req.params;
    //     try {
    //         const hotel = await HotelModel.getHotelByName(name);
    //         if (!hotel) {
    //             return res.status(404).json({ message: 'Hotel not found' });
    //         }
    //         res.status(200).json(hotel);
    //     }
    //     catch (err) {
    //         res.status(500).json({ message: err.message });
    //     }
    // }

    getPopularRestaurants: async (req, res) => {
        try {
            const popularHotels = await HotelModel.getPopularHotels();
            res.json(popularHotels); // Trả về 3 khách sạn có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },

};



module.exports = HotelController;