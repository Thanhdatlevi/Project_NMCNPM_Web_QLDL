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
};



module.exports = HotelController;