const db = require('../../config/db'); // Kết nối cơ sở dữ liệu

class FeedbackModel {
    static async getFeedbacksByFacilityId(facilityId) {
        try {
            const query = `select fe.rate, fe.detail, u.user_fullname
                            from feedbacks fe join tourists t on fe.tourist_id = t.tourist_id
                            join users u on t.user_id = u.user_id
                            where fe.facility_id = $1 `;
            const res = await db.query(query, [facilityId]);
            if (res.rows.length > 0) {
                return res.rows.map(row => ({
                    rate: row.rate,
                    detail: row.detail,
                    userFullname: row.user_fullname
                }));
            }
            return null;
        } catch (error) {
            console.error("Error in FeedbackModel.getFeedBack: ", error.message);
            throw error;
        }
    }

    static async submitFeedBack(touristId, facilityId, rate, detail) {
        try {
            const query = `
                INSERT INTO feedbacks (tourist_id, facility_id, rate, detail) 
                VALUES ($1, $2, $3, $4)
            `;
            const values = [touristId, facilityId, rate, detail];
            const result = await db.query(query, values);
            return result.rowCount > 0;
        } catch (error) {
            console.error("Error in FeedbackModel.submitFeedBack:", error.message);
            throw error;
        }
    }
}

module.exports = FeedbackModel;