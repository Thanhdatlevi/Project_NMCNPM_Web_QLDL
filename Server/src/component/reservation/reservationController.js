const ReservationService = require('./reservationService');

class ReservationController {
    static async createReservation(req, res) {
        try {
            const { accountId } = res.locals.account;
            const { detailReservation, status, } = req.body;
            if (!detailReservation || !status) {
                return res.status(400).json({ success: false, message: 'Thiếu dữ liệu' });
            }
            const result = await ReservationService.createReservation(accountId, status, detailReservation); // reservationDate = null
            if (result.success) {
                return res.status(201).json({
                    message: 'Reservation created successfully.',
                    reserveId: result.reserveId
                });
            } else {
                return res.status(400).json({ success: false, message: result.message });
            }
        } catch (error) {
            console.error("Error in ReservationController.createReservation:", error.message);
            return res.status(500).json({ message: "Có lỗi xảy ra. Xin vui lòng thử lại sau" });
        }
    }
}

module.exports = ReservationController;
