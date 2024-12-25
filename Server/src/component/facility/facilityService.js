const FacilityModel = require(`./facilityModel`);
class FacilityService {

    static async getFacilityById(facilityId) {
        try {
            const facility = await FacilityModel.getFacilityById(facilityId);
            return facility;
        } catch (error) {
            console.error("Error in FacilityService.getFacilityById: ", error.message);
            throw error;
        }
    }

    static async updateFacility(facilityId, facilityName, description, locationId, contact, status, specificLocation) {
        try {
            const result = await FacilityModel.updateFacility(facilityId, facilityName, description, locationId, contact, status, specificLocation);
            return result;
        } catch (error) {
            console.error("Error in FacilityService.updateFacility: ".error.message);
            throw error;
        }
    }

    static async deleteFacility(facilityId) {
        try {
            const result = await FacilityModel.deleteFacility(facilityId);
            return result;
        } catch (error) {
            console.error("Error in FacilityService.deleteFacility: ", error.message);
            throw error;
        }
    }

    static async createFacility(providerId, facilityName, description, locationId, contact, specificLocation, facilityImgs) {
        try {
            const facilityId = await FacilityModel.createFacility(
                providerId,
                facilityName,
                description,
                locationId,
                contact,
                specificLocation,
                facilityImgs
            );
            return facilityId;

        } catch (error) {
            console.error("Error in FacilityService.createFacility: ".error.message);
            throw error;
        }
    }
}
module.exports = FacilityService;