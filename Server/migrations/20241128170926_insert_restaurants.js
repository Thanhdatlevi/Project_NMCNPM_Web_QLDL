/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Chèn dữ liệu vào bảng restaurants
    await knex("restaurants").insert([
        { restaurant_id: 'r001', facility_id: 'f006', opening_hours: '08:00-22:00', cuisine_type: 'Vietnamese' },
        { restaurant_id: 'r003', facility_id: 'f007', opening_hours: '10:00-22:00', cuisine_type: 'International' },
        { restaurant_id: 'r004', facility_id: 'f008', opening_hours: '07:00-21:00', cuisine_type: 'Vietnamese' },
        { restaurant_id: 'r005', facility_id: 'f009', opening_hours: '10:00-23:00', cuisine_type: 'Italian' },
        { restaurant_id: 'r006', facility_id: 'f010', opening_hours: '11:00-22:00', cuisine_type: 'Seafood' },
        { restaurant_id: 'r007', facility_id: 'f012', opening_hours: '11:00-22:00', cuisine_type: 'Vietnamese' },
        { restaurant_id: 'r008', facility_id: 'f014', opening_hours: '09:00-22:00', cuisine_type: 'Vietnamese' },
        { restaurant_id: 'r009', facility_id: 'f015', opening_hours: '10:00-21:00', cuisine_type: 'Seafood' },
        { restaurant_id: 'r010', facility_id: 'f017', opening_hours: '10:00-22:00', cuisine_type: 'Vietnamese' },
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Xoá dữ liệu khi rollback
    await knex("restaurants").whereIn("restaurant_id", [
        'r001', 'r003', 'r004', 'r005', 'r006', 'r007',
        'r008', 'r009', 'r010'
    ]).del();
};
