import React, {useEffect,useState} from 'react';
import '../Styles/LoginandRegister.css';
import { Link, useParams} from 'react-router-dom';
const LoginPage = () => {
    const [formData, setFormData] = useState({ Username_Email: '', password: '' });
    const [error, setError] = useState(null);

    // Xử lý khi người dùng nhập dữ liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn hành vi gửi form mặc định
        setError(null); // Xóa lỗi cũ

        try {
            const response = await fetch('/login/api/postLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
            }

            const data = await response.json();
            console.log('Đăng nhập thành công:', data);
            window.location.href = '/';
        } catch (err) {
            console.error(err);
            setError(err.message || 'Có lỗi xảy ra.');
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
                                placeholder="Tên đăng nhập hoặc email" required="" onChange={handleChange}/>
                            <input class="text" type="password" autocomplete="off" name="password" placeholder="Mật khẩu"
                                required="" onChange={handleChange}/>
                            <input type="submit" value="Đăng nhập"/>
                        </form>
                        {error && <p className="error">{error}</p>}
                        <p>
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