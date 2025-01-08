/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('tour_facilities', function (table) {
        table.dropForeign('facility_id');
    });

    // Thêm lại khóa ngoại với ON DELETE CASCADE
    await knex.schema.alterTable('tour_facilities', function (table) {
        table.foreign('facility_id').references('facility_id').inTable('facilities').onDelete('SET NULL');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.alterTable('tour_facilities', function (table) {
        table.dropForeign('facility_id');
    });

    await knex.schema.alterTable('tour_facilities', function (table) {
        table.foreign('facility_id').references('facility_id').inTable('facilities');
    });
};
