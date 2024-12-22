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
                reserve_id, facility_id, facility_name, quantity, price, checkin_time, total_price
            ) VALUES
            ${detailReservations.map((_, index) => `($${index * 7 + 1}, $${index * 7 + 2}, $${index * 7 + 3}, $${index * 7 + 4}, $${index * 7 + 5}, $${index * 7 + 6}, $${index * 7 + 7})`).join(', ')}
        `;
            const values = detailReservations.flatMap(detailReservation => [
                reserveId,
                detailReservation.facilityId,
                detailReservation.facilityName,
                detailReservation.quantity,
                detailReservation.price,
                detailReservation.checkinTime,
                detailReservation.totalPrice,
            ]);
            const result = await client.query(query, values);
            return result.rowCount > 0;
        } catch (error) {
            console.error("Error in insertDetailReservations:", error.message);
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
            console.error("Error in createReservation:", error.message);
            throw error;
        }
    }
}

module.exports = ReservationModel;
