const AttractionModel = require(`./attractionModel`);

class AttractionService {

    static async getAttractionById(attractionId) {
        try {
            const attraction = await AttractionModel.getAttractionById(attractionId);
            return attraction;
        } catch (error) {
            console.error("Error in getAttractionById in AttractionService: ", error);
            throw error;
        }
    }

    static async get_10_PopularAttractions() {
        try {
            const popularAttractions = await AttractionModel.get_10_PopularAttractions();
            return popularAttractions;
        } catch (error) {
            console.error("Error in get_10_PopularAttractions in AttractionService: ", error);
            throw error;
        }
    }

    static async addAttractions(name, description, location, phone, openingHours, rating, img_url) {
        try {
            const attractions = await AttractionModel.addAttractions(name, description, location, phone, openingHours, rating, img_url);
            return attractions;

        } catch (error) {
            console.error("Error in add attraction in AttractionService: ", error);
            throw error;
        }
    }
    static async updateAttractions(attractionID, name, description, location, phone, openingHours, rating, img_url) {
        try {
            const attractions = await AttractionModel.updateAttractions(attractionID, name, description, location, phone, openingHours, rating, img_url);
            return attractions;

        } catch (error) {
            console.error("Error in AttractionService.updateAttractions: ", error);
            throw error;
        }
    }
    static async deleteAttractions(attractionID) {
        try {
            const attractions = await AttractionModel.deleteAttractions(attractionID);
            return attractions;

        } catch (error) {
            console.error("Error in AttractionService.deleteAttractions: ", error);
            throw error;
        }
    }
    static async getAttractionsByLocationId(locationId) {
        try {
            const attractions = await AttractionModel.getAttractionsByLocationId(locationId);
            return attractions;

        } catch (error) {
            console.error("Error in getAttractionsByLocationId in AttractionService: ", error);
            throw error;
        }
    }

    static async getAttractionsTotal() {
        try {
            const total = await AttractionModel.getAttractionsTotal();
            return total;
        } catch (error) {
            console.error("Error in getAttractionsTotal in attractionService: ", error.message);
            throw error;
        }
    }

    static async getAttractionsByPage(pageNum, limit) {
        try {
            const offset = (pageNum - 1) * limit;
            const attractions = await AttractionModel.getAttractionsByPage(limit, offset);
            return attractions;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AttractionService;
