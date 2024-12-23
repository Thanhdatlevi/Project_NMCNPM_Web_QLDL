import '../Styles/Home_Content.css';
import HomeDashboard from './HomeDashboard';
import AttractionsManagement from './AttractionsManagement';
import Profile from './Profile'
import {useNavigate } from 'react-router-dom';
import UserManagement from './UserManagement';
import FacilitiesManagement from './FacilitiesManagement';

import React, { useEffect, useState } from 'react';


const Content = () => {
  const [contentType, setContentType] = useState('home');
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Sử dụng để chuyển hướng trang
  const renderContent = () => {
        if (contentType === 'home') {
            return <HomeDashboard />;
        }
        else if(contentType === 'profile'){
          return <Profile />;
        }else if(contentType === 'attractionsManagement'){
            return <AttractionsManagement />;
        }else if(contentType === 'userManagement'){
            return <UserManagement />;
        }else if (contentType === 'facilitiesManagement'){
            return <FacilitiesManagement />;
        };
    };

    useEffect(() => {
      const fetchAuthentication = async () => {
          try {
              const response = await fetch('/authenticate', {
                  method: 'GET',
                  credentials: 'include', // Để gửi cookie cùng yêu cầu
              });

              if (response.ok) {
                  const data = await response.json();
                  setUser(data);
              } else {
                  setUser(null); // Chưa đăng nhập
              }
          } catch (error) {
              console.error('Error fetching authentication:', error);
              setUser(null);
          }finally {
            setIsLoading(false); // Kết thúc trạng thái tải
          }
      };

      fetchAuthentication();
    }, []);
  
    const handleLogout = async () => {
      try {
          const response = await fetch('/logout', {
              method: 'POST',
              credentials: 'include', // Để gửi cookie trong yêu cầu
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.ok) {
              console.log('Logout successful');
              window.location.href = 'http://localhost:3001/login';// Chuyển hướng về trang đăng nhập
          } else {
              console.error('Logout failed');
              alert('Logout failed. Please try again.');
          }
      } catch (error) {
          console.error('Error during logout:', error);
          alert('An error occurred during logout. Please try again.');
      }
  };
  return (
    <section className="container-dashboard">
        <div className ="side-bar">
          <div className="logo">
                  <img src="../Images/logoITISE.png" alt="logo" />
          </div>
          <div className="list-select">
              <div className="dashboard-header list-select-content" onClick={() => setContentType('profile')}>
                <div className ="notification">
                  <i class='bx bx-bell'></i>
                </div>
                <div className ="admin-info">
                    <h4>Admin</h4>
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <p>{user ? user.accountName : 'Guest'}</p>
                    )}
                </div>
              </div>
              <div className="list-select-content" tabIndex="0" onClick={() => setContentType('home')}>
                <i class='bx bx-home-alt' ></i>
                Home
              </div>
              <div className="list-select-content" tabIndex="0" onClick={() => setContentType('userManagement')}>
                <i class='bx bx-user' ></i>
                User Management
              </div>
              <div className="list-select-content" tabIndex="0" onClick={() => setContentType('attractionsManagement')}>
                <i class='bx bx-current-location'></i>
                Attractions Management
              </div>
              <div className="list-select-content" tabIndex="0" onClick={() => setContentType('facilitiesManagement')}>
                <i class='bx bx-hotel' ></i>
                Facilities Management
              </div>
              <div className ="blank">
              </div> 
              <div className="list-select-content" tabIndex="0" onClick={handleLogout}>
                <i class='bx bx-exit' ></i>
                Logout</div>
          </div>
        </div>
        
        <div className="contentDashboard">
            {renderContent()}
        </div>
    </section>
  );
};

export default Content;