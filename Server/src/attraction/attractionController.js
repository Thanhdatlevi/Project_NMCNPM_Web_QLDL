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
    getAttractionByID: async (req, res) => {
        try {
            const { attractionID } = req.params;
            const attractionDetail = await AttractionModel.getAttractionByID(attractionID);
            if (!attractionDetail) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionDetail);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    },
    getRelatedAttraction: async (req, res) => {
        try {
            const { attractionID } = req.params;
            const attractionRelated = await AttractionModel.getRelatedAttraction(attractionID);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    },
    addAttractions: async (req, res) => {
        try {
            const { name, description, location, phone, openingHours, rating,img_url} = req.body;
            const attractionRelated = await AttractionModel.addAttractions(name, description, location, phone, openingHours, rating,img_url);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    },
    updateAttractions: async (req, res) => {
        try {
            const { name, description, location, phone, openingHours, rating,img_url} = req.body;
            const { attractionID } = req.params;
            const attractionRelated = await AttractionModel.updateAttractions(attractionID, name, description, location, phone, openingHours, rating,img_url);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    },
    deleteAttractions: async (req, res) => {
        try {
            const { attractionID } = req.params;
            const attractionRelated = await AttractionModel.deleteAttractions(attractionID);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    },
};

module.exports = AttractionController;