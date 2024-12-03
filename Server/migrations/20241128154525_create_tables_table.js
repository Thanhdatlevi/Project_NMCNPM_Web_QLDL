/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tables', function (table) {
        table.specificType('table_id', 'char(4)');
        table.specificType('restaurant_id', 'char(4)').references('restaurant_id').inTable('restaurants');
        table.decimal('price', 10, 2);
        table.enu('status', ['available', 'reserved']).defaultTo('available');
        table.primary(['table_id', 'restaurant_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tables');
};
