/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await Promise.all([
        knex.schema.table('rest_requests', (table) => {
            // Đổi tên cột location_name thành specific_location
            table.renameColumn('location_name', 'specific_location');

            // Thêm cột location_id tham chiếu đến location_id của bảng locations
            table.specificType('location_id', 'char(4)').references('location_id').inTable('locations').onDelete('CASCADE');
        }),
        knex.schema.table('hol_requests', (table) => {
            // Đổi tên cột location_name thành specific_location
            table.renameColumn('location_name', 'specific_location');

            // Thêm cột location_id tham chiếu đến location_id của bảng locations
            table.specificType('location_id', 'char(4)').references('location_id').inTable('locations').onDelete('CASCADE');
        })
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await aPromise.all([
        knex.schema.table('rest_requests', (table) => {
            // Đổi tên cột specific_location thành location_name
            table.renameColumn('specific_location', 'location_name');

            // Xóa cột location_id
            table.dropColumn('location_id');
        }),
        knex.schema.table('hol_requests', (table) => {
            // Đổi tên cột specific_location thành location_name
            table.renameColumn('specific_location', 'location_name');

            // Xóa cột location_id
            table.dropColumn('location_id');
        })
    ]);
};
