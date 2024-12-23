import '../Styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };
    const [user, setUser] = useState(null); // Lưu thông tin người dùng
    const navigate = useNavigate(); // Sử dụng để chuyển hướng trang

    // Gọi API để lấy thông tin xác thực người dùng
    useEffect(() => {
        const fetchAuthentication = async () => {
            try {
                const response = await fetch('/authenticate', {
                    method: 'GET',
                    credentials: 'include', // Để gửi cookie cùng yêu cầu
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    setUser(null); // Chưa đăng nhập
                }
            } catch (error) {
                console.error('Error fetching authentication:', error);
                setUser(null);
            }
        };

        fetchAuthentication();
    }, []);

    // Xử lý logout
    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include', // Để gửi cookie trong yêu cầu
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Logout successful');
                setUser(null); // Xóa trạng thái đăng nhập
                navigate('/login'); // Chuyển hướng về trang đăng nhập
            } else {
                console.error('Logout failed');
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('An error occurred during logout. Please try again.');
        }
    };
    return (
        <header class="header-container">
        <nav id="nav">
            <div class="logo-container">
            <Link to="/home" className="logo-link">
                <img src="/Images/logoITISE.png" className="logo-image" alt="logITISE"/>
            </Link>
            </div>

            <button id="menu-toggle" class="menu-button" aria-label="Toggle Menu">
                <img src="/Images/list-button.png" alt="Menu" class="menu-icon"/>
            </button>

            <ul class="nav-list">
                <Link to="/home" className="nav-item">Home</Link>
                {user && (<Link to="/HomePlace" className="nav-item">Tạo lịch trình</Link>)}
                <Link to="/searchService" className="nav-item">Cơ sở dịch vụ</Link>
            </ul>

            <div class="nav-button-list">
                <div class="switch">
                    <input id="language-toggle" class="check-toggle check-toggle-round-flat" type="checkbox"
                        onchange="setLanguage()"/>
                    <label for="language-toggle"></label>
                    <span class="on">VI</span>
                    <span class="off">EN</span>
                </div>
                {user ? (
                    <div className="user-dropdown">
                        <div className="user-info" onClick={toggleDropdown}>
                            <span className="user-name">{user.accountName}</span>
                            <span className={`arrow ${isDropdownVisible ? 'open' : ''}`}>▼</span>
                        </div>
                        {isDropdownVisible && (
                            <div className="dropdown-menu">
                                <Link to="/profile">
                                    <button className="dropdown-item">Profile</button>
                                </Link>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="button bg-user-icon"></Link>
                )}
            </div>

        </nav>
    </header>
    );
};

export default Header;
