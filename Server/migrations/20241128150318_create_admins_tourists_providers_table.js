/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('tourists', (table) => {
            table.specificType('tourist_id', 'char(4)').primary();
            table.specificType('user_id', 'char(4)').unique().references('user_id').inTable('users');
        })
        .createTable('admins', (table) => {
            table.specificType('admin_id', 'char(4)').primary();
            table.specificType('user_id', 'char(4)').unique().references('user_id').inTable('users');
        })
        .createTable('providers', (table) => {
            table.specificType('provider_id', 'char(4)').primary();
            table.specificType('user_id', 'char(4)').unique().references('user_id').inTable('users');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tourists')
        .dropTableIfExists('admins')
        .dropTableIfExists('providers');
};
