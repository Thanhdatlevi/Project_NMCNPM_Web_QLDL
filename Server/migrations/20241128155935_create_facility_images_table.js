/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.schema.createTable('facility_images', function (table) {
        table.increments('img_id').primary();
        table.specificType('facility_id', 'char(4)');
        table.string('img_url', 255);
        table.primary(['img_id', 'facility_id']);
        table.foreign('facility_id').references('facility_id').inTable('facilities');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.schema.dropTableIfExists('facility_images');
};
