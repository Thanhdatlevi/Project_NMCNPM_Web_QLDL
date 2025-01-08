/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.raw(`
    -- Tạo function để thêm bản ghi vào bảng users
    CREATE OR REPLACE FUNCTION add_user_on_account_insert()
    RETURNS TRIGGER AS $$
    BEGIN
        -- Chèn bản ghi vào bảng users với user_id chuyển đổi từ account_id
        INSERT INTO users (user_id, account_id)
        VALUES (REPLACE(NEW.account_id, 'a', 'u'), NEW.account_id);
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    -- Tạo trigger gọi function khi thêm mới vào bảng accounts
    CREATE TRIGGER trigger_add_user
    AFTER INSERT ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION add_user_on_account_insert();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.raw(`
    -- Xóa trigger
    DROP TRIGGER IF EXISTS trigger_add_user ON accounts;

    -- Xóa function
    DROP FUNCTION IF EXISTS add_user_on_account_insert;
  `);
};
