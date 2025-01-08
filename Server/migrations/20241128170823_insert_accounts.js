/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex("accounts").insert([
        { account_id: 'a001', account_name: 'Alice', account_email: 'alice@example.com', account_password: 'e3afed0047b08059d0fada10f400c1e5', account_role: 1, salt: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p' },
        { account_id: 'a002', account_name: 'Bob', account_email: 'bob@example.com', account_password: 'b5d4045c6a9f7e75a5368e6d2d01b054', account_role: 2, salt: '2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q' },
        { account_id: 'a003', account_name: 'Charlie', account_email: 'charlie@example.com', account_password: 'f7c3bc1d808e04732adf679965ccc34c', account_role: 3, salt: '3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r' },
        { account_id: 'a004', account_name: 'Diana', account_email: 'diana@example.com', account_password: '827ccb0eea8a706c4c34a16891f84e7b', account_role: 1, salt: '4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s' },
        { account_id: 'a005', account_name: 'Eve', account_email: 'eve@example.com', account_password: 'b2a5c7ccac8d6b23e22e02a2bb2a2c6e', account_role: 2, salt: '5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t' },
        { account_id: 'a006', account_name: 'Frank', account_email: 'frank@example.com', account_password: '8d9c307cb7f3c4a32822a51922d1ceaa', account_role: 3, salt: '6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u' },
        { account_id: 'a007', account_name: 'Grace', account_email: 'grace@example.com', account_password: '5f4dcc3b5aa765d61d8327deb882cf99', account_role: 1, salt: '7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v' },
        { account_id: 'a008', account_name: 'Hank', account_email: 'hank@example.com', account_password: 'fcea920f7412b5da7be0cf42b8c93759', account_role: 2, salt: '8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w' },
        { account_id: 'a009', account_name: 'Ivy', account_email: 'ivy@example.com', account_password: '45c48cce2e2d7fbdea1afc51c7c6ad26', account_role: 3, salt: '9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x' },
        { account_id: 'a010', account_name: 'Jack', account_email: 'jack@example.com', account_password: 'd41d8cd98f00b204e9800998ecf8427e', account_role: 1, salt: '0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y' }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex("accounts").whereIn("account_id", [
        'a001', 'a002', 'a003', 'a004', 'a005',
        'a006', 'a007', 'a008', 'a009', 'a010'
    ]).del();
};
