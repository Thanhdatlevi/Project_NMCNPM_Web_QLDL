exports.up = async function (knex) {
    return await knex('rooms').insert([
        // Sofitel Legend Metropole Hanoi
        { hotel_id: 'h001', room_id: 'r001', price: 150.00, status: 'available' },
        { hotel_id: 'h001', room_id: 'r002', price: 150.00, status: 'reserved' },
        { hotel_id: 'h001', room_id: 'r003', price: 150.00, status: 'available' },
        { hotel_id: 'h001', room_id: 'r004', price: 150.00, status: 'available' },
        { hotel_id: 'h001', room_id: 'r005', price: 150.00, status: 'reserved' },
        { hotel_id: 'h001', room_id: 'r006', price: 150.00, status: 'available' },
        { hotel_id: 'h001', room_id: 'r007', price: 150.00, status: 'available' },
        { hotel_id: 'h001', room_id: 'r008', price: 150.00, status: 'reserved' },
        { hotel_id: 'h001', room_id: 'r009', price: 150.00, status: 'available' },
        { hotel_id: 'h001', room_id: 'r010', price: 150.00, status: 'available' },
        { hotel_id: 'h001', room_id: 'r011', price: 150.00, status: 'reserved' },
        { hotel_id: 'h001', room_id: 'r012', price: 150.00, status: 'available' },

        // InterContinental Saigon
        { hotel_id: 'h002', room_id: 'r001', price: 120.00, status: 'available' },
        { hotel_id: 'h002', room_id: 'r002', price: 120.00, status: 'reserved' },
        { hotel_id: 'h002', room_id: 'r003', price: 120.00, status: 'available' },
        { hotel_id: 'h002', room_id: 'r004', price: 120.00, status: 'available' },
        { hotel_id: 'h002', room_id: 'r005', price: 120.00, status: 'reserved' },
        { hotel_id: 'h002', room_id: 'r006', price: 120.00, status: 'available' },
        { hotel_id: 'h002', room_id: 'r007', price: 120.00, status: 'available' },
        { hotel_id: 'h002', room_id: 'r008', price: 120.00, status: 'reserved' },
        { hotel_id: 'h002', room_id: 'r009', price: 120.00, status: 'available' },

        // JW Marriott Hanoi
        { hotel_id: 'h003', room_id: 'r001', price: 200.00, status: 'available' },
        { hotel_id: 'h003', room_id: 'r002', price: 200.00, status: 'reserved' },
        { hotel_id: 'h003', room_id: 'r003', price: 200.00, status: 'available' },

        // Park Hyatt Saigon
        { hotel_id: 'h004', room_id: 'r001', price: 270.00, status: 'reserved' },
        { hotel_id: 'h004', room_id: 'r002', price: 270.00, status: 'available' },
        { hotel_id: 'h004', room_id: 'r003', price: 270.00, status: 'reserved' },

        // The Reverie Saigon
        { hotel_id: 'h005', room_id: 'r001', price: 350.00, status: 'available' },
        { hotel_id: 'h005', room_id: 'r002', price: 350.00, status: 'reserved' },
        { hotel_id: 'h005', room_id: 'r003', price: 350.00, status: 'available' },

        // Melia Hanoi
        { hotel_id: 'h006', room_id: 'r001', price: 250.00, status: 'available' },
        { hotel_id: 'h006', room_id: 'r002', price: 250.00, status: 'reserved' },
        { hotel_id: 'h006', room_id: 'r003', price: 250.00, status: 'available' },

        // Pullman Saigon Centre
        { hotel_id: 'h007', room_id: 'r001', price: 220.00, status: 'available' },
        { hotel_id: 'h007', room_id: 'r002', price: 220.00, status: 'reserved' },
        { hotel_id: 'h007', room_id: 'r003', price: 220.00, status: 'available' },

        // Novotel Danang Premier
        { hotel_id: 'h008', room_id: 'r001', price: 180.00, status: 'available' },
        { hotel_id: 'h008', room_id: 'r002', price: 180.00, status: 'reserved' },
        { hotel_id: 'h008', room_id: 'r003', price: 180.00, status: 'available' },

        // Sammy Dalat
        { hotel_id: 'h009', room_id: 'r001', price: 120.00, status: 'available' },
        { hotel_id: 'h009', room_id: 'r002', price: 120.00, status: 'reserved' },
        { hotel_id: 'h009', room_id: 'r003', price: 120.00, status: 'available' }
    ]);
};

exports.down = async function (knex) {
    return await knex('rooms').del();
};
