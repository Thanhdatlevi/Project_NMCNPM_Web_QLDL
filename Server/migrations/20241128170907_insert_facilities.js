/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // Chèn dữ liệu vào bảng facilities
    await knex("facilities").insert([
        { facility_id: 'f001', provider_id: 'p001', facility_name: 'Khách sạn Sofitel Legend Metropole Hanoi', description: 'Khách sạn sang trọng với lịch sử lâu đời, phục vụ đẳng cấp quốc tế', location_id: 'l001', contact: '024 3826 6919', rating: 4.2, deal: 'Sale-off', status: 'available' },
        { facility_id: 'f002', provider_id: 'p002', facility_name: 'Khách sạn InterContinental Saigon', description: 'Khách sạn 5 sao, tọa lạc tại trung tâm thành phố, gần các điểm du lịch nổi tiếng.', location_id: 'l002', contact: '028 3520 9988', rating: 4.5, deal: 'Best-seller', status: 'available' },
        { facility_id: 'f003', provider_id: 'p003', facility_name: 'Khách sạn JW Marriott Hanoi', description: 'Khách sạn 5 sao cao cấp, nổi bật với thiết kế hiện đại và sang trọng tại Hà Nội.', location_id: 'l001', contact: '024 3938 8888', rating: 4.7, deal: 'Best-seller', status: 'available' },
        { facility_id: 'f004', provider_id: 'p001', facility_name: 'Khách sạn Park Hyatt Saigon', description: 'Khách sạn 5 sao đẳng cấp, nằm ngay trung tâm thành phố Hồ Chí Minh, gần các khu mua sắm.', location_id: 'l002', contact: '028 3824 1234', rating: 4.6, deal: 'Sale-off', status: 'available' },
        { facility_id: 'f005', provider_id: 'p002', facility_name: 'Khách sạn The Reverie Saigon', description: 'Khách sạn 5 sao sang trọng, nội thất đẳng cấp với dịch vụ tuyệt vời ở trung tâm Sài Gòn.', location_id: 'l002', contact: '028 3823 6688', rating: 4.8, deal: 'Best-seller', status: 'available' },
        { facility_id: 'f006', provider_id: 'p003', facility_name: 'Phở 24', description: 'Một chuỗi nhà hàng phở nổi tiếng', location_id: 'l001', contact: '0901234567', rating: 4.3, deal: 'Sale-off', status: 'available' },
        { facility_id: 'f007', provider_id: 'p003', facility_name: 'The Deck Saigon', description: 'Nhà hàng sang trọng ven sông', location_id: 'l002', contact: '0903456789', rating: 4.5, deal: 'Best-seller', status: 'available' },
        { facility_id: 'f008', provider_id: 'p001', facility_name: 'Bún Chả Hương Liên', description: 'Bún chả nổi tiếng Hà Nội', location_id: 'l001', contact: '0904567890', rating: 4.6, deal: 'Best-seller', status: 'available' },
        { facility_id: 'f009', provider_id: 'p002', facility_name: 'Pizza 4Ps', description: 'Pizza ngon với nhiều loại topping', location_id: 'l002', contact: '0905678901', rating: 4.4, deal: 'Sale-off', status: 'available' },
        { facility_id: 'f010', provider_id: 'p003', facility_name: 'Lúa Restaurant', description: 'Nhà hàng hải sản nổi tiếng', location_id: 'l003', contact: '0909012345', rating: 4.7, deal: 'Best-seller', status: 'available' },
        // Hà Nội
        { facility_id: 'f011', provider_id: 'p001', facility_name: 'Khách sạn Melia Hanoi', description: 'Khách sạn sang trọng với các dịch vụ cao cấp tại trung tâm Hà Nội.', location_id: 'l001', contact: '024 3934 3343', rating: 4.6, deal: 'Sale-off', status: 'available' },
        { facility_id: 'f012', provider_id: 'p003', facility_name: 'Nhà hàng Red Bean Trendy', description: 'Nhà hàng phục vụ món ăn Việt Nam hiện đại tại Hà Nội.', location_id: 'l001', contact: '024 3266 8453', rating: 4.8, deal: 'Best-seller', status: 'available' },
        // Hồ Chí Minh
        { facility_id: 'f013', provider_id: 'p001', facility_name: 'Khách sạn Pullman Saigon Centre', description: 'Khách sạn hiện đại với tiện nghi đẳng cấp.', location_id: 'l002', contact: '028 3838 8686', rating: 4.4, deal: 'Best-seller', status: 'available' },
        { facility_id: 'f014', provider_id: 'p002', facility_name: 'Nhà hàng Ngon 138', description: 'Nhà hàng nổi tiếng với tầm nhìn toàn cảnh thành phố.', location_id: 'l002', contact: '028 3824 7272', rating: 4.7, deal: 'Sale-off', status: 'available' },
        // Phan Thiết
        { facility_id: 'f015', provider_id: 'p002', facility_name: 'Nhà hàng Cây Bàng', description: 'Nhà hàng nổi tiếng với các món hải sản tươi ngon.', location_id: 'l003', contact: '0252 3848 888', rating: 4.5, deal: 'Sale-off', status: 'available' },
        // Đà Nẵng
        { facility_id: 'f016', provider_id: 'p001', facility_name: 'Khách sạn Novotel Danang Premier', description: 'Khách sạn cao cấp với tầm nhìn ra sông Hàn.', location_id: 'l005', contact: '0236 3929 999', rating: 4.8, deal: 'Sale-off', status: 'available' },
        { facility_id: 'f017', provider_id: 'p003', facility_name: 'Nhà hàng Bà Thôi', description: 'Nhà hàng phục vụ món ăn truyền thống.', location_id: 'l004', contact: '0203 3848 299', rating: 4.3, deal: 'Best-seller', status: 'available' },
        // Lâm Đồng
        { facility_id: 'f018', provider_id: 'p001', facility_name: 'Khách sạn Sammy Dalat', description: 'Khách sạn với thiết kế kiểu Pháp, nằm giữa trung tâm Đà Lạt.', location_id: 'l010', contact: '0263 3556 777', rating: 4.5, deal: 'Best-seller', status: 'available' }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Xoá dữ liệu khi rollback
    await knex("facilities").whereIn("facility_id", [
        'f001', 'f002', 'f003', 'f004', 'f005', 'f006', 'f007', 'f008', 'f009', 'f010',
        'f011', 'f012', 'f013', 'f014', 'f015', 'f016', 'f017', 'f018'
    ]).del();
};
