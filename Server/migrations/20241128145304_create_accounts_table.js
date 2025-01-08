/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('accounts', (table) => {
        table.specificType('account_id', 'char(4)').primary();
        table.string('account_name', 50);
        table.string('account_email', 100);
        table.specificType('account_password', 'char(64)');
        table.integer('account_role').references('role_id').inTable('roles').onDelete('CASCADE');
        table.specificType('salt', 'char(32)');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('accounts');
};
