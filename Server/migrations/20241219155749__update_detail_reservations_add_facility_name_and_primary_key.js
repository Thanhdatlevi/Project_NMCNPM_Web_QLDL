/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Bước 1: Xóa khóa chính cũ
    await knex.schema.table('detail_reservations', function (table) {
        table.dropPrimary(); // Xóa khóa chính cũ (facility_id, reserve_id)
    });

    // // Bước 2: Thêm các cột mới
    // await knex.schema.table('detail_reservations', function (table) {
    //     table.string('facility_name', 255).nullable(); // Thêm cột facility_name
    //     table.increments('id').nullable(); // Thêm cột id
    // });

    // // Bước 3: Cập nhật khóa chính mới
    // await knex.schema.table('detail_reservations', function (table) {
    //     table.primary('id'); // Đặt id làm khóa chính
    // });

    // // Bước 4: Cập nhật khóa ngoại cho facility_id
    // await knex.schema.table('detail_reservations', function (table) {
    //     table.dropForeign('facility_id'); // Xóa khóa ngoại cũ
    //     table.foreign('facility_id')
    //         .references('facilities.facility_id')
    //         .onDelete('SET NULL'); // Đặt hành vi ON DELETE SET NULL
    // });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Bước 1: Xóa các cột facility_name và id
    // await knex.schema.table('detail_reservations', function (table) {
    //     table.dropColumn('facility_name');
    //     table.dropColumn('id');
    // });

    // Bước 2: Khôi phục khóa chính cũ (facility_id, reserve_id)
    await knex.schema.table('detail_reservations', function (table) {
        table.dropPrimary(); // Xóa khóa chính mới
        table.primary(['facility_id', 'reserve_id']); // Khôi phục khóa chính cũ
    });

    // // Bước 3: Khôi phục khóa ngoại ban đầu cho facility_id
    // await knex.schema.table('detail_reservations', function (table) {
    //     table.dropForeign('facility_id'); // Xóa khóa ngoại mới
    //     table.foreign('facility_id')
    //         .references('facilities.facility_id')
    //         .onDelete('CASCADE'); // Khôi phục hành vi ban đầu
    // });
};
