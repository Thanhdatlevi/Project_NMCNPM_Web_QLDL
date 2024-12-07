/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('facilities', (table) => {
        table.specificType('facility_id', 'char(4)').primary();
        table.specificType('provider_id', 'char(4)').references('provider_id').inTable('providers');
        table.string('facility_name', 50).notNullable();
        table.text('description');
        table.specificType('location_id', 'char(4)').references('location_id').inTable('locations');
        table.string('contact', 50);
        table.string('deal', 50);
        table.enu('status', ['available', 'not_available']).defaultTo('available');
        table.float('rating')

    }).then(() => {
        return knex.raw('ALTER TABLE facilities ADD CONSTRAINT rating_check CHECK (rating >= 0 AND rating <= 5)');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('facilities');
};
