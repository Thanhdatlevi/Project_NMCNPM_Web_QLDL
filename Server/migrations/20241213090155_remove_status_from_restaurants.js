/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.schema.table('restaurants', function (table) {
        table.dropColumn('status');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.schema.table('restaurants', function (table) {
        table.string('status').notNullable().defaultTo('active');
    });
};
