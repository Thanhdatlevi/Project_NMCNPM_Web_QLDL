import React, {useEffect,useState} from 'react';
import '../Styles/LoginandRegister.css';
import { Link, useParams} from 'react-router-dom';
const LoginPage = () => {
    // useEffect(()=>{
    //     handleFetch();
    // },[]);
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
                        <form action="#" method="post">
                            <input class="text" type="text" autocomplete="off" name="Username/Email"
                                placeholder="Tên đăng nhập hoặc email" required=""/>
                            <input class="text" type="password" autocomplete="off" name="password" placeholder="Mật khẩu"
                                required=""/>
                            <input type="submit" value="Đăng nhập"/>
                        </form>
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