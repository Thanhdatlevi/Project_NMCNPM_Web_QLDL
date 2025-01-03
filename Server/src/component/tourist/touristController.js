const TouristService = require(`./touristService`)
class TouristController {
    static async createReservation(req, res) {
        try {
            const { accountId } = res.locals.account;
            const { detailReservation, status, } = req.body;
            if (!detailReservation || !status) {
                return res.status(400).json({ success: false, message: 'Thiếu dữ liệu' });
            }
            for (let i = 0; i < detailReservation.length; i++) {
                const { facilityId, facilityName, quantity, price, checkinTime, totalPrice, img } = detailReservation[i];
                if (!facilityId || !facilityName || !quantity || !price || !checkinTime || !totalPrice || !img) {
                    return res.status(400).json({
                        success: false,
                        message: `Thiếu trường dữ liệu trong sản phẩm thứ ${i + 1} của detailReservation`
                    });
                }
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
                return res.status(200).json(result.data);
            }
            return res.status(404).json({ message: result.message });
        } catch (error) {
            console.error("Error in TouristController.getReservationHistory:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại sau." });
        }
    }

    static async submitFeedback(req, res) {
        try {
            const { accountId } = res.locals.account;
            const { facilityId } = req.params;
            //console.log('ok2');
            const { rate, detail } = req.body.data;

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
            const result = await TouristService.getReserveHotelsByTouristId(accountId);
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            res.status(200).json(result.data);
        } catch (error) {
            console.error('Error retrieving hotels by provider:', error.message);
            res.status(500).json({ message: 'Failed to retrieve hotels by provider' });
        }
    }

    static async getReserveRestaurantByTouristId(req, res) {
        try {
            const { accountId } = res.locals.account;
            const result = await TouristService.getReserveRestaurantByTouristId(accountId);
            if (!result) {
                return res.status(404).json({ message: result.message });
            }
            res.status(200).json(result.data);
        } catch (error) {
            console.error('Error in getRestaurantByProviderId:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
module.exports = TouristController;