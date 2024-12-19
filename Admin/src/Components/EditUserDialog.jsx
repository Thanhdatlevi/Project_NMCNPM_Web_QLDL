import React from "react";
import { useState, useEffect } from "react";
import '../Styles/EditUserDialog.css';


const EditUserDialog = ({ user }) => {
    //const [userRole, setUserRole] = useState(user.userRole);
    const [userFullName, setUserFullName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userContact, setUserContact] = useState();
    const [userBirthday, setUserBirthday] = useState();
    const [userAddress, setUserAddress] = useState();

    const handleEditUser = () => {
        const data = {
            accountId: user.accountId,
            //userRole: userRole,
            userFullName: userFullName,
            userContact: userContact,
            userBirthday: userBirthday,
            userAddress: userAddress,
            userEmail: userEmail
        }
        fetch('http://localhost:3000/admin/edituser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    }

    useEffect(() => {
        if(!user) return;
        setUserFullName(user.userFullName ? user.userFullName : "");
        setUserEmail(user.accountEmail ? user.accountEmail : "");
        setUserContact(user.userContact ? user.userContact : "");
        setUserBirthday(user.userBirthday ? user.userBirthday.split('T')[0] : "");
        setUserAddress(user.userAddress ? user.userAddress : "");
    }, [user]);

    const handleCancel = () => {
        const editUserDialog = document.querySelector('.edit-user-dialog');
        editUserDialog.classList.toggle('hidden');
    }

    return (
        <div className="edit-user-dialog hidden">
            <div className="edit-user-dialog-content">
                <div className="edit-user-dialog-item">
                    <label>Full Name</label>
                    <input type="text" value={userFullName ? userFullName : ""} onChange={(e) => setUserFullName(e.target.value)}/>
                </div>
                <div className="edit-user-dialog-item">
                    <label>Email</label>
                    <input type="text" value={userEmail ? userEmail : ""} onChange={(e) => setUserEmail(e.target.value)}/>
                </div>
                <div className="edit-user-dialog-item">
                    <label>Contact</label>
                    <input type="text" value={userContact ? userContact : ""} onChange={(e) => setUserContact(e.target.value)}/>
                </div>
                <div className="edit-user-dialog-item">
                    <label>Birthday</label>
                    <input type="date" value={userBirthday ? userBirthday.split('T')[0] : ""} onChange={(e) => setUserBirthday(e.target.value)}/>
                </div>
                <div className="edit-user-dialog-item">
                    <label>Address</label>
                    <input type="text" value={userAddress ? userAddress : ""} onChange={(e) => setUserAddress(e.target.value)}/>
                </div>
                <div className="edit-user-dialog-action">
                    <span onClick={handleEditUser} className="dialog-save">Save</span>
                    <span onClick={handleCancel} className="dialog-close">Cancel</span>
                </div>
            </div>
        </div>
    );
}

export default EditUserDialog;