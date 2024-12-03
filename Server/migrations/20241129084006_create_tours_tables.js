/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.schema
        .createTable('tours', function (table) {
            table.specificType('tour_id', 'CHAR(4)').primary();
            table.string('tour_name', 50).unique();
            table.specificType('location_id', 'CHAR(4)').references('location_id').inTable('locations');
        })
        .createTable('tour_facilities', function (table) {
            table.specificType('tour_id', 'CHAR(4)').references('tour_id').inTable('tours');
            table.specificType('facility_id', 'CHAR(4)').references('facility_id').inTable('facilities');
            table.primary(['tour_id', 'facility_id']);
        })
        .createTable('tour_attractions', function (table) {
            table.specificType('tour_id', 'CHAR(4)').references('tour_id').inTable('tours');
            table.specificType('attraction_id', 'CHAR(4)').references('attraction_id').inTable('attractions');
            table.primary(['tour_id', 'attraction_id']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.schema
        .dropTableIfExists('tour_attractions')
        .dropTableIfExists('tour_facilities')
        .dropTableIfExists('tours');
};
