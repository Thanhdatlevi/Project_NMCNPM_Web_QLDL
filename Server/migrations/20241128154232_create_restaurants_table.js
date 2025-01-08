/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('restaurants', (table) => {
        table.specificType('restaurant_id', 'char(4)').primary();
        table.specificType('facility_id', 'char(4)').unique();
        table.string('opening_hours', 50);
        table.string('cuisine_type', 50);
        table.foreign('facility_id').references('facility_id').inTable('facilities');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('restaurants');
};
