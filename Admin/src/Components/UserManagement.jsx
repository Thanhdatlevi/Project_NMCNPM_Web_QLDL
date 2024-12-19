import '../Styles/UserManagement.css';
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import EditUserDialog from './EditUserDialog';
import { Link } from 'react-router-dom';

// API URI
// http://localhost:3000/admin/getallusers

// Fields to be displayed
// u.user_name, u.user_email, u.user_contact, u.user_birthday, u.user_address, u.full_name

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState();

    useEffect(() => {
        fetch('http://localhost:3000/admin/getallusers')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

    const toggleAllCheckBox = () => {
        const headerCheckbox = document.getElementById('header-checkbox');
        const checkboxes = document.querySelectorAll('.user-card-item input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = headerCheckbox.checked;
        });
    };

    return (
        <section className="UserManagement">
            <EditUserDialog user={selectedUsers ? selectedUsers : users[0]} />
            <h3>
                User Management
            </h3>
            <div className="list-user">
                <div className="user-card-header">
                    <input type="checkbox" id='header-checkbox' onChange={toggleAllCheckBox} />
                    <p>Full Name</p>
                    <p>Email</p>
                    <p>Contact</p>
                    <p>Birthday</p>
                    <p>Address</p>
                    <p>Role</p>
                </div>
                <div className="user-card-item">
                    {users.map((user) => (
                        <UserCard
                            key={user.accountId}
                            user={user}
                            value={user.accountId}
                            setSelectedUsers={setSelectedUsers}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserManagement;