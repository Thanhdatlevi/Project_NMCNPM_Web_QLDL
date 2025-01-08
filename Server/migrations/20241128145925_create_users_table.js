/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.specificType('user_id', 'char(4)').primary();
        table.specificType('account_id', 'char(4)').unique().references('account_id').inTable('accounts');
        table.string('user_fullname', 100);
        table.date('user_birthday');
        table.string('user_contact', 50);
        table.string('user_address', 100);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
