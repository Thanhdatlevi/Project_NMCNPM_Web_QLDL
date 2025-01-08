/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
    CREATE SEQUENCE account_id_seq START WITH 11 INCREMENT BY 1;
  `);

    // Bước 3: Tạo trigger function để sinh account_id tự động
    await knex.raw(`
    CREATE OR REPLACE FUNCTION generate_account_id()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.account_id := 'a' || LPAD(nextval('account_id_seq')::text, 3, '0');
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    // Bước 4: Tạo trigger trước khi insert vào bảng accounts
    await knex.raw(`
    CREATE TRIGGER before_insert_account
    BEFORE INSERT ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION generate_account_id();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw('DROP TRIGGER IF EXISTS before_insert_account ON accounts');
    await knex.raw('DROP FUNCTION IF EXISTS generate_account_id');

    // Xóa sequence nếu rollback
    await knex.raw('DROP SEQUENCE IF EXISTS account_id_seq');

};
