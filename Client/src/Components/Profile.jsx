import React from "react";
import { useState, useEffect, useCallback } from "react";

import "../Styles/Profile.css";

const Profile = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        userFullname: '',
        userBirthday :'',
        userContact :'',
        userAddress:'',
    });

    useEffect(() => {
        fetch(`/tourist/getPublicProfile`) 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setFormData(data.userProfile); // Sao chép dữ liệu ban đầu vào formData
            })
            .catch((error) => {
                console.error('Error:', error);
                 // Thêm thông báo để kiểm tra lỗi fetch
            });
    }, []);

    // Xử lý thay đổi trong các ô nhập liệu
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Gửi dữ liệu cập nhật đến server
    const handleSave = async () => {
        try {
            // Format ngày sinh trước khi gửi
            const formattedBirthday = new Date(formData.userBirthday).toISOString().split("T")[0]; // YYYY-MM-DD
            const updatedData = {
                ...formData,
                userBirthday: formattedBirthday,
            };
            const response = await fetch(`/tourist/updateProfile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                alert('Cập nhật thông tin thành công!');
            } else {
                alert('Cập nhật thông tin thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Có lỗi xảy ra trong quá trình cập nhật.');
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
                                <div className="content">
                                    <div className="field-label">
                                        <label htmlFor="userFullname">Name:</label>
                                        <input type="text" id="userFullname" className="value" value={formData.userFullname || ''} onChange={handleChange}/>
                                    </div>
                                    <div className="field-label">
                                        <label htmlFor="accountEmail">Email:</label>
                                        <input type="text" id="accountEmail" className="value" value={formData.accountEmail || ''} readOnly/>
                                    </div>
                                    <div className="field-label">
                                        <label htmlFor="userBirthday">Ngày sinh:</label>
                                        <input
                                            type="date"
                                            id="userBirthday"
                                            value={
                                                formData.userBirthday
                                                    ? new Date(formData.userBirthday).toISOString().split("T")[0]
                                                    : ""
                                            }
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="field-label">
                                        <label htmlFor="userContact">Số điện thoại:</label>
                                        <input type="text" id="userContact" className="value" value={formData.userContact || ''} onChange={handleChange} />
                                    </div>
                                    <div className="field-label">
                                        <label htmlFor="userAddress">Địa chỉ:</label>
                                        <input type="text" id="userAddress" className="value" value={formData.userAddress || ''} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="save-container">
                                    <button id="savePersonButton" className="save-button" onClick={handleSave}>Save</button>
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