const db = require('../config/db'); // Kết nối cơ sở dữ liệu

const FeedbackModel = {
    // Lấy tất cả feedbacks
    getAllFeedbacks: async () => {
        try {
            const query = `SELECT * FROM feedbacks ORDER BY id DESC;`;
            const res = await db.query(query);
            return res.rows;  // Trả về tất cả feedbacks
        } catch (error) {
            console.error('Error fetching all feedbacks:', error);
            throw error;  // Ném lỗi nếu có sự cố trong truy vấn
        }
    },

    // Lấy thông tin feedback theo ID
    getFeedbackByID: async (ID) => {
        try {
            const query = `
        SELECT * FROM feedbacks
        WHERE id = $1;
      `;
            const res = await db.query(query, [ID]);
            return res.rows;
        } catch (error) {
            console.error('Error fetching feedback by ID:', error);
            throw error;  // Ném lỗi nếu có sự cố trong truy vấn
        }
    },

    getFeedbackByTouristID: async (touristID) => {
        try {
            const query = `
        SELECT * FROM feedbacks
        WHERE tourist_id = $1;
      `;
            const res = await db.query(query, [touristID]);
            return res.rows;
        } catch (error) {
            console.error('Error fetching feedback by ID:', error);
            throw error;  // Ném lỗi nếu có sự cố trong truy vấn
        }
    },

    getFeedbackByFacilityId: async (facilityID) => {
        try {
            const query = `
        SELECT * FROM feedbacks
        WHERE facility_id = $1;
      `;
            const res = await db.query(query, [facilityID]);
            return res.rows;
        } catch (error) {
            console.error('Error fetching feedback by ID:', error);
            throw error;  // Ném lỗi nếu có sự cố trong truy vấn
        }
    },

    getFeedbackByHigherRate: async (rate) => {
        try {
            const query = `
            SELECT * FROM feedbacks
            WHERE rate > $1;
        `;
            const res = await db.query(query, [rate]);
            return res.rows;
        }
        catch (error) {
            console.error('Error fetching feedback by rate', error);
            throw error;
        }
    },

    getFeedbackByLowerRate: async (rate) => {
        try {
            const query = `
            SELECT * FROM feedbacks
            WHERE rate < $1;
        `;
            const res = await db.query(query, [rate]);
            return res.rows;
        }
        catch (error) {
            console.error('Error fetching feedback by rate', error);
            throw error;
        }
    },

    getFeedbackByHigherEqualRate: async (rate) => {
        try {
            const query = `
            SELECT * FROM feedbacks
            WHERE rate >= $1;
        `;
            const res = await db.query(query, [rate]);
            return res.rows;
        }
        catch (error) {
            console.error('Error fetching feedback by rate', error);
            throw error;
        }
    },

    getFeedbackByLowerEqualRate: async (rate) => {
        try {
            const query = `
            SELECT * FROM feedbacks
            WHERE rate <= $1;
        `;
            const res = await db.query(query, [rate]);
            return res.rows;
        }
        catch (error) {
            console.error('Error fetching feedback by rate', error);
            throw error;
        }
    },


    // Thêm feedback mới
    submitFeedback: async (rating, feedback_text, serviceId) => {
        try {
            const query = `
        INSERT INTO feedbacks (rate, detail, facility_id)
        VALUES ($1, $2, $3)
        RETURNING *;  -- Trả về feedback đã thêm vào
      `;
            const res = await db.query(query, [rating, feedback_text, serviceId]);
            return res.rows[0];  // Trả về feedback mới đã được thêm
        } catch (error) {
            console.error('Error submitting feedback:', error);
            throw error;  // Ném lỗi nếu có sự cố trong truy vấn
        }
    },

    // Xóa feedback
    deleteFeedback: async (id) => {
        try {
            const query = `
        DELETE FROM feedbacks
        WHERE id = $1
        RETURNING *;  -- Trả về feedback đã bị xóa
      `;
            const res = await db.query(query, [id]);
            return res.rows[0];  // Trả về feedback đã bị xóa
        } catch (error) {
            console.error('Error deleting feedback:', error);
            throw error;  // Ném lỗi nếu có sự cố trong truy vấn
        }
    },
};

module.exports = FeedbackModel;
