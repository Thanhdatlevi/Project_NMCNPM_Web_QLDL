const db = require('../../config/db');

const ReservationModel = {
    // Lấy thông tin đơn đặt hàng theo tourist_id và provider_id
    getReservationByTouristAndProvider: async (touristID, providerID) => {
        try {
            const query = `
            SELECT 
                r.*
                dr.*
                f.*
            FROM reservations r, detailReservation dr, facility f
            WHERE r.reserved_id = dr.reserve_id
                && f.facility_id = dr.facility_id
                && r.tourist_id = $1
                && f.provider_id = $2
            `;
            const values = [touristID, providerID];
            const res = await db.query(query, values);  // Truyền tham số tourist_id và provider_id vào câu truy vấn
            return res.rows;  // Trả về kết quả chi tiết của đơn đặt hàng
        } catch (error) {
            console.error('Error fetching reservation details:', error);
            throw error;
        }
    },

    // Lấy tất cả thông tin đơn đặt hàng của tourist
    getAllReservationsByTourist: async (touristID) => {
        try {
            const query = `
            SELECT 
                r.*
                dr.*
                f.*
            FROM reservations r, detailReservation dr, facility f
            WHERE r.reserved_id = dr.reserve_id
                && f.facility_id = dr.facility_id
                && r.tourist_id = $1
            `;
            const res = await db.query(query, [touristID]);
            return res.rows;  // Trả về tất cả các đơn đặt hàng của tourist
        } catch (error) {
            console.error('Error fetching all reservations by tourist:', error);
            throw error;
        }
    },

    // Lấy tất cả thông tin đơn đặt hàng của provider
    getAllReservationsByProvider: async (providerID) => {
        try {
            const query = `
             SELECT 
                r.*
                dr.*
                f.*
            FROM reservations r, detailReservation dr, facility f
            WHERE r.reserved_id = dr.reserve_id
                && f.facility_id = dr.facility_id
                && f.provider_id = $1
            `;
            const res = await db.query(query, [providerID]);
            return res.rows;  // Trả về tất cả các đơn đặt hàng của provider
        } catch (error) {
            console.error('Error fetching all reservations by provider:', error);
            throw error;
        }
    }
};

module.exports = ReservationModel;
