const TouristService = require(`./touristService`)
class TouristController {
    static async createReservation(req, res) {
        try {
            const { accountId } = res.locals.account;
            const { detailReservation, status, } = req.body;
            if (!detailReservation || !status) {
                return res.status(400).json({ success: false, message: 'Thiếu dữ liệu' });
            }
            const result = await TouristService.createReservation(accountId, status, detailReservation);
            if (result.success) {
                return res.status(201).json({
                    message: 'Reservation created successfully.',
                    reserveId: result.reserveId
                });
            } else {
                return res.status(400).json({ success: false, message: result.message });
            }
        } catch (error) {
            console.error("Error in TouristController.createReservation:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra. Xin vui lòng thử lại sau" });
        }
    }

    static async getReservationHistory(req, res) {
        try {
            const { accountId } = res.locals.account;  // Lấy accountId từ thông tin trong middleware (res.locals)
            const result = await TouristService.getReservationHistory(accountId);
            if (result.success) {
                return res.status(200).json({ data: result.data });
            }
            return res.status(404).json({ message: result.message || "Không tìm thấy dữ liệu." });
        } catch (error) {
            console.error("Error in TouristController.getReservationHistory:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại sau." });
        }
    }

    static async submitFeedback(req, res) {
        try {
            const { accountId } = res.locals.account;
            const { facilityId } = req.params;
            const { rate, detail } = req.body;

            if (!facilityId || !rate || !detail) {
                return res.status(400).json({ message: 'Thiếu dữ liệu để gửi phản hồi.' });
            }
            const result = await TouristService.submitFeedback(accountId, facilityId, rate, detail);

            if (result.success) {
                return res.status(201).json({ message: 'Feedback submitted successfully.' });
            } else {
                return res.status(400).json({ message: result.message });
            }
        } catch (error) {
            console.error("Error in TouristController.submitFeedback:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra. Xin vui lòng thử lại sau." });
        }
    }

    static async getReserveHotelsByTouristId(req, res) {
        try {
            const { accountId } = res.locals.account;
            const hotels = await TouristServide.getReserveHotelsByTouristId(accountId);
            if (!hotels || hotels.length === 0) {
                return res.status(404).json({ message: 'No hotels found for this provider' });
            }
            res.status(200).json(hotels);
        } catch (error) {
            console.error('Error retrieving hotels by provider:', error.message);
            res.status(500).json({ message: 'Failed to retrieve hotels by provider' });
        }
    }

    static async getReserveRestaurantByTouristId(req, res) {
        try {
            console.log(1)
            const { accountId } = res.locals.account;
            const restaurants = await TouristService.getReserveRestaurantByTouristId(accountId);
            if (!restaurants) {
                return res.status(404).json({ message: 'No restaurants found for this provider' });
            }
            res.status(200).json(restaurants);
        } catch (error) {
            console.error('Error in getRestaurantByProviderId:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}


module.exports = TouristController;