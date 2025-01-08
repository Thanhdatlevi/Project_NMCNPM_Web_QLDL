exports.up = function (knex) {
    return knex.raw(`
        ALTER TABLE users 
        DROP CONSTRAINT IF EXISTS users_account_id_foreign, 
        ADD CONSTRAINT users_account_id_foreign 
        FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE;
    `)
        .then(() => {
            return knex.raw(`
            ALTER TABLE tourists 
            DROP CONSTRAINT IF EXISTS tourists_account_id_foreign, 
            ADD CONSTRAINT tourists_account_id_foreign 
            FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE;
        `);
        })
        .then(() => {
            return knex.raw(`
            ALTER TABLE providers 
            DROP CONSTRAINT IF EXISTS providers_account_id_foreign, 
            ADD CONSTRAINT providers_account_id_foreign 
            FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE;
        `);
        });
};

exports.down = function (knex) {
    return knex.raw(`
        ALTER TABLE users 
        DROP CONSTRAINT IF EXISTS users_account_id_foreign;
    `)
        .then(() => {
            return knex.raw(`
            ALTER TABLE tourists 
            DROP CONSTRAINT IF EXISTS tourists_account_id_foreign;
        `);
        })
        .then(() => {
            return knex.raw(`
            ALTER TABLE providers 
            DROP CONSTRAINT IF EXISTS providers_account_id_foreign;
        `);
        });
};
