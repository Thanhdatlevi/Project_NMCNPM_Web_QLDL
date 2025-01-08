/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .table('restaurants', function (table) {
            table.decimal('average_price').notNullable().defaultTo(0.0);
        })
        .table('hotels', function (table) {
            table.decimal('average_price').notNullable().defaultTo(0.0);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .table('restaurants', function (table) {
            table.dropColumn('average_price');
        })
        .table('hotels', function (table) {
            table.dropColumn('average_price');
        });
};
