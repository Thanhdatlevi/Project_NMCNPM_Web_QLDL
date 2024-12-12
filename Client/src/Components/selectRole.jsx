import React, {useEffect,useState} from 'react';
import '../Styles/LoginandRegister.css';
import { Link, useParams} from 'react-router-dom';
const SelectRole = () => {
    // useEffect(()=>{
    //     handleFetch();
    // },[]);
    const handleRoleSelect = (role) => {
        localStorage.setItem("selectedRole", role);
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
                    <img src="/Images/logoITISE.png" alt="Logo" width="150" height="auto"/>
                </div>

                <div class="role-selection">
                    <Link to="/register">
                    <div class="role-card" onClick={() => handleRoleSelect("tourists")}>
                        <h3>Khách du lịch</h3>
                        <p>Người dùng đăng ký với vai trò khách du lịch có thể khám phá các tour du lịch, nhà hàng, khách sạn và
                            những địa điểm thu
                            hút. Họ cũng có thể dễ dàng thực hiện việc đặt phòng, bàn và tự tạo lịch trình riêng. </p>
                    </div>
                    </Link>

                    <Link to="/register">
                    <div class="role-card" onClick={() => handleRoleSelect("providers")}>
                        <h3>Nhà cung cấp</h3>
                        <p>Nhà cung cấp có thể đề nghị đưa nhà hàng, khách sạn của mình lên trang web để giới thiệu đến khách du
                            lịch. Họ cũng có
                            thể quản lý thông tin, kiểm tra tình trạng đặt phòng, và cập nhật các dịch vụ của mình trực tuyến.
                        </p>
                    </div>
                    </Link>
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

export default SelectRole;