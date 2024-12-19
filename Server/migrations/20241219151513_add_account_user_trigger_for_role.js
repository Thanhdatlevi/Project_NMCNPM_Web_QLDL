/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Trigger Function
    await knex.raw(`
    CREATE OR REPLACE FUNCTION handle_account_user_insert()
    RETURNS TRIGGER AS $$
    DECLARE
        new_id TEXT; -- ID mới (admin_id, provider_id, hoặc tourist_id)
        account_role INT; -- Biến lưu trữ account_role
    BEGIN
        -- Lấy account_role từ bảng accounts dựa trên account_id
        SELECT a.account_role INTO account_role
        FROM accounts a
        WHERE account_id = NEW.account_id;

        -- Trường hợp account_role = 1 (Admin)
        IF account_role = 1 THEN
            SELECT CONCAT('a', LPAD((COALESCE(MAX(SUBSTRING(admin_id FROM 2)::INTEGER), 0) + 1)::TEXT, 3, '0'))
            INTO new_id
            FROM admins;

            INSERT INTO admins (admin_id, user_id, account_id)
            VALUES (new_id, NEW.user_id, NEW.account_id);

        -- Trường hợp account_role = 2 (Provider)
        ELSIF account_role = 2 THEN
            SELECT CONCAT('p', LPAD((COALESCE(MAX(SUBSTRING(provider_id FROM 2)::INTEGER), 0) + 1)::TEXT, 3, '0'))
            INTO new_id
            FROM providers;

            INSERT INTO providers (provider_id, user_id, account_id)
            VALUES (new_id, NEW.user_id, NEW.account_id);

        -- Trường hợp account_role = 3 (Tourist)
        ELSIF account_role = 3 THEN
            SELECT CONCAT('t', LPAD((COALESCE(MAX(SUBSTRING(tourist_id FROM 2)::INTEGER), 0) + 1)::TEXT, 3, '0'))
            INTO new_id
            FROM tourists;

            INSERT INTO tourists (tourist_id, user_id, account_id)
            VALUES (new_id, NEW.user_id, NEW.account_id);
        END IF;

        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    // Trigger
    await knex.raw(`
    CREATE TRIGGER after_user_insert
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION handle_account_user_insert();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Xóa Trigger
    await knex.raw(`
    DROP TRIGGER IF EXISTS after_user_insert ON users;
  `);

    // Xóa Trigger Function
    await knex.raw(`
    DROP FUNCTION IF EXISTS handle_account_user_insert();
  `);
};
