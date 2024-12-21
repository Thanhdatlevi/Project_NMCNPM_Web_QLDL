import React from "react";
import { useState, useEffect, useCallback } from "react";

import "../Styles/Profile.css";

const Profile = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch(`tourist/getPublicProfile`) 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data.userProfile);
                console.log(data)
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
                        <div className="over-profile">
                            <div className="profile-image-container">
                                <img src="/Images/img_profile/PTD.jpg" alt="Profile Picture" className="profile-image" />
                                <img src="/Images/img_profile/pencil.png" alt="Edit Icon" className="edit-icon" />
                            </div>
                            <p>{user.userFullname}</p>
                            <div className="location-birthday">
                                <p>Email: {user.accountEmail}</p>

                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="divider"></div>
                    <div id="contentProfile">
                        <main id="checkProfile">
                            <section id="personInfo">
                                <h4>Personal Information</h4>
                                <div class="content">
                                    <div class="field-label">
                                        <label for="name">Name: </label>
                                        <input type="text" id="name" class="value" value={user.userFullname} />
                                    </div>
                                    <div class="field-label">
                                        <label for="address">Email:</label>
                                        <input type="text" id="address" class="value" value={user.accountEmail} />
                                    </div>
                                    <div class="field-label">
                                        <label for="dob">Ngày sinh:</label>
                                        <input type="text" id="dob" class="value" value={formatDate(user.userBirthday)} />
                                    </div>
                                    <div class="field-label">
                                        <label for="phone">Số điện thoại:</label>
                                        <input type="text" id="phone" class="value" value={user.userContact}/>
                                    </div>
                                    <div class="field-label">
                                        <label for="address">Địa chỉ:</label>
                                        <input type="text" id="address" class="value" value={user.userAddress} />
                                    </div>
                                </div>
                                <div class="save-container">
                                    <button id="savePersonButton" class="save-button">Save</button>
                                </div>
                            </section>
                        </main>
                    </div>
                </section>
            </main>
        </body>
    );
};

export default Profile;