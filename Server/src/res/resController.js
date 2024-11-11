const RestaurantModel = require('./resModel');
// const Location = require('../location/locationModel')
const RestaurantController = {

    // getToursByLocation: async (req, res) => {
    //     const { location_name } = req.params

    //     try {
    //         const tours = await Tour.getToursByLocation(location_name);
    //         const location = await Location.getLocationByName(location_name);

    //         res.render('tours', {
    //             layout: 'main',
    //             location_name, loc_detail: location[0].details, tours,
    //             title: location[0].location_name,
    //             scripts: '<script src="/js/tours.js"></script>'
    //         });
    //     } catch (err) {
    //         res.status(500).json({ error: err.message });
    //     }
    // },
    getPopularRestaurants: async (req, res) => {
        try {
            const popularRestaurants = await RestaurantModel.getPopularRestaurants();
            res.json(popularRestaurants); // Trả về 3 nhà hàng có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },

    // getTourByID: async (req, res) => {
    //     const { tour_id } = req.params
    //     try {
    //         const tour_detail = await Tour.getTourByID(tour_id);
    //         res.render('tour_detail', {
    //             layout: 'main',
    //             tour_detail,
    //             title: tour_detail[0].title
    //         });

    //     } catch (err) {
    //         res.status(500).json({ error: err.message });
    //     }
    // }


};

module.exports = RestaurantController;

