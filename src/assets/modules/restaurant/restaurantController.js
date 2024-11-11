const RestaurantModel = require('./restaurantModel');

const RestaurantController = {

    // getAllRestaurant: async (req, res) => {
    //     try {
    //         const restaurant = await RestaurantModel.getAllRestaurant();
    //         if (!restaurant) {
    //             return res.status(404).json({ message: 'restaurant not found' });
    //         }
    //         res.status(200).json(restaurant);
    //     }
    //     catch (err) {
    //         res.status(500).json({ message: err.message });
    //     }
    // },

    // getRestaurantByID: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const restaurant = await RestaurantModel.getRestaurantByID(id);
    //         if (!restaurant) {
    //             return res.status(404).json({ message: 'restaurant not found' });
    //         }
    //         res.status(200).json(restaurant);
    //     }
    //     catch (err) {
    //         res.status(500).json({ message: err.message });
    //     }
    // },

    // getRestaurantByName: async (req, res) => {
    //     const { name } = req.params;
    //     try {
    //         const restaurant = await RestaurantModel.getRestaurantByName(name);
    //         if (!restaurant) {
    //             return res.status(404).json({ message: 'restaurant not found' });
    //         }
    //         return res.status(200).json(restaurant);
    //     }
    //     catch (err) {
    //         return res.status(500).json({ message: err.message });
    //     }
    // }
    getPopularRestaurants: async (req, res) => {
        try {
            const popularRestaurants = await RestaurantModel.getPopularRestaurants();
            res.json(popularRestaurants); // Trả về 3 nhà hàng có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },

};

module.exports = RestaurantController;