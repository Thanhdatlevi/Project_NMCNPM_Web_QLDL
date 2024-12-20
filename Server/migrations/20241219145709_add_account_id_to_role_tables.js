/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.table('admins', function (table) {
        table.string('account_id').nullable();
    });

    await knex.schema.table('tourists', function (table) {
        table.string('account_id').nullable();
    });

    await knex.schema.table('providers', function (table) {
        table.string('account_id').nullable();
    });

    // Chuyển đổi user_id thành account_id (thay "u" bằng "a")
    await knex.raw(`
    UPDATE admins
    SET account_id = REPLACE(user_id, 'u', 'a');
  `);

    await knex.raw(`
    UPDATE tourists
    SET account_id = REPLACE(user_id, 'u', 'a');
  `);

    await knex.raw(`
    UPDATE providers
    SET account_id = REPLACE(user_id, 'u', 'a');
  `);

    // Sau khi cập nhật, thay đổi cột account_id thành NOT NULL và thêm khóa ngoại
    await knex.schema.table('admins', function (table) {
        table.string('account_id').notNullable().alter();
        table.foreign('account_id').references('account_id').inTable('accounts');
    });

    await knex.schema.table('tourists', function (table) {
        table.string('account_id').notNullable().alter();
        table.foreign('account_id').references('account_id').inTable('accounts');
    });

    await knex.schema.table('providers', function (table) {
        table.string('account_id').notNullable().alter();
        table.foreign('account_id').references('account_id').inTable('accounts');
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.table('admins', function (table) {
        table.dropForeign('account_id');
        table.dropColumn('account_id');
    });

    await knex.schema.table('tourists', function (table) {
        table.dropForeign('account_id');
        table.dropColumn('account_id');
    });

    await knex.schema.table('providers', function (table) {
        table.dropForeign('account_id');
        table.dropColumn('account_id');
    });
};
