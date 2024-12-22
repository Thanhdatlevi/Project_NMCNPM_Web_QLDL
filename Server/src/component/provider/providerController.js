const { console } = require('inspector');
const ProviderService = require('./providerService');


class ProviderController {

    static async updateHotel(req, res) {
        try {
            const { accountId } = res.locals.account;
            const { hotelId } = req.params;
            const { updateData } = req.body;

            if (!hotelId) {
                return res.status(400).json({ message: "Thiếu hotelId." });
            }
            if (!updateData || typeof updateData !== "object") {
                return res.status(400).json({ message: "Dữ liệu updateData không hợp lệ." });
            }

            const result = await ProviderService.updateHotel(hotelId, accountId, updateData);
            if (result.success) {
                return res.status(200).json({
                    message: result.message || "Cập nhật khách sạn thành công!"
                });
            } else {
                return res.status(400).json({
                    message: result.message || "Có lỗi xảy ra khi cập nhật khách sạn."
                });
            }
        } catch (error) {
            console.error("Error in updateHotel controller: ", error);
            return res.status(500).json({
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau."
            });
        }
    }

    static async updateRestaurant(req, res) {
        try {
            const { accountId } = res.locals.account;
            const { restaurantId } = req.params;
            const { updateData } = req.body;
            if (!restaurantId) {
                return res.status(400).json({ message: "Thiếu restaurantId." });
            }
            if (!updateData || typeof updateData !== "object") {
                return res.status(400).json({ message: "Dữ liệu updateData không hợp lệ." });
            }
            const result = await ProviderService.updateRestaurant(restaurantId, accountId, updateData);

            if (result.success) {
                return res.status(200).json({
                    message: result.message || "Cập nhật nhà hàng thành công!"
                });
            } else {
                return res.status(400).json({
                    message: result.message || "Có lỗi xảy ra khi cập nhật nhà hàng."
                });
            }
        } catch (error) {
            console.error("Error in updateRestaurant controller: ", error);
            return res.status(500).json({
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau."
            });
        }
    }

    static async requestHotel(req, res) {
        try {
            {
                const { accountId } = res.locals.account;
                const { requestData } = req.body;
                if (!requestData) {
                    return res.status(400).json({
                        message: "Thiếu dữ liệu requestData."
                    });
                }

                const requiredFields = [
                    'facilityName',
                    'description',
                    'specificLocation',
                    'contact',
                    'imageUrls',
                    'roomsNum',
                    'locationId'
                ];

                for (let field of requiredFields) {
                    if (!requestData[field]) {
                        return res.status(400).json({
                            message: `Thiếu trường: ${field}`
                        });
                    }
                }
                const result = await ProviderService.requestHotel(accountId, requestData);
                if (result.success) {
                    return res.status(200).json(result);
                } else {
                    return res.status(400).json(result);
                }
            }
        } catch (error) {
            console.error("Error in ProviderController.requestHotel:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
        }
    }

    static async requestRestaurant(req, res) {
        try {
            const { accountId } = res.locals.account;

            const { requestData } = req.body;
            if (!requestData) {
                return res.status(400).json({
                    message: "Thiếu dữ liệu requestData."
                });
            }

            const requiredFields = [
                'facilityName',
                'description',
                'specificLocation',
                'contact',
                'imageUrls',
                'tablesNum',
                'locationId'
            ];

            for (let field of requiredFields) {
                if (!requestData[field]) {
                    return res.status(400).json({
                        message: `Thiếu trường: ${field}`
                    });
                }
            }
            const result = await ProviderService.requestRestaurant(accountId, requestData);
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            console.error("Error in ProviderController.requestRestaurant:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
        }
    }


}

module.exports = ProviderController;