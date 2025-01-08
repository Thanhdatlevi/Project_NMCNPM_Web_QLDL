/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.schema.createTable('attractions', function (table) {
        table.specificType('attraction_id', 'char(4)').primary(); // Mã địa điểm vui chơi
        table.string('attraction_name', 100).notNullable(); // Tên địa điểm
        table.text('description'); // Mô tả địa điểm
        table.string('location_id', 255).references('location_id').inTable('locations').onDelete('CASCADE'); // Vị trí của địa điểm
        table.string('contact', 50); // Số điện thoại liên hệ
        table.string('opening_hours', 50); // Giờ mở cửa
        table.float('rating').checkBetween([0, 5]); // Đánh giá (0 đến 5)
        table.string('img_url', 255); // Đường dẫn ảnh
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.schema.dropTableIfExists('attractions');

};
