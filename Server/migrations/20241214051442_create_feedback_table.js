/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('feedbacks', (table) => {
        table.specificType('id', 'char(20)').primary(); // Khóa chính id, kiểu char(20)
        table.specificType('tourist_id', 'char(4)').references('tourist_id').inTable('tourists').onDelete('CASCADE'); // Khóa ngoại với CASCADE
        table.text('detail').notNullable(); // Chi tiết phản hồi
        table.float('rate').notNullable(); // Đánh giá
        table.specificType('facility_id', 'char(4)').references('facility_id').inTable('facilities').onDelete('CASCADE'); // Khóa ngoại với CASCADE
    });

    // Tạo sequence và trigger như trước
    await knex.raw(`
        CREATE SEQUENCE feedback_id_seq START 1;
    `);

    await knex.raw(`
        CREATE OR REPLACE FUNCTION set_feedback_id() 
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.id := 'FB' || LPAD(nextval('feedback_id_seq')::text, 16, '0');
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    await knex.raw(`
        CREATE TRIGGER feedback_id_trigger
        BEFORE INSERT ON feedbacks
        FOR EACH ROW
        EXECUTE FUNCTION set_feedback_id();
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw('DROP TRIGGER IF EXISTS feedback_id_trigger ON feedbacks;');
    await knex.raw('DROP FUNCTION IF EXISTS set_feedback_id;');
    await knex.raw('DROP SEQUENCE IF EXISTS feedback_id_seq;');

    await knex.schema.dropTableIfExists('feedbacks');
};
