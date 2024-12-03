/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Chèn dữ liệu vào bảng hotels
    await knex("hotels").insert([
        { hotel_id: 'h001', facility_id: 'f001', amenities: 'Spa, Gym, Swimming Pool, Free WiFi' },  // Khách sạn Sofitel Legend Metropole Hanoi
        { hotel_id: 'h002', facility_id: 'f002', amenities: 'Restaurant, Conference Rooms, Gym' },     // Khách sạn InterContinental Saigon
        { hotel_id: 'h003', facility_id: 'f003', amenities: 'Business Center, Lounge, Spa' },          // Khách sạn JW Marriott Hanoi
        { hotel_id: 'h004', facility_id: 'f004', amenities: 'Bar, Swimming Pool, Spa' },               // Khách sạn Park Hyatt Saigon
        { hotel_id: 'h005', facility_id: 'f005', amenities: 'Luxury Suites, Fitness Center, Free Parking' }, // Khách sạn The Reverie Saigon
        { hotel_id: 'h006', facility_id: 'f011', amenities: 'Luxury, Spa, Conference Hall' },   // Khách sạn Melia Hanoi
        { hotel_id: 'h007', facility_id: 'f013', amenities: 'Modern, Pool, Fitness Center' },   // Khách sạn Pullman Saigon Centre
        { hotel_id: 'h008', facility_id: 'f016', amenities: 'Premium, Riverside View, Bar' },   // Khách sạn Novotel Danang Premier
        { hotel_id: 'h009', facility_id: 'f018', amenities: 'French Design, Garden View' }     // Khách sạn Sammy Dalat
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Xoá dữ liệu khi rollback
    await knex("hotels").whereIn("hotel_id", [
        'h001', 'h002', 'h003', 'h004', 'h005', 'h006', 'h007', 'h008', 'h009'
    ]).del();
};
