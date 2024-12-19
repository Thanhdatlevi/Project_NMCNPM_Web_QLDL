import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/UserCard.css';

const UserCard = ({ user, setSelectedUsers }) => {

    const handleEditUser = () => {
        setSelectedUsers(user);
        const editUserDialog = document.querySelector('.edit-user-dialog');
        editUserDialog.classList.toggle('hidden');
    }

    const handleDeleteUser = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        
        if (confirmDelete) {
            const data = {
                accountId: user.accountId
            };
    
            try {
                fetch('http://localhost:3000/admin/deleteuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // Optionally, you can remove the user from the UI after successful deletion
                    // setUsers(prevUsers => prevUsers.filter(u => u.accountId !== user.accountId));
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="user-card">
            <div className="user-card-content">
                <input type="checkbox" />
                <p>{user.userFullName}</p>
                <p>{user.accountEmail}</p>
                <p>{user.userContact}</p>
                <p>{user.userBirthday.split('T')[0]}</p>
                <p>{user.userAddress}</p>   
                <p>{"Role"}</p>
                <div className="user-card-action">
                    <span><img src='/Images/Edit.png' onClick={handleEditUser}/></span>
                    <span><img src='/Images/delete.png' onClick={handleDeleteUser}/></span>
                </div>
            </div>
        </div>
    );
}

export default UserCard;