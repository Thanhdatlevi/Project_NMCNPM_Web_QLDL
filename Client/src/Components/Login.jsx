import React, { useEffect, useState } from 'react';
import '../Styles/LoginandRegister.css';
import { Link, useParams, useLocation } from 'react-router-dom';
const LoginPage = () => {
    const [formData, setFormData] = useState({ Username_Email: '', password: '' });
    const [message, setMessage] = useState(""); // Thông báo lỗi hoặc thành công
    const [messageColor, setMessageColor] = useState("#b20000"); // Màu thông báo
    const location = useLocation();

    // Lấy thông báo từ /login/message nếu có
    useEffect(() => {
        const params = new URLSearchParams(location.search); // Lấy query string từ URL
        const messageParam = params.get('message'); // Lấy giá trị của message
        if (messageParam) {
            setMessage(decodeURIComponent(messageParam)); // Hiển thị thông báo
            setMessageColor("#008000"); // Màu xanh cho thông báo thành công
        }
    }, [location]);


    // Xử lý khi người dùng nhập dữ liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn hành vi gửi form mặc định
        setMessage(""); // Reset thông báo cũ
        setMessageColor("#b20000"); // Reset màu về đỏ mặc định


        try {
            const response = await fetch('/login/api/postLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "Đăng nhập thành công!");
                setMessageColor("#008000"); // Màu xanh cho thành công
                // Điều hướng đến trang chính
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                setMessage(data.message || "Tên đăng nhập hoặc mật khẩu không đúng.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Lỗi hệ thống. Vui lòng thử lại sau.");
        }

    };
    return (
        <section id="loginPage">
            <div class="custom-button-wrapper">
                <div class="link_wrapper">
                    <a href="/home">Home</a>
                </div>
            </div>
            <div class="main-w3layouts wrapper">
                <div class="logo">
                    <img src="/Images/logoITISE.png" alt="Logo" width="150" height="auto" />
                </div>

                <div class="main-agileinfo">
                    <div class="agileits-top">
                        <form onSubmit={handleLogin}>
                            <input class="text" type="text" autocomplete="off" name="Username_Email"
                                placeholder="Tên đăng nhập hoặc email" required="" onChange={handleChange} />
                            <input class="text" type="password" autocomplete="off" name="password" placeholder="Mật khẩu"
                                required="" onChange={handleChange} />
                            <input type="submit" value="Đăng nhập" />
                        </form>
                        {message && (
                            <div
                                style={{
                                    color: messageColor,
                                    textAlign: "center",
                                    marginTop: "5px",
                                    marginBottom: "10px",
                                }}
                            >
                                {message}
                            </div>
                        )}                        <p>
                            <a href="#">Quên mật khẩu</a>
                            <span class="divider">|</span>
                            <a href="./role">Đăng ký</a>
                        </p>
                    </div>
                </div>

                <div class="colorlibcopy-agile">
                    <p>© 2018 Colorlib Signup Form. All rights reserved | Design by <a href="https://colorlib.com/"
                        target="_blank">Colorlib</a></p>
                </div>

                <ul class="colorlib-bubbles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </section>
    );
};

export default LoginPage;