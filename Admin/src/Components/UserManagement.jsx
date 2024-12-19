import '../Styles/UserManagement.css';
import React from 'react';
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
                <div className="list-user-content">
                    <Link to="/userManagement/addUser">Add User</Link>
                </div>
                <div className="list-user-content">
                    <Link to="/userManagement/editUser">Edit User</Link>
                </div>
                <div className="list-user-content">
                    <Link to="/userManagement/deleteUser">Delete User</Link>
                </div>
            </div>
        </section>
    );
}
export default UserManagement;