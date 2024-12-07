/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex("users").insert([
        { user_id: 'u001', account_id: 'a001', user_fullname: 'Alice Johnson', user_birthday: '1990-05-15', user_contact: '123-456-7890', user_address: '123 Main St, Springfield' },
        { user_id: 'u002', account_id: 'a002', user_fullname: 'Bob Smith', user_birthday: '1985-09-23', user_contact: '987-654-3210', user_address: '456 Elm St, Shelbyville' },
        { user_id: 'u003', account_id: 'a003', user_fullname: 'Charlie Brown', user_birthday: '1992-12-01', user_contact: '555-123-4567', user_address: '789 Oak St, Capital City' },
        { user_id: 'u004', account_id: 'a004', user_fullname: 'Diana Prince', user_birthday: '1988-11-08', user_contact: '444-567-8910', user_address: '321 Maple St, Metropolis' },
        { user_id: 'u005', account_id: 'a005', user_fullname: 'Eve Adams', user_birthday: '1995-03-14', user_contact: '333-555-6789', user_address: '654 Pine St, Gotham City' },
        { user_id: 'u006', account_id: 'a006', user_fullname: 'Frank Miller', user_birthday: '1983-07-22', user_contact: '222-333-4444', user_address: '789 Cedar St, Star City' },
        { user_id: 'u007', account_id: 'a007', user_fullname: 'Grace Hopper', user_birthday: '1998-01-05', user_contact: '111-222-3333', user_address: '987 Willow St, Central City' },
        { user_id: 'u008', account_id: 'a008', user_fullname: 'Hank Pym', user_birthday: '1991-04-11', user_contact: '777-888-9999', user_address: '321 Birch St, Coast City' },
        { user_id: 'u009', account_id: 'a009', user_fullname: 'Ivy Pepper', user_birthday: '1993-08-19', user_contact: '666-777-8888', user_address: '456 Cherry St, National City' },
        { user_id: 'u010', account_id: 'a010', user_fullname: 'Jack Ryan', user_birthday: '1987-06-30', user_contact: '999-000-1111', user_address: '123 Walnut St, Keystone City' }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex("users").whereIn("user_id", [
        'u001', 'u002', 'u003', 'u004', 'u005',
        'u006', 'u007', 'u008', 'u009', 'u010'
    ]).del();
};
