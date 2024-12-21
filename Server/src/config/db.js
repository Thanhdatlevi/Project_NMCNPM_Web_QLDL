const { Pool } = require('pg');
require('dotenv').config();
// Tạo pool kết nối tới cơ sở dữ liệu
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});


module.exports = {
    query: (text, params) => pool.query(text, params),

    beginTransaction: async () => {
        const client = await pool.connect();
        await client.query('BEGIN');
        return client;
    },

    commitTransaction: async (client) => {
        await client.query('COMMIT');
        client.release();
    },

    rollbackTransaction: async (client) => {
        await client.query('ROLLBACK');
        client.release();
    }
};