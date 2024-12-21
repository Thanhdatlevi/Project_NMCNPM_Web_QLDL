/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
    CREATE SEQUENCE facility_id_seq START 19;
  `);

    // 2. Tạo function để tự động gán facility_id
    await knex.raw(`
    CREATE OR REPLACE FUNCTION generate_facility_id()
    RETURNS TRIGGER AS $$
    BEGIN
        -- Gán facility_id theo format 'f' + số từ sequence
        NEW.facility_id := 'f' || LPAD(NEXTVAL('facility_id_seq')::TEXT, 3, '0');
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    await knex.raw(`
    CREATE TRIGGER trigger_generate_facility_id
    BEFORE INSERT ON facilities
    FOR EACH ROW
    EXECUTE FUNCTION generate_facility_id();
  `);

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw(`
    DROP TRIGGER IF EXISTS trigger_generate_facility_id ON facilities;
  `);

    // 2. Xóa function
    await knex.raw(`
    DROP FUNCTION IF EXISTS generate_facility_id;
  `);

    // 3. Xóa sequence
    await knex.raw(`
    DROP SEQUENCE IF EXISTS facility_id_seq;
  `);
};
