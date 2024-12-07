/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('rooms', function (table) {
        table.specificType('room_id', 'char(4)');
        table.specificType('hotel_id', 'char(4)').references('hotel_id').inTable('hotels');
        table.decimal('price', 10, 2);
        table.enu('status', ['available', 'reserved']).defaultTo('available');
        table.primary(['room_id', 'hotel_id']);
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('rooms');
};
