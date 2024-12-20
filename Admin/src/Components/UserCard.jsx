import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetch from 'node-fetch';
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
                accountId: user.accountId // Giả sử bạn muốn xóa tài khoản với accountId = 'a018'
            };
            
            const deleteUser = async () => {
                try {
                    const response = await fetch('http://localhost:3000/admin/deleteuser', {
                        method: 'DELETE', // Chắc chắn sử dụng phương thức DELETE thay vì POST
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data) // Chuyển data thành chuỗi JSON
                    });
            
                    // Kiểm tra xem server có trả về thành công hay không
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
            
                    const result = await response.json(); // Phản hồi trả về dưới dạng JSON
                    console.log(result); // In ra dữ liệu phản hồi từ server
            
                    // Tùy chọn: Bạn có thể xóa người dùng khỏi UI nếu cần
                    // setUsers(prevUsers => prevUsers.filter(u => u.accountId !== data.accountId));
            
                } catch (error) {
                    console.error('Lỗi khi gọi API:', error);
                }
            };

            deleteUser();
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