/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex("admins").insert([
        { admin_id: 'a001', user_id: 'u001' },
        { admin_id: 'a002', user_id: 'u004' }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex("admins").whereIn("admin_id", ['a001', 'a002']).del();
};
