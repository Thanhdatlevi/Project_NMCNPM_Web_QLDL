/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('hotels', function (table) {
        table.specificType('hotel_id', 'char(4)').primary();
        table.specificType('facility_id', 'char(4)').unique().references('facility_id').inTable('facilities');
        table.text('amenities');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('hotels');
};
