import '../Styles/UserManagement.css';
import React from 'react';
import UserCard from './UserCard';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// api uri
// http://localhost:8000/api/user


// field to be displayed
// u.user_name, u.user_email, u.user_contact, u.user_birthday, u.user_address, u.full_name

const UserManagement = () => {
    return (
        <section className="UserManagement">
            <h3>
                User Management
            </h3>
            <div className="list-user">
                <div className="user-card-header">
                    <p>Full Name</p>
                    <p>Email</p>
                    <p>Contact</p>
                    <p>Birthday</p>
                    <p>Address</p>
                </div>
            </div>
        </section>
    );
}
export default UserManagement;