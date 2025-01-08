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
                return res.status(204).send();
            } else {
                return res.status(400).json({ message: result.message });
            }
        } catch (error) {
            console.error("Error in ProviderController.updateHotel controller: ", error);
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
                return res.status(204).send();
            } else {
                return res.status(400).json({ message: result.message });
            }
        } catch (error) {
            console.error("Error in ProviderController.updateRestaurant: ", error);
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
                    return res.status(204).send();
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
                return res.status(204).send();
            } else {
                return res.status(400).json(result);
            }
        } catch (error) {
            console.error("Error in ProviderController.requestRestaurant:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
        }
    }

    static async deleteFacility(req, res) {
        try {
            const { facilityId } = req.body;
            const { accountId } = res.locals.account;
            if (!facilityId) {
                return res.status(400).json({ message: "Thiếu facilityId." });
            }
            const result = await ProviderService.deleteFacility(accountId, facilityId);
            if (result.success) {
                return res.status(204).send();
            } else {
                return res.status(404).json({ message: "Facility không tồn tại hoặc không thể xóa." });
            }

        } catch (error) {
            console.error("Error in ProviderController.deleteFacility:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
        }
    }

    static async getHotelsByProviderId(req, res) {
        try {
            const { accountId } = res.locals.account;
            const hotels = await ProviderService.getHotelsByProviderId(accountId);
            res.status(200).json(hotels);
        } catch (error) {
            console.error('Error retrieving hotels by provider:', error.message);
            res.status(500).json({ message: 'Failed to retrieve hotels by provider' });
        }
    }

    static async getRestaurantByProviderId(req, res) {
        try {
            const { accountId } = res.locals.account;
            const restaurants = await ProviderService.getRestaurantByProviderId(accountId);
            res.status(200).json(restaurants);
        } catch (error) {
            console.error('Error in getRestaurantByProviderId:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getHotelById_provider(req, res) {
        try {
            const { holId } = req.params;
            const hotelDetail = await ProviderService.getHotelById_provider(holId);
            if (!hotelDetail) {
                return res.status(404).json({ message: 'Hotel not found for provider' });
            }
            res.status(200).json(hotelDetail);
        } catch (error) {
            console.error('Error in getHotelById_provider:', error.message);
            res.status(500).json({ message: 'Failed to retrieve hotel details for provider' });
        }
    }

    static async getRestaurantById_provider(req, res) {
        try {
            const { resId } = req.params;
            const restaurantDetail = await ProviderService.getRestaurantById_provider(resId);
            if (!restaurantDetail) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            res.status(200).json(restaurantDetail);
        } catch (error) {
            console.error('Error in getRestaurantById_provider:', error);
            res.status(500).json({ message: 'Error retrieving restaurant details' });
        }
    }

    static async getReserveHotelsByProviderId(req, res) {
        try {
            const { accountId } = res.locals.account;
            const result = await ProviderService.getReserveHotelsByProviderId(accountId);
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            res.status(200).json(result.data);
        } catch (error) {
            console.error('Error in getReserveHotelsByProviderId:', error);
            res.status(500).json({ message: 'Error retrieving hotels by provider' });
        }
    }

    static async getReserveRestaurantByProviderId(req, res) {
        try {
            const { accountId } = res.locals.account;
            const result = await ProviderService.getReserveRestaurantByProviderId(accountId);
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            res.status(200).json(result.data);
        } catch (error) {
            console.error('Error in getReserveRestaurantByProviderId:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = ProviderController;