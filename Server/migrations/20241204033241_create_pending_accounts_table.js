/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.schema.createTable('pending_accounts', (table) => {
        table.string('pending_name', 50).notNullable().unique();
        table.string('pending_email', 100).primary();
        table.specificType('pending_password', 'text').notNullable();
        table.specificType('verification_token', 'text').notNullable();
        table
            .integer('pending_role')
            .notNullable()
            .references('role_id')
            .inTable('roles');
        table.string('salt', 64).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.schema.dropTableIfExists('pending_acounts');
};