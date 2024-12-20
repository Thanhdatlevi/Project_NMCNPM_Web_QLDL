import React from "react";
import { useState, useEffect, useCallback } from "react";

import "../Styles/Profile.css";


const DetailProfile = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const userId = "p001"; // Thay thế bằng userId thực tế
        fetch(`/user/p001`) 
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
        const options = { year: 'numeric',month: 'long',day: 'numeric'};
        return new Date(dateString).toLocaleDateString('vi-VN',options);
    };
    return (
        <body id="Profile">
            <main id="checkProfile">
                <section id="personInfo">
                    <h4>Personal Information</h4>
                    <div class="content">
                        <div class="field-label">
                            <label for="name">Name: </label>
                            <input type="text" id="name" class="value" value={user.fullName} />
                        </div>
                        <div class="field-label">
                            <label for="dob">Ngày sinh:</label>
                            <input type="text" id="dob" class="value" value={formatDate(user.user_birthday)} />
                        </div>
                        <div class="field-label">
                            <label for="phone">Số điện thoại:</label>
                            <input type="text" id="phone" class="value" value={user.user_contact}/>
                        </div>
                        <div class="field-label">
                            <label for="address">Địa chỉ:</label>
                            <input type="text" id="address" class="value" value={user.user_address} />
                        </div>
                    </div>
                    <div class="save-container">
                        <button id="savePersonButton" class="save-button">Save</button>
                    </div>
                </section>
                <section id="security">
                    <h4>Security</h4>
                    <div class="content">
                        <div class="field-label">
                            <label for="email">Email:</label>
                            <input type="text" id="email" class="value" value={user.user_email} />
                        </div>
                        <div class="field-label">
                            <label for="password">Password:</label>
                            <input type="password" id="password" class="value" value="password123" />
                        </div>
                        <div class="field-label">
                            <label for="confirmPassword">Confirm Password:</label>
                            <input type="password" id="confirmPassword" class="value" value="password123" />
                        </div>
                    </div>
                    <div class="save-container">
                        <button id="saveSecurityButton" class="save-button">Save</button>
                    </div>
                </section>
            </main>
        </body>
    );
};

export default DetailProfile;