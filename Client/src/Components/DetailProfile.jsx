import React from "react";
import { useState, useEffect, useCallback } from "react";

import "../Styles/Profile.css";


const DetailProfile = () => {

    return (
        <body id="Profile">
            <main id="checkProfile">
                <section id="personInfo">
                    <h4>Personal Information</h4>
                    <div class="content">
                        <div class="field-label">
                            <label for="name">Name:</label>
                            <input type="text" id="name" class="value" value="Phạm Thanh Duy" />
                        </div>
                        <div class="field-label">
                            <label for="dob">Ngày sinh:</label>
                            <input type="text" id="dob" class="value" value="01/01/2004" />
                        </div>
                        <div class="field-label">
                            <label for="phone">Số điện thoại:</label>
                            <input type="text" id="phone" class="value" value="123456789" />
                        </div>
                        <div class="field-label">
                            <label for="address">Địa chỉ:</label>
                            <input type="text" id="address" class="value" value="Hồ Chí Minh" />
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
                            <input type="text" id="email" class="value" value="ITISE@gmail.com" />
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