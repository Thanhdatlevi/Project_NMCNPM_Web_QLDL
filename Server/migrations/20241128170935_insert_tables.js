/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Chèn dữ liệu vào bảng tables
    await knex("tables").insert([
        // Phở 24
        { table_id: 't001', restaurant_id: 'r001', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r001', price: 100.00, status: 'reserved' },

        // The Deck Saigon
        { table_id: 't001', restaurant_id: 'r003', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r003', price: 100.00, status: 'reserved' },

        // Bún Chả Hương Liên
        { table_id: 't001', restaurant_id: 'r004', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r004', price: 100.00, status: 'reserved' },

        // Pizza 4P's
        { table_id: 't001', restaurant_id: 'r005', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r005', price: 100.00, status: 'reserved' },

        // Nhà hàng Lúa
        { table_id: 't001', restaurant_id: 'r006', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r006', price: 100.00, status: 'reserved' },

        // Nhà hàng Red Bean Trendy
        { table_id: 't001', restaurant_id: 'r007', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r007', price: 100.00, status: 'reserved' },

        // Nhà hàng Ngon 138
        { table_id: 't001', restaurant_id: 'r008', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r008', price: 100.00, status: 'reserved' },

        // Nhà hàng Cây Bàng
        { table_id: 't001', restaurant_id: 'r009', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r009', price: 100.00, status: 'reserved' },

        // Nhà hàng Bà Thôi
        { table_id: 't001', restaurant_id: 'r010', price: 100.00, status: 'available' },
        { table_id: 't002', restaurant_id: 'r010', price: 100.00, status: 'reserved' },

    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Xoá dữ liệu khi rollback
    await knex("tables").whereIn("table_id", [
        't001', 't002'
    ]).del();
};
