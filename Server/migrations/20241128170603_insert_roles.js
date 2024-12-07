/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex("roles").insert([
        { role_id: 1, role_name: "Admin" },
        { role_id: 2, role_name: "Provider" },
        { role_id: 3, role_name: "Tourist" },
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex("roles").whereIn("role_id", [1, 2, 3]).del();
};
