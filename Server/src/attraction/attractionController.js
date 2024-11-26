const AttractionModel = require('./attractionModel');


const AttractionController = {
    getAllAttraction: async (req, res) => {
        try {
            const popularAttractions = await AttractionModel.getAllAttraction();
            res.json(popularAttractions); // Trả về 3 khách sạn có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },
    getFilterAttraction: async (req, res) => {
        try {
            const result = {
                rate: req.query.rate || -1,
                location: req.query.location || 'default',
                input: req.query.input || 'default',
            };
            const popularAttractions = await AttractionModel.getFilterAttraction(result.rate, result.location, result.input);
            res.json(popularAttractions); // Trả về 3 khách sạn có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error restaurants' });
        }
    },
    get_10_PopularAttractions: async (req, res) => {
        try {
            const popularAttractions = await AttractionModel.get_10_PopularAttractions();
            res.json(popularAttractions); // Trả về 3 khách sạn có rating cao nhất
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving popular restaurants' });
        }
    },
};

module.exports = AttractionController;