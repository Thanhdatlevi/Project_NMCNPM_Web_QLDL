import React, { useEffect } from 'react';
import '../Styles/Footer.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
function Footer() {
    useEffect(() => {
        // Khởi tạo bản đồ
        const map = L.map('map').setView([10.7627841, 106.6824625], 20.5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
        L.marker([10.7627841, 106.6824625]).addTo(map)
            .bindPopup('We here!')
            .openPopup();

        // Cleanup function: Xóa bản đồ nếu component bị unmount
        return () => {
            map.remove();
        };
    }, []);

    return (
        <footer>
            <div class="footer">
                <div class="blank">
                    <div class="footer-home">
                        <Link to="/">
                            <i class='bx bx-home'></i>
                        </Link>
                    </div>
                </div>

                <div class="col-1">
                    <h3>ITISE</h3>
                    <p data-i18n="description">Sản phẩm đầu tiên của ITISE.</p>
                    <div class="map-container">
                        <div id="map"></div>
                    </div>
                </div>
                <div class=" col-2">
                    <h3 data-i18n="contact">Contact</h3>
                    <div class="footer-address">
                        <i class='bx bxs-map'></i>
                        <span data-i18n="address">127 Nguyen Van Cu, District 5, HCMC</span>
                    </div>
                    <div class="footer-phone">
                        <i class='bx bxs-phone'></i>
                        <span data-i18n="phone">0123456789</span>
                    </div>
                    <div class="footer-email">
                        <i class='bx bxs-envelope'></i>
                        <span data-i18n="email">itise@gmail.com</span>
                    </div>
                    <div class="social-icons">
                        <a href="#!" class="facebook-icon"><i class='bx bxl-facebook'></i></a>
                        <a href="#!" class="ins-icon"><i class='bx bxl-instagram'></i></a>
                        <a href="#!" class="linkedin-icon"><i class='bx bxl-linkedin'></i></a>
                        <a href="#!" class="gmail-icon"><i class='bx bxl-gmail'></i></a>
                    </div>
                </div>
                <div class="col-3">
                    <div class="gallery">
                        <img src="/Images/Footer_img/scene1.jpg" alt="" />
                        <img src="/Images/Footer_img/scene2.jpg" alt="" />
                        <img src="/Images/Footer_img/scene3.jpg" alt="" />
                        <img src="/Images/Footer_img/scene4.jpg" alt="" />
                        <img src="/Images/Footer_img/scene5.jpg" alt="" />
                        <img src="/Images/Footer_img/scene6.jpg" alt="" />
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
