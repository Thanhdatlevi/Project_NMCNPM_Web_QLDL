const FacilityModel = require(`./facilityModel`);
const AccountModel = require(`../account/accountModel`);
class FacilityService {
    static async deleteFacility(facilityId, accountId, accountRole) {
        try {
            if (accountRole === 2) {
                const [facility, provider] = await Promise.all([
                    FacilityModel.getFacilityById(facilityId),
                    AccountModel.getProviderId(accountId)
                ]);
                if (!facility) {
                    return { success: false, message: "Facility không tồn tại." };
                }

                if (provider !== facility.provider_id) {
                    return { success: false, message: "Bạn không có quyền xóa facility này." };
                }
            }
            else if (accountRole !== 3) {
                return { success: false, message: "Bạn không có quyền thực hiện thao tác này." };
            }

            const deletedFacility = await FacilityModel.deleteFacility(facilityId);
            if (!deletedFacility) {
                return { success: false, message: "Facility không tồn tại." };
            }

            return { success: true, message: "Facility đã được xóa thành công." };
        } catch (error) {
            console.error("Error in FacilityService.deleteFacility:", error.message);
            throw error;
        }
    }
}

module.exports = FacilityService;