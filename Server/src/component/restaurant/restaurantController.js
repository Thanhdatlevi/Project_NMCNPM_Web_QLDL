const RestaurantService = require('./restaurantService');
const RestaurantModel = require('./restaurantModel');

class RestaurantController {

    static async getFilterRes(req, res) {
        try {
            const result = {
                rate: req.query.rate || -1,
                location: req.query.location || 'default',
                input: req.query.input || 'default',
            };
            const filterRes = await RestaurantModel.getFilterRes(result.rate, result.location, result.input);
            res.status(200).json(filterRes);  // Trả về kết quả dưới dạng JSON
        } catch (error) {
            console.error('Error retrieving restaurants by location:', error);
            res.status(500).json({ message: 'Error retrieving restaurants' });
        }
    }

    static async get_3_PopularRestaurants(req, res) {
        try {
            const popularRestaurants = await RestaurantService.get_3_PopularRestaurants();
            res.status(200).json(popularRestaurants); // Trả về 3 nhà hàng có rating cao nhất
        } catch (error) {
            console.error('Error in get_3_PopularRestaurants:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getRestaurantsTotal(req, res) {
        try {
            const total = await RestaurantService.getRestaurantsTotal();
            if (!total) {
                return res.status(404).json({ message: 'No restaurants found' });
            }
            res.status(200).json(total);
        } catch (error) {
            console.error('Error in getRestaurantsTotal:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getRestaurantByPage(req, res) {
        try {
            const pageNum = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 5;
            const restaurants = await RestaurantService.getRestaurantsByPage(pageNum, limit);
            if (!restaurants) {
                return res.status(404).json({ message: 'No restaurants found for this page' });
            }
            return res.status(200).json(restaurants);
        } catch (error) {
            console.error("Error in getRestaurantByPage:", error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getRestaurantsByLocationId(req, res) {
        try {
            const { locationId } = req.params;
            const restaurants = await RestaurantService.getRestaurantsByLocationId(locationId);
            if (restaurants) {
                res.status(200).json(restaurants);
            } else {
                res.status(404).json({ message: 'No restaurants found for this location' });
            }
        } catch (error) {
            console.error('Error retrieving restaurants:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getRestaurantById_tourist(req, res) {
        try {
            const { resId } = req.params;  // Lấy resID từ tham số URL
            const restaurantDetail = await RestaurantService.getRestaurantById_tourist(resId);  // Lấy thông tin chi tiết nhà hàng từ model
            if (!restaurantDetail) {
                return res.status(404).json({ message: 'Restaurant not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.status(200).json(restaurantDetail);
        } catch (error) {
            console.error('Error in getRestaurantById_tourist:', error);
            res.status(500).json({ message: 'Error retrieving restaurant details' });
        }
    }

    static async getRestaurantById_provider(req, res) {
        try {
            const { resId } = req.params;
            const restaurantDetail = await RestaurantService.getRestaurantById_provider(resId);
            if (!restaurantDetail) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            res.status(200).json(restaurantDetail);
        } catch (error) {
            console.error('Error in getRestaurantById_provider:', error);
            res.status(500).json({ message: 'Error retrieving restaurant details' });
        }
    }

    static async getRestaurantByProviderId(req, res) {
        try {
            const { providerId } = req.params;
            const restaurants = await RestaurantService.getRestaurantByProviderId(providerId);
            if (!restaurants) {
                return res.status(404).json({ message: 'No restaurants found for this provider' });
            }
            res.status(200).json(restaurants);
        } catch (error) {
            console.error('Error in getRestaurantByProviderId:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getRelatedRes(req, res) {
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
    }
}

module.exports = RestaurantController;
