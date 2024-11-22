import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import DetailProfile from "./DetailProfile";
import BookingHis from "./BookingHis";

import "../Styles/Profile.css";

const Profile = () => {
    const [contentType, setContentType] = useState('profile');

    const renderContent = () => {
        if (contentType === 'profile') {
            return <DetailProfile />;
        }
        else {
            return <BookingHis />;
        }
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
                        <div className="over-profile">
                            <div className="profile-image-container">
                                <img src="/Images/img_profile/PTD.jpg" alt="Profile Picture" className="profile-image" />
                                <img src="/Images/img_profile/pencil.png" alt="Edit Icon" className="edit-icon" />
                            </div>
                            <p>Phạm Thanh Duy</p>
                            <div className="location-birthday">
                                <img src="/Images/img_profile/Vector.jpg" />
                                <p>Hồ Chí Minh</p>
                                <p> | </p>
                                <img src="/Images/img_profile/fe_birthday-cake.jpg" />
                                <p>Ngày 1 tháng 1</p>

                            </div>
                        </div>
                        <div className="list-select">
                            <div className="list-select-content" tabIndex="0" onClick={() => setContentType('profile')}>Chỉnh sửa thông
                                tin
                            </div>
                            <div className="list-select-content" tabIndex="0" onClick={() => setContentType('booking')}>Lịch sử đặt hàng
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