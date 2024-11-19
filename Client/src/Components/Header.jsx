import React from 'react';
import '../Styles/Header.css';

const Header = () => {
    // document.getElementById("menu-toggle").addEventListener("click", function () {
    //     const navList = document.querySelector(".nav-list");
    //     const menuIcon = document.querySelector(".menu-icon");
    
    //     // Toggle hiển thị danh sách
    //     navList.classList.toggle("show");
    
    //     // Đổi icon giữa list-button và exit-button
    //     if (navList.classList.contains("show")) {
    //         menuIcon.src = "/Images/exit-button.png"; // Đổi sang icon exit
    //     } else {
    //         menuIcon.src = "/Images/list-button.png"; // Đổi về icon list
    //     }
    // });
    
    return (
        <header class="header-container">
        <nav id="nav">
            <div class="logo-container">
                <a href="./index.html" class="logo-link">
                    <img src="/Images/logoITISE.png" class="logo-image" alt="logITISE"/>
                </a>
            </div>

            <button id="menu-toggle" class="menu-button" aria-label="Toggle Menu">
                <img src="/Images/list-button.png" alt="Menu" class="menu-icon"/>
            </button>

            <ul class="nav-list">
                <li><a href="#!" class="nav-item">Home</a></li>
                <li><a href="#!" class="nav-item">Địa điểm du lịch</a></li>
                <li><a href="./assets/html/form_travel_place.html" class="nav-item">Tours</a></li>
                <li><a href="./assets/html/searchService.html" class="nav-item">Cơ sở dịch vụ</a></li>
                <li><a href="./assets/html/profile.html" class="nav-item">Giới thiệu</a></li>
                <li><a href="#!" class="nav-item">Liên lạc</a></li>
            </ul>

            <div class="nav-button-list">
                <div class="switch">
                    <input id="language-toggle" class="check-toggle check-toggle-round-flat" type="checkbox"
                        onchange="setLanguage()"/>
                    <label for="language-toggle"></label>
                    <span class="on">VI</span>
                    <span class="off">EN</span>
                </div>
                <a href="/home" class="button bg-user-icon">
                    {/* <span class="sr-only">User</span> */}
                </a>
            </div>

        </nav>
    </header>
    );
};

export default Header;
