/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('attractions', function (table) {
        table.text('detailed_location').nullable(); // Thêm cột `detailed_location` với kiểu dữ liệu text
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('attractions', function (table) {
        table.dropColumn('detailed_location'); // Nếu rollback migration, sẽ xóa cột `detailed_location`
    });

};
