import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import DetailProfile from "./DetailProfile";
import BookingHis from "./BookingHis";
import MyFacility from "./MyFacility";

import "../Styles/Profile.css";

const Profile = () => {
    const [contentType, setContentType] = useState('profile');

    const renderContent = () => {
        if (contentType === 'profile') {
            return <DetailProfile />;
        }
        else if(contentType === 'booking'){
            return <BookingHis />;
        }else return <MyFacility />;
    };
    const [user, setUser] = useState([]);
    useEffect(() => {
        const userId = "u001"; // Thay thế bằng userId thực tế
        fetch(`/user/u001`) 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                console.log('Fetch successful:', data); // Thêm console log để kiểm tra kết quả fetch
                 // Thêm thông báo để kiểm tra kết quả fetch
            })
            .catch((error) => {
                console.error('Error:', error);
                 // Thêm thông báo để kiểm tra lỗi fetch
            });
    }, []); 
    const formatDate = (dateString) => {
        const options = { month: 'long',day: 'numeric'};
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };
    return (
        <body id="Profile">
            <main id="MyProfile">
                <section id="titleProfile">
                    <h3>
                        My profile
                    </h3>
                    <p>
                        <span href="#">Home</span> /
                        <span href="profile.html">My profile</span>
                    </p>
                </section>
                <section id="viewProfile">

                    <div id="selectProfile">
                        {user.map((item) => (
                        <div className="over-profile">
                            <div className="profile-image-container">
                                <img src="/Images/img_profile/PTD.jpg" alt="Profile Picture" className="profile-image" />
                                <img src="/Images/img_profile/pencil.png" alt="Edit Icon" className="edit-icon" />
                            </div>
                            <p>{item.full_name}</p>
                            <div className="location-birthday">
                                <img src="/Images/img_profile/Vector.jpg" />
                                <p>{item.user_address}</p>
                                <p> | </p>
                                <img src="/Images/img_profile/fe_birthday-cake.jpg" />
                                <p>{formatDate(item.user_birthday)}</p>

                            </div>
                        </div>
                        ))}
                        <div className="list-select">
                            <div className="list-select-content" tabIndex="0" onClick={() => setContentType('profile')}>Chỉnh sửa thông
                                tin
                            </div>
                            <div className="list-select-content" tabIndex="0" onClick={() => setContentType('booking')}>Lịch sử đặt hàng
                            </div>
                            <div className="list-select-content" tabIndex="0" onClick={() => setContentType('service')}>Lịch sử đăng dịch vụ
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div id="contentProfile">
                        {renderContent()}
                    </div>
                </section>
            </main>
        </body>
    );
};

export default Profile;