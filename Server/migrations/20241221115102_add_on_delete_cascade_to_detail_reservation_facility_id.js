/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.schema.alterTable('detail_reservations', function (table) {
        table.dropForeign('facility_id');
        table
            .foreign('facility_id')
            .references('facility_id')
            .inTable('facilities')
            .onDelete('SET NULL');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.schema.alterTable('detail_reservations', function (table) {
        table.dropForeign('facility_id');
        table
            .foreign('facility_id')
            .references('facility_id')
            .inTable('facilities');
    });
};
