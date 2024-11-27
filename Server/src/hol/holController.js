const hotelModel = require('./holModel');

const HotelController = {

    get_3_PopularHotels: async (req, res) => {
        try {
            const popularHotels = await hotelModel.get_3_PopularHotels();
            res.json(popularHotels); // Trả về 3 khách sạn có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },

    getHotelByID: async (req, res) => {
        try {
            const { hotelID } = req.params;  // Lấy hotelID từ tham số URL
            const hotelDetail = await hotelModel.getHotelByID(hotelID);  // Lấy thông tin chi tiết khách sạn từ model
            if (!hotelDetail) {
                return res.status(404).json({ message: 'Hotel not found' });  // Nếu không tìm thấy khách sạn
            }
            res.json(hotelDetail);  // Trả về thông tin chi tiết khách sạn
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving hotel details' });
        }
    },

    getHotelsByLocationID: async (req, res) => {
        try {
            const { locationId } = req.params;  // Lấy locationId từ URL
            const hotels = await hotelModel.getHotelsByLocationID(locationId);  // Gọi model để lấy danh sách khách sạn
            res.json(hotels);  // Trả về kết quả dưới dạng JSON
        } catch (error) {
            console.error('Error retrieving hotels by location:', error);
            res.status(500).json({ message: 'Error retrieving hotels' });
        }
    },

    getAllHotel: async (req, res) => {
        try {

            const hotels = await hotelModel.getAllHotel(); 
             // Gọi model để lấy danh sách khách sạn
            res.json(hotels);  // Trả về kết quả dưới dạng JSON
        } catch (error) {
            console.error('Error retrieving hotels by location:', error);
            res.status(500).json({ message: 'Error retrieving hotels' });
        }
    },

    getFilterHotel: async (req, res) => {
        try {
            const result = {
                rate: req.query.rate || -1,
                location: req.query.location || 'default',
                input: req.query.input || 'default',
            };
            const hotels = await hotelModel.getFilterHotel(result.rate, result.location, result.input); 
             // Gọi model để lấy danh sách khách sạn
            res.json(hotels);  // Trả về kết quả dưới dạng JSON
        } catch (error) {
            console.error('Error retrieving hotels by location:', error);
            res.status(500).json({ message: 'Error retrieving hotels' });
        }
    },

    getRelatedHotel: async (req, res) => {
        try {
            const { hotelID } = req.params;
            const hotelRelated = await hotelModel.getRelatedHotel(hotelID);
            if (!hotelRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(hotelRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    },
};



module.exports = HotelController;