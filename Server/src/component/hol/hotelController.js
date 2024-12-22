const HotelModel = require('./hotelModel');
const HotelService = require('./hotelService');

class HotelController {

    static async get_3_PopularHotels(req, res) {
        try {
            const popularHotels = await HotelService.get_3_PopularHotels();
            res.status(200).json(popularHotels); // Trả về 3 nhà hàng có rating cao nhất
        } catch (error) {
            console.error('Error in get_3_PopularHotels:', error.message);
            res.status(500).json({ message: 'Failed to retrieve popular hotels' });
        }
    }

    static async getHotelsTotal(req, res) {
        try {
            const total = await HotelService.getHotelsTotal();
            if (!total) {
                return res.status(404).json({ message: 'No hotels found' });
            }
            res.status(200).json(total);
        } catch (error) {
            console.error('Error in getHotelsTotal:', error.message);
            return res.status(500).json({ message: 'Failed to retrieve hotel total' });
        }
    }

    static async getHotelByPage(req, res) {
        try {
            const pageNum = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 5;
            const hotels = await HotelService.getHotelsByPage(pageNum, limit);
            if (!hotels || hotels.length === 0) {
                return res.status(404).json({ message: 'No hotels found for this page' });
            }
            return res.status(200).json(hotels);
        } catch (error) {
            console.error('Error in getHotelByPage:', error.message);
            return res.status(500).json({ message: 'Failed to retrieve hotels by page' });
        }
    }

    static async getHotelById_tourist(req, res) {
        try {
            const { holId } = req.params;
            const hotelDetail = await HotelService.getHotelById_tourist(holId);
            if (!hotelDetail) {
                return res.status(404).json({ message: 'Hotel not found for tourist' });
            }
            res.status(200).json(hotelDetail);
        } catch (error) {
            console.error('Error in getHotelById_tourist:', error.message);
            res.status(500).json({ message: 'Failed to retrieve hotel details for tourist' });
        }
    }

    static async getHotelById_provider(req, res) {
        try {
            const { holId } = req.params;
            const hotelDetail = await HotelService.getHotelById_provider(holId);
            if (!hotelDetail) {
                return res.status(404).json({ message: 'Hotel not found for provider' });
            }
            res.status(200).json(hotelDetail);
        } catch (error) {
            console.error('Error in getHotelById_provider:', error.message);
            res.status(500).json({ message: 'Failed to retrieve hotel details for provider' });
        }
    }

    static async getHotelsByLocationId(req, res) {
        try {
            const { locationId } = req.params;
            const hotels = await HotelService.getHotelsByLocationId(locationId);
            if (!hotels || hotels.length === 0) {
                return res.status(404).json({ message: 'No hotels found for this location' });
            }
            res.status(200).json(hotels);
        } catch (error) {
            console.error('Error retrieving hotels by location:', error.message);
            res.status(500).json({ message: 'Failed to retrieve hotels by location' });
        }
    }

    static async getHotelsByProviderId(req, res) {
        try {
            const { providerId } = req.params;
            const hotels = await HotelService.getHotelsByProviderId(providerId);
            if (!hotels || hotels.length === 0) {
                return res.status(404).json({ message: 'No hotels found for this provider' });
            }
            res.status(200).json(hotels);
        } catch (error) {
            console.error('Error retrieving hotels by provider:', error.message);
            res.status(500).json({ message: 'Failed to retrieve hotels by provider' });
        }
    }

    static async getFilterHotel(req, res) {
        try {
            const result = {
                rate: req.query.rate || -1,
                location: req.query.location || 'default',
                input: req.query.input || 'default',
            };
            const hotels = await HotelModel.getFilterHotel(result.rate, result.location, result.input);
            if (!hotels || hotels.length === 0) {
                return res.status(404).json({ message: 'No hotels match the filter criteria' });
            }
            res.status(200).json(hotels);
        } catch (error) {
            console.error('Error retrieving hotels by filter:', error.message);
            res.status(500).json({ message: 'Failed to retrieve filtered hotels' });
        }
    }

    static async getRelatedHotel(req, res) {
        try {
            const { hotelID } = req.params;
            const hotelRelated = await HotelModel.getRelatedHotel(hotelID);
            if (!hotelRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(hotelRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    }

}

module.exports = HotelController;
