const FacilityService = require('./facilityService');

class FacilityController {
    static async deleteFacility(req, res) {
        try {
            const { facilityId } = req.body;
            const { accountRole, accountId } = res.locals.account;
            if (!facilityId) {
                return res.status(400).json({ message: "Thiếu facilityId." });
            }
            const result = await FacilityService.deleteFacility(facilityId, accountId, accountRole);
            if (result.success) {
                return res.status(200).json({ message: "Facility đã được xóa thành công." });
            } else {
                return res.status(404).json({ message: "Facility không tồn tại hoặc không thể xóa." });
            }

        } catch (error) {
            console.error("Error in FacilityController.deleteFacility:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
        }
    }



}

module.exports = FacilityController;