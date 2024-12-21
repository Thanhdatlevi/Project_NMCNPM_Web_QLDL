import '../Styles/UserManagement.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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