/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // 1. Tạo sequence để quản lý số chạy tự động, bắt đầu từ 10
    await knex.raw(`
    CREATE SEQUENCE hotel_id_seq START 10;
  `);

    // 2. Tạo function để tự động gán hotel_id
    await knex.raw(`
    CREATE OR REPLACE FUNCTION generate_hotel_id()
    RETURNS TRIGGER AS $$
    BEGIN
        -- Gán hotel_id theo format 'h' + số từ sequence
        NEW.hotel_id := 'h' || LPAD(NEXTVAL('hotel_id_seq')::TEXT, 3, '0');
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    // 3. Tạo trigger gắn vào bảng hotels
    await knex.raw(`
    CREATE TRIGGER trigger_generate_hotel_id
    BEFORE INSERT ON hotels
    FOR EACH ROW
    EXECUTE FUNCTION generate_hotel_id();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw(`
    DROP TRIGGER IF EXISTS trigger_generate_hotel_id ON hotels;
  `);

    // 2. Xóa function
    await knex.raw(`
    DROP FUNCTION IF EXISTS generate_hotel_id;
  `);

    // 3. Xóa sequence
    await knex.raw(`
    DROP SEQUENCE IF EXISTS hotel_id_seq;
  `);
};
