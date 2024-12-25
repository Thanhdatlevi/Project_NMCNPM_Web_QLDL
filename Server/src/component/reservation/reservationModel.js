const db = require('../../config/db');

class ReservationModel {
    static async #insertReservation(touristId, reservationDate, status, client) {
        try {
            const query = `
            INSERT INTO reservations (tourist_id, reservation_date, status)
            VALUES ($1, $2, $3)
            RETURNING reserve_id;
            `;
            const result = await client.query(query, [touristId, reservationDate, status]);
            if (result.rowCount > 0) {
                return result.rows[0].reserve_id;
            }
            return null;
        } catch (error) {
            console.error("Error in ReservationModel.insertReservation: ", error.message);
            throw error;
        }
    }

    static async #insertDetailReservations(reserveId, detailReservations, client) {
        try {
            const query = `
            INSERT INTO detail_reservations(
                reserve_id, facility_id, facility_name, quantity, price, checkin_time, total_price, facility_img
            ) VALUES
            ${detailReservations.map((_, index) => `($${index * 8 + 1}, $${index * 8 + 2}, $${index * 8 + 3}, $${index * 8 + 4}, $${index * 8 + 5}, $${index * 8 + 6}, $${index * 8 + 7}, $${index * 8 + 8})`).join(', ')}
        `;
            const values = detailReservations.flatMap(detailReservation => [
                reserveId,
                detailReservation.facilityId,
                detailReservation.facilityName,
                detailReservation.quantity,
                detailReservation.price,
                detailReservation.checkinTime,
                detailReservation.totalPrice,
                detailReservation.img,
            ]);
            const result = await client.query(query, values);
            return result.rowCount > 0;
        } catch (error) {
            console.error("Error in ReservationModel.insertDetailReservations:", error.message);
            throw error;
        }
    }

    static async createReservation(touristId, reservationDate, status, detailReservations) {
        const client = await db.beginTransaction();
        try {
            await client.query('BEGIN');
            const reserveId = await this.#insertReservation(touristId, reservationDate, status, client);
            if (!reserveId) {
                throw new Error("Failed to create reservation");
            }
            const detailInsertSuccess = await this.#insertDetailReservations(reserveId, detailReservations, client);
            if (!detailInsertSuccess) {
                throw new Error("Failed to insert detail reservations");
            }
            await db.commitTransaction(client);
            return reserveId;
        } catch (error) {
            await db.rollbackTransaction(client);
            console.error("Error in ReservationModel.createReservation:", error.message);
            throw error;
        }
    }

    static async getReservationHistory(touristId) {
        try {
            const query = `
            SELECT 
                r.reserve_id, 
                r.reservation_date, 
                r.status, 
                r.total_amount,
                json_agg(
                    jsonb_build_object(
                        'quantity', dr.quantity,
                        'price', dr.price,
                        'total_price', dr.total_price,
                        'checkin_time', dr.checkin_time,
                        'facility_name', dr.facility_name,
                        'facility_img', dr.facility_img
                    )
                ) AS detail_reservations
            FROM reservations r
            JOIN detail_reservations dr 
                ON r.reserve_id = dr.reserve_id
            WHERE r.tourist_id = $1
            GROUP BY r.reserve_id
            ORDER BY r.reservation_date DESC;
        `;
            const result = await db.query(query, [touristId]);

            if (result.rows.length > 0) {
                const reservations = result.rows.map(reservation => {
                    const detailReservations = Array.isArray(reservation.detail_reservations) && reservation.detail_reservations.length > 0
                        ? reservation.detail_reservations.map(detail => ({
                            quantity: detail.quantity,
                            price: detail.price,
                            totalPrice: detail.total_price,
                            checkinTime: detail.checkin_time,
                            facilityName: detail.facility_name,
                            facilityImg: detail.facility_img
                        }))
                        : null;
                    return {
                        reserveId: reservation.reserve_id,
                        reservationDate: reservation.reservation_date,
                        status: reservation.status,
                        totalAmount: reservation.total_amount,
                        detailReservations: detailReservations
                    };
                });
                return reservations;
            }
            return null;
        } catch (error) {
            console.error("Error in ReservationModel.getReservationHistory:", error.message);
            throw error;
        }
    }

}
module.exports = ReservationModel;
