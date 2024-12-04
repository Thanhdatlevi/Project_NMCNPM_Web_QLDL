/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('refresh_tokens', (table) => {
        table.increments('id').primary();
        table.specificType('account_id', 'char(4)').notNullable()
            .references('account_id').inTable('accounts')
            .onDelete('CASCADE');
        table.text('device_id').notNullable();
        table.text('token').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('expires_at');
        table.unique(['account_id', 'device_id']);

    });

    // Tạo Trigger Function để tính expires_at
    await knex.raw(`
        CREATE OR REPLACE FUNCTION set_token_expiry()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.expires_at := NEW.created_at + INTERVAL '30 days';
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    // Gắn Trigger vào bảng refresh_tokens
    await knex.raw(`
        CREATE TRIGGER trigger_set_token_expiry
        BEFORE INSERT ON refresh_tokens
        FOR EACH ROW
        EXECUTE FUNCTION set_token_expiry();
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Xóa bảng refresh_tokens
    await knex.raw(`DROP TRIGGER IF EXISTS trigger_set_token_expiry ON refresh_tokens`);
    await knex.raw(`DROP FUNCTION IF EXISTS set_token_expiry`);
    await knex.schema.dropTableIfExists('refresh_tokens');
};
