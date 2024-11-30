// Mở dialog khi nút được bấm
document.getElementById("openDialogBtn").addEventListener("click", function () {
    document.getElementById("roomDialog").style.display = "block";  // Hiển thị dialog

    // Mô phỏng việc lấy dữ liệu phòng (dữ liệu này có thể được lấy từ cơ sở dữ liệu)
    const roomData = [
        { room_id: '101', price: '100.00', status: 'available' },  // Phòng 101
        { room_id: '102', price: '100.00', status: 'reserved' },    // Phòng 102
        { room_id: '103', price: '100.00', status: 'available' },   // Phòng 103
    ];

    // Duyệt qua dữ liệu phòng và chèn vào bảng
    const tableBody = document.getElementById("roomTableBody");
    tableBody.innerHTML = "";  // Xóa dữ liệu cũ trong bảng

    roomData.forEach(room => {
        const row = document.createElement("tr");  // Tạo dòng mới trong bảng
        row.innerHTML = `<td>${room.room_id}</td><td>${room.price}</td><td>${room.status}</td>`;  // Chèn dữ liệu vào cột
        tableBody.appendChild(row);  // Thêm dòng vào bảng
    });
});

// Thêm phòng mới khi nút "Add Room" được bấm
document.getElementById("addRoomBtn").addEventListener("click", function () {
    // Mô phỏng dữ liệu phòng mới
    const newRoom = { room_id: '104', price: '100.00', status: 'available' };  // Phòng mới với ID 104

    // Thêm phòng mới vào bảng
    const tableBody = document.getElementById("roomTableBody");
    const row = document.createElement("tr");  // Tạo dòng mới
    row.innerHTML = `<td>${newRoom.room_id}</td><td>${newRoom.price}</td><td>${newRoom.status}</td>`;  // Chèn dữ liệu phòng mới vào bảng
    tableBody.appendChild(row);  // Thêm dòng vào bảng

    // Tùy chọn: Mô phỏng việc lưu phòng này vào cơ sở dữ liệu
    // Trong một ứng dụng thực tế, bạn sẽ gửi yêu cầu API tới backend để lưu phòng vào cơ sở dữ liệu.
});

// Đóng dialog khi nút "X" được bấm
document.getElementById("closeDialogBtn").addEventListener("click", function () {
    document.getElementById("roomDialog").style.display = "none";  // Ẩn dialog
});

// Đóng dialog khi bấm ra ngoài dialog
window.onclick = function (event) {
    if (event.target === document.getElementById("roomDialog")) {
        document.getElementById("roomDialog").style.display = "none";  // Ẩn dialog khi bấm ngoài vùng dialog
    }
}
