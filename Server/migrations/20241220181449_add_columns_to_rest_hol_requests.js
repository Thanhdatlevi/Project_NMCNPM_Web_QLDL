/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return Promise.all([
        knex.schema.table('rest_requests', (table) => {
            table.integer('tables_num');
        }),
        knex.schema.table('hol_requests', (table) => {
            table.integer('rooms_num');
        })
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return Promise.all([
        knex.schema.table('rest_requests', (table) => {
            table.dropColumn('tables_num');
        }),
        knex.schema.table('hol_requests', (table) => {
            table.dropColumn('rooms_num');
        })
    ]);
};
