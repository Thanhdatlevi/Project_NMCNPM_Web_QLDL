/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex("tourists").insert([
        { tourist_id: 't001', user_id: 'u003' },
        { tourist_id: 't002', user_id: 'u005' },
        { tourist_id: 't003', user_id: 'u008' }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex("tourists").whereIn("tourist_id", ['t001', 't002', 't003']).del();
};
