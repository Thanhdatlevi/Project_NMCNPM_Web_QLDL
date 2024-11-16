document.getElementById("menu-toggle").addEventListener("click", function () {
    const navList = document.querySelector(".nav-list");
    const menuIcon = document.querySelector(".menu-icon");

    // Toggle hiển thị danh sách
    navList.classList.toggle("show");

    // Đổi icon giữa list-button và exit-button
    if (navList.classList.contains("show")) {
        menuIcon.src = "./assets/image/exit-button.png"; // Đổi sang icon exit
    } else {
        menuIcon.src = "./assets/image/list-button.png"; // Đổi về icon list
    }
});
