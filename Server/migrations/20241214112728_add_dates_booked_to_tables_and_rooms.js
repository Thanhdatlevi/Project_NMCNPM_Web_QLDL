/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('tables', (table) => {
        table.specificType('dates_booked', 'DATE[]').defaultTo('{}');
    });

    // Thêm cột 'dates_booked' vào bảng 'rooms'
    await knex.schema.alterTable('rooms', (table) => {
        table.specificType('dates_booked', 'DATE[]').defaultTo('{}');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.alterTable('tables', (table) => {
        table.dropColumn('dates_booked');
    });

    // Xóa cột 'dates_booked' khỏi bảng 'rooms'
    await knex.schema.alterTable('rooms', (table) => {
        table.dropColumn('dates_booked');
    });
};
