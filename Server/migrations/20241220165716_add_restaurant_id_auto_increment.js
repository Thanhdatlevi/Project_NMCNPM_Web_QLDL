/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
    CREATE SEQUENCE restaurant_id_seq START 11;
  `);

    // 2. Tạo function để tự động gán restaurant_id
    await knex.raw(`
    CREATE OR REPLACE FUNCTION generate_restaurant_id()
    RETURNS TRIGGER AS $$
    BEGIN
        -- Gán restaurant_id theo format 'r' + số từ sequence
        NEW.restaurant_id := 'r' || LPAD(NEXTVAL('restaurant_id_seq')::TEXT, 3, '0');
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    // 3. Tạo trigger gắn vào bảng restaurants
    await knex.raw(`
    CREATE TRIGGER trigger_generate_restaurant_id
    BEFORE INSERT ON restaurants
    FOR EACH ROW
    EXECUTE FUNCTION generate_restaurant_id();
  `);

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw(`
    DROP TRIGGER IF EXISTS trigger_generate_restaurant_id ON restaurants;
  `);

    // 2. Xóa function
    await knex.raw(`
    DROP FUNCTION IF EXISTS generate_restaurant_id;
  `);

    // 3. Xóa sequence
    await knex.raw(`
    DROP SEQUENCE IF EXISTS restaurant_id_seq;
  `);
};
