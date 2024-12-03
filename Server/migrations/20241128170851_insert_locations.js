/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Chèn dữ liệu vào bảng locations
    await knex("locations").insert([
        { location_id: 'l001', location_name: 'Hà Nội' },
        { location_id: 'l002', location_name: 'Hồ Chí Minh' },
        { location_id: 'l003', location_name: 'Phan Thiết' },
        { location_id: 'l004', location_name: 'Quảng Ninh' },
        { location_id: 'l005', location_name: 'Đà Nẵng' },
        { location_id: 'l006', location_name: 'Quảng Nam' },
        { location_id: 'l007', location_name: 'Kiên Giang' },
        { location_id: 'l008', location_name: 'Cao Bằng' },
        { location_id: 'l009', location_name: 'Hà Giang' },
        { location_id: 'l010', location_name: 'Lâm Đồng' }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Xoá dữ liệu trong bảng locations khi rollback
    return await knex("locations").whereIn("location_id", [
        'l001', 'l002', 'l003', 'l004', 'l005',
        'l006', 'l007', 'l008', 'l009', 'l010'
    ]).del();
};
