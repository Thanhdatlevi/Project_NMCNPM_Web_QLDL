const ReservationModel = require('./reservationModel');

const ReservationController = {
    // Lấy thông tin đơn đặt hàng theo tourist_id và provider_id
    getReservationByTouristAndProvider: async (req, res) => {
        const { touristID, providerID } = req.params;

        try {
            const reservations = await ReservationModel.getReservationByTouristAndProvider(touristID, providerID);
            if (reservations.length > 0) {
                return res.status(200).json({ reservations });
            } else {
                return res.status(404).json({ message: 'No reservations found for this tourist and provider.' });
            }
        } catch (error) {
            console.error('Error in getReservationByTouristAndProvider controller:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Lấy tất cả các đơn đặt hàng của tourist
    getAllReservationsByTourist: async (req, res) => {
        const { touristID } = req.params;

        try {
            const reservations = await ReservationModel.getAllReservationsByTourist(touristID);
            if (reservations.length > 0) {
                return res.status(200).json({ reservations });
            } else {
                return res.status(404).json({ message: 'No reservations found for this tourist.' });
            }
        } catch (error) {
            console.error('Error in getAllReservationsByTourist controller:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Lấy tất cả các đơn đặt hàng của provider
    getAllReservationsByProvider: async (req, res) => {
        const { providerID } = req.params;

        try {
            const reservations = await ReservationModel.getAllReservationsByProvider(providerID);
            if (reservations.length > 0) {
                return res.status(200).json({ reservations });
            } else {
                return res.status(404).json({ message: 'No reservations found for this provider.' });
            }
        } catch (error) {
            console.error('Error in getAllReservationsByProvider controller:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = ReservationController;
