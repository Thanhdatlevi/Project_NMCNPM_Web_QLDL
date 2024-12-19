import React, { useEffect, useState } from 'react';


const UserCard = ({ user }) => {


    return (
        <div className="user-card">
            <div className="user-card-content">
                <p>Full Name: {user.userFullName}</p>
                <p>Email: {user.accountEmail}</p>
                <p>Contact: {user.userContact}</p>
                <p>Birthday: {user.userBirthday}</p>
                <p>Address: {user.userAddress}</p>
            </div>
        </div>
    );
}

export default UserCard;