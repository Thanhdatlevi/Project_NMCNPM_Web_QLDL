const AttractionModel = require('./attractionModel');


const AttractionController = {
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