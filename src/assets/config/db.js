const { Pool } = require('pg');

// Tạo pool kết nối tới cơ sở dữ liệu
const pool = new Pool({
    user: 'avnadmin',         // Thay 'your_username' bằng tên người dùng của bạn
    host: 'cnpm-tailieuithcmus-21f9.j.aivencloud.com',      // Địa chỉ máy chủ PostgreSQL
    database: 'defaultdb', // Thay 'your_database_name' bằng tên cơ sở dữ liệu của bạn
    password: 'AVNS_AVbAZYAy-YpNinEJSYW',      // Thay 'your_password' bằng mật khẩu của bạn
    port: 27110,                     // Cổng mặc định của PostgreSQL
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});


module.exports = {
    query: (text, params) => pool.query(text, params),
};