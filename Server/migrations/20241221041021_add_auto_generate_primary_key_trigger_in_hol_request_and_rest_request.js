/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
    // Tạo sequence cho rest_request_id
    await knex.schema.raw(`
    CREATE SEQUENCE IF NOT EXISTS rest_request_seq START 1;
  `);

    // Tạo sequence cho hol_request_id
    await knex.schema.raw(`
    CREATE SEQUENCE IF NOT EXISTS hol_request_seq START 1;
  `);

    // Tạo hàm trigger cho bảng rest_requests
    await knex.schema.raw(`
    CREATE OR REPLACE FUNCTION generate_rest_request_key()
    RETURNS TRIGGER AS $$
    DECLARE
        new_key CHAR(20);
    BEGIN
        -- Tạo khóa chính tự động cho rest_request_id
        IF NEW.rest_request_id IS NULL OR NEW.rest_request_id = '' THEN
            new_key := 'REST_' || LPAD(nextval('rest_request_seq')::TEXT, 15, '0');
            NEW.rest_request_id := new_key;
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    // Tạo hàm trigger cho bảng hol_requests
    await knex.schema.raw(`
    CREATE OR REPLACE FUNCTION generate_hol_request_key()
    RETURNS TRIGGER AS $$
    DECLARE
        new_key CHAR(20);
    BEGIN
        -- Tạo khóa chính tự động cho hol_request_id
        IF NEW.hol_request_id IS NULL OR NEW.hol_request_id = '' THEN
            new_key := 'HOL_' || LPAD(nextval('hol_request_seq')::TEXT, 15, '0');
            NEW.hol_request_id := new_key;
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    // Gắn trigger vào bảng rest_requests
    await knex.schema.raw(`
    CREATE TRIGGER auto_generate_primary_key_rest_request
    BEFORE INSERT ON rest_requests
    FOR EACH ROW
    EXECUTE FUNCTION generate_rest_request_key();
  `);

    // Gắn trigger vào bảng hol_requests
    await knex.schema.raw(`
    CREATE TRIGGER auto_generate_primary_key_hol_request
    BEFORE INSERT ON hol_requests
    FOR EACH ROW
    EXECUTE FUNCTION generate_hol_request_key();
  `);
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {
    // Xóa trigger khỏi bảng rest_requests
    await knex.schema.raw(`
    DROP TRIGGER IF EXISTS auto_generate_primary_key_rest_request ON rest_requests;
  `);

    // Xóa trigger khỏi bảng hol_requests
    await knex.schema.raw(`
    DROP TRIGGER IF EXISTS auto_generate_primary_key_hol_request ON hol_requests;
  `);

    // Xóa hàm trigger
    await knex.schema.raw(`
    DROP FUNCTION IF EXISTS generate_rest_request_key;
  `);

    await knex.schema.raw(`
    DROP FUNCTION IF EXISTS generate_hol_request_key;
  `);

    // Xóa sequence
    await knex.schema.raw(`
    DROP SEQUENCE IF EXISTS rest_request_seq;
  `);

    await knex.schema.raw(`
    DROP SEQUENCE IF EXISTS hol_request_seq;
  `);
};
