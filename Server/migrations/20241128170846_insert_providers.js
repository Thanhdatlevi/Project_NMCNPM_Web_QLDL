/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex("providers").insert([
        { provider_id: 'p001', user_id: 'u002' },
        { provider_id: 'p002', user_id: 'u006' },
        { provider_id: 'p003', user_id: 'u007' },
        { provider_id: 'p004', user_id: 'u009' },
        { provider_id: 'p005', user_id: 'u010' }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex("providers").whereIn("provider_id", ['p001', 'p002', 'p003', 'p004', 'p005']).del();
};
