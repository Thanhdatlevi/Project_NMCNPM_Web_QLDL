import React from 'react';
import '../Styles/Footer.css';

import { Routes, Route, Link } from 'react-router-dom';

function Footer () {
    return (
        <footer className="footer">
                <div className="blank">
                    <div className="footer-home">
                        <Link to ="/home">
                        <i className='bx bx-home'></i>
                        </Link>
                    </div>
                </div>
                <div className="col-1">
                    <h3>ITISE</h3>
                    <p data-i18n="description">Sản phẩm đầu tiên của ITISE.</p>
                    <div className="footer-search">
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="col-2">
                    <h3 data-i18n="contact">Contact</h3>
                    <div className="footer-address">
                        <i className='bx bxs-map'></i>
                        <span data-i18n="address">127 Nguyen Van Cu, District 5, HCMC</span>
                    </div>
                    <div className="footer-phone">
                        <i className='bx bxs-phone'></i>
                        <span data-i18n="phone">0123456789</span>
                    </div>
                    <div className="footer-email">
                        <i className='bx bxs-envelope'></i>
                        <span data-i18n="email">itise@gmail.com</span>
                    </div>
                    <div className="social-icons">
                        <a href="#"><i className='bx bxl-facebook'></i></a>
                        <a href="#"><i className='bx bxl-instagram'></i></a>
                        <a href="#"><i className='bx bxl-linkedin'></i></a>
                        <a href="#"><i className='bx bxl-gmail'></i></a>
                    </div>
                </div>
                <div className="col-3">
                    <div className="gallery">
                        <img src={'/Images/Footer_img/scene1.jpg'} alt="" />
                        <img src={'/Images/Footer_img/scene2.jpg'} alt="" />
                        <img src={'/Images/Footer_img/scene3.jpg'} alt="" />
                        <img src={'/Images/Footer_img/scene4.jpg'} alt="" />
                        <img src={'/Images/Footer_img/scene5.jpg'} alt="" />
                        <img src={'/Images/Footer_img/scene6.jpg'} alt="" />
                    </div>
                </div>
        </footer>
    );
};

export default Footer;
