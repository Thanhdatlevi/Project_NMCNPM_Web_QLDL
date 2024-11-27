const RestaurantModel = require('./resModel');

const RestaurantController = {
    getAllRes: async (req, res) => {
        try {
            const AllRestaurants = await RestaurantModel.getAllRes();
            res.json(AllRestaurants); // Trả về 3 nhà hàng có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },
    getFilterRes: async (req, res) => {
        try {
            const result = {
                rate: req.query.rate || -1,
                location: req.query.location || 'default',
                input: req.query.input || 'default',
            };
            const filterRes = await RestaurantModel.getFilterRes(result.rate, result.location, result.input); 
             // Gọi model để lấy danh sách khách sạn
            res.json(filterRes);  // Trả về kết quả dưới dạng JSON
        } catch (error) {
            console.error('Error retrieving ress by location:', error);
            res.status(500).json({ message: 'Error retrieving ress' });
        }
    },
    get_3_PopularRestaurants: async (req, res) => {
        try {
            const popularRestaurants = await RestaurantModel.get_3_PopularRestaurants();
            res.json(popularRestaurants); // Trả về 3 nhà hàng có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },

    getRestaurantByID: async (req, res) => {
        try {
            const { resID } = req.params;  // Lấy resID từ tham số URL
            const restaurantDetail = await RestaurantModel.getRestaurantByID(resID);  // Lấy thông tin chi tiết nhà hàng từ model
            if (!restaurantDetail) {
                return res.status(404).json({ message: 'Restaurant not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(restaurantDetail);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving restaurant details' });
        }
    },

    getRelatedRes: async (req, res) => {
        try {
            const { resID } = req.params;
            const resRelated = await RestaurantModel.getRelatedRes(resID);
            if (!resRelated) {
                return res.status(404).json({ message: 'Attraction not found' }); 
            }
            res.json(resRelated); 
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    },

    getRestaurantsByLocationID: async (req, res) => {
        try {
            const { locationId } = req.params;  // Lấy locationId từ tham số URL
            const restaurants = await RestaurantModel.getRestaurantsByLocation(locationId);  // Gọi model để lấy nhà hàng
            if (restaurants.length > 0) {
                res.json(restaurants);  // Trả về danh sách nhà hàng
            } else {
                res.status(404).json({ message: 'No restaurants found for this location' });  // Không tìm thấy nhà hàng
            }
        } catch (error) {
            console.error('Error retrieving restaurants:', error);
            res.status(500).json({ message: 'Error retrieving restaurants' });  // Lỗi server
        }
    },

};

module.exports = RestaurantController;

