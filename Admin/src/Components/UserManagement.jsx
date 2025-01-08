import '../Styles/UserManagement.css';
import React, { useState, useEffect } from 'react';
import UserCard from './userCard';
import { Link } from 'react-router-dom';

// API URI
// http://localhost:3000/admin/getallusers

// Fields to be displayed
// u.user_name, u.user_email, u.user_contact, u.user_birthday, u.user_address, u.full_name

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/admin/getAllUsers')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data);
            });
    }, []);

    return (
        <section className="UserManagement">
            {users.length === 0  ? (
                <div>Loading...</div>
            ) : (
            <div>
                <h3>
                    User Management
                </h3>
                <div className="list-user">
                    <div className="user-card-header">
                        <p>Full Name</p>
                        <p>Email</p>
                        <p >Contact</p>
                        <p className="optional-info">Birthday</p>
                        <p className="optional-info">Address</p>
                        <p>Feature</p>
                    </div>
                    <div className="user-card-item">
                        {users.map((user) => (
                            <UserCard
                                key={user.accountId}
                                user={user}
                                value={user.accountId}
                            />
                        ))}
                    </div>
                </div>
            </div>
            )}
        </section>
    );
};

export default UserManagement;