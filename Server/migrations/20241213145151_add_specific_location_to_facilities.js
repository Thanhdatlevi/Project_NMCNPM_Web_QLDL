/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('facilities', function (table) {
        table.string('specific_location'); // Thêm cột specific_location
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('facilities', function (table) {
        table.dropColumn('specific_location'); // Xóa cột specific_location nếu rollback
    })
};
