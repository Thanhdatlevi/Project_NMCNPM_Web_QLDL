/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('rest_requests', function (table) {
        table.string('rest_request_id', 20).primary();
        table.specificType('provider_id', 'char(4)')
            .references('provider_id')
            .inTable('providers')
        table.string('facility_name', 50).notNullable();
        table.text('description');
        table.string('location_name', 50);
        table.string('contact', 50);
        table.text('note_content');
        table.specificType('image_urls', 'TEXT[]');

    }).then(() => {
        // Thêm ràng buộc kiểm tra số phần tử của image_urls
        return knex.raw(`
      ALTER TABLE "rest_requests"
      ADD CONSTRAINT check_image_urls_fixed_length
      CHECK (array_length(image_urls, 1) = 3);
    `);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.schema.dropTable('restRequests');

};
