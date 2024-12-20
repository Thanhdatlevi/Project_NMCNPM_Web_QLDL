/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Bước 1: Đặt `id` làm khóa chính tự động tăng dần.
    await knex.schema.table('detail_reservations', function (table) {
        table.increments('id').primary(); // Đặt cột id làm khóa chính và tự động tăng dần.
    });

    // Bước 2: Xóa khóa ngoại cũ cho `facility_id` (nếu có)
    await knex.schema.table('detail_reservations', function (table) {
        table.dropForeign('reserve_id'); // Xóa khóa ngoại cũ nếu có
    });
    await knex.schema.table('detail_reservations', function (table) {
        table.dropForeign('facility_id'); // Xóa khóa ngoại cũ nếu có
    });

    // Bước 3: Đặt `reserve_id` làm khóa ngoại và cập nhật hành vi khi xóa.
    await knex.schema.table('detail_reservations', function (table) {
        table.foreign('reserve_id') // Cột reserve_id
            .references('reserve_id') // Tham chiếu đến cột reserve_id trong bảng reservations
            .inTable('reservations') // Bảng tham chiếu là reservations
            .onDelete('CASCADE'); // Hành vi xóa cascade (khi bản ghi trong reservations bị xóa thì bản ghi trong detail_reservations sẽ bị xóa)
    });

    // Bước 4: Đặt lại khóa ngoại cho `facility_id` với hành vi ON DELETE SET NULL
    await knex.schema.table('detail_reservations', function (table) {
        table.foreign('facility_id') // Cột facility_id
            .references('facility_id') // Tham chiếu đến cột facility_id trong bảng facilities
            .inTable('facilities') // Bảng tham chiếu là facilities
            .onDelete('SET NULL'); // Hành vi khi xóa facility
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Bước 1: Xóa khóa ngoại cho reserve_id
    await knex.schema.table('detail_reservations', function (table) {
        table.dropForeign('reserve_id');
    });

    // Bước 2: Xóa khóa ngoại cho facility_id
    await knex.schema.table('detail_reservations', function (table) {
        table.dropForeign('facility_id');
    });

    // Bước 3: Xóa cột id và khóa chính
    await knex.schema.table('detail_reservations', function (table) {
        table.dropColumn('id'); // Xóa cột id
    });
};
