import React from 'react';
import '../Styles/Header.css';
import setLanguage from '../Scripts/Header.js';

import { Routes, Route, Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="header-container">
            <nav id="main_nav">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to = "/home">
                        <img src={'/Images/logo.png'} alt="logo" style={{ width: '30px', height: '30px', left: '10px', top: '10px', justifySelf: 'flex-start' }} />
                    </Link>
                    <div style={{ display: 'flex' }}>
                        <p id="nav_button">
                            <a href="#!" data-i18n="place">Địa điểm du lịch</a>
                        </p>
                        <div id="nav">
                            <div id="nav_button" style={{ borderRight: '#000 solid 1px', borderLeft: '#000 solid 1px' }}>
                                <Link to ="/HomePlace" data-i18n="tour">Tour</Link>
                            </div>
                            <div id="nav_button">
                                <a href="#!" data-i18n="hotel">Khách sạn</a>
                            </div>
                            <div id="nav_button" style={{ borderLeft: '#000 solid 1px' }}>
                                <a href="#!" data-i18n="contact">Liên lạc</a>
                            </div>
                            <div id="nav_button" style={{ borderLeft: '#000 solid 1px' }}>
                                <a href="#!" data-i18n="about_us">About us</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="login_register">
                    <select id="language" name="language" onChange={setLanguage} style={{ width: '70px' }} defaultValue="default">
                        <option value="default">Lang</option>
                        <option value="vi">Vi</option>
                        <option value="en">En</option>
                    </select>
                    <p id="nav_button">
                        <a href="#!" id="register">Register</a>
                    </p>
                    <p id="nav_button" style={{ backgroundColor: '#313030', color: '#fff', borderRadius: '30px' }}>
                        <a href="#!" id="login">Login</a>
                    </p>
                </div>
            </nav>
        </header>
    );
};

export default Header;
