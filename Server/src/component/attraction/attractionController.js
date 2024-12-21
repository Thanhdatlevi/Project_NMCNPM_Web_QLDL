const AttractionModel = require('./attractionModel');
const AttractionService = require('./attractionService');

class AttractionController {

    static async getAttractionById(req, res) {
        try {
            const { attractionId } = req.params;
            const attractionDetail = await AttractionService.getAttractionById(attractionId);
            if (!attractionDetail) {
                return res.status(404).json({ message: 'Attraction not found' });
            }
            res.status(200).json(attractionDetail);  // Trả về thông tin chi tiết attraction
        } catch (error) {
            console.error("Error in getAttractionById:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async get_10_PopularAttractions(req, res) {
        try {
            const popularAttractions = await AttractionService.get_10_PopularAttractions();
            if (!popularAttractions) {
                return res.status(404).json({ message: 'Popular attractions not found' });
            }
            res.status(200).json(popularAttractions);
        } catch (error) {
            console.error("Error in get_10_PopularAttractions:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAttractionsByLocationId(req, res) {
        try {
            const { locationId } = req.params;
            const relatedAttraction = await AttractionService.getAttractionsByLocationId(locationId);
            if (!relatedAttraction) {
                return res.status(404).json({ message: 'No attractions found for this location' });
            }
            res.status(200).json(relatedAttraction);
        } catch (error) {
            console.error("Error in getAttractionsByLocationId:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async addAttractions(req, res) {
        try {
            const { name, description, location, phone, openingHours, rating,img_url} = req.body;
            const attractionRelated = await AttractionService.addAttractions(name, description, location, phone, openingHours, rating,img_url);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Can\'t add attraction' });
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Can\'t add attraction' });
        }
    }

    static async updateAttractions(req, res) {
        try {
            const { name, description, location, phone, openingHours, rating,img_url} = req.body;
            const { attractionID } = req.params;
            const attractionRelated = await AttractionService.updateAttractions(attractionID, name, description, location, phone, openingHours, rating,img_url);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    }

    static async deleteAttractions(req, res) {
        try {
            const { attractionID } = req.params;
            const attractionRelated = await AttractionService.deleteAttractions(attractionID);
            if (!attractionRelated) {
                return res.status(404).json({ message: 'Attraction not found' });  // Nếu không tìm thấy nhà hàng
            }
            res.json(attractionRelated);  // Trả về thông tin chi tiết nhà hàng
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving attraction details' });
        }
    }

    static async getFilterAttraction(req, res) {
        try {
            const result = {
                rate: req.query.rate || -1,
                location: req.query.location || 'default',
                input: req.query.input || 'default',
            };
            const popularAttractions = await AttractionModel.getFilterAttraction(result.rate, result.location, result.input);
            res.status(200).json(popularAttractions); // Trả về attractions sau khi lọc
        } catch (error) {
            console.error("Error in getFilterAttraction:", error);
            res.status(500).json({ message: 'Error retrieving filtered attractions' });
        }
    }

    static async getAttractionsTotal(req, res) {
        try {
            const total = await AttractionService.getAttractionsTotal();
            if (!total) {
                return res.status(404).json({ message: 'No total attractions found' });
            }
            res.status(200).json(total);
        } catch (error) {
            console.error("Error in getAttractionsTotal:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAttractionsByPage(req, res) {
        try {
            const pageNum = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 5;
            const attractions = await AttractionService.getAttractionsByPage(pageNum, limit);
            if (!attractions) {
                return res.status(404).json({ message: 'No attractions found for this page' });
            }
            return res.status(200).json(attractions);
        } catch (error) {
            console.error("Error in getAttractionsByPage:", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = AttractionController;
