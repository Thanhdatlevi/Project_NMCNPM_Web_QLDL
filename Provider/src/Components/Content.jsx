import '../Styles/Home_Content.css';
import HomeDashboard from './HomeDashboard';
import Profile from './Profile'
import {useNavigate } from 'react-router-dom';
import ReseveManagement from './ReseveManagement';
import FacilitiesManagement from './FacilitiesManagement';

import React, { useEffect, useState } from 'react';


const Content = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);
  const [contentType, setContentType] = useState('home');
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Sử dụng để chuyển hướng trang
  const toggleSidebar = () => {
    setIsSidebarVisible(prevState => !prevState); // Đổi trạng thái sidebar
};
  const renderContent = () => {
        if (contentType === 'home') {
            return <HomeDashboard />;
        }
        else if(contentType === 'profile'){
          return <Profile />;
        }else if(contentType === 'facilitiesManagement'){
            return <FacilitiesManagement />;
        }else if(contentType === 'reseveManagement'){
            return <ReseveManagement />;
        }
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
    useEffect(() => {
            const handleResize = () => {
              const isSmall = window.innerWidth <= 640;
              setIsSmallScreen(isSmall);
        
              if (!isSmall) {
                setIsSidebarVisible(true); // Khi màn hình lớn, luôn mở sidebar
              }
            };
        
            window.addEventListener("resize", handleResize);
        
            // Cleanup
            return () => {
              window.removeEventListener("resize", handleResize);
            };
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
      {isSmallScreen && (
        <button
          className="toggle-sidebar-button"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
      )}
        <div className={`side-bar ${!isSidebarVisible ? 'hidden' : ''}`}>
          <div className="logo">
                  <img src="../Images/logoITISE.png" alt="logo" />
          </div>
          <div className="list-select">
              <div className="dashboard-header list-select-content" onClick={() => setContentType('profile')}>
                <div className ="notification">
                  <i class='bx bx-bell'></i>
                </div>
                <div className ="admin-info">
                    <h4>Provider</h4>
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <p>{user ? user.accountName : 'Guest'}</p>
                    )}
                </div>
              </div>
              <div className="list-select-content" tabIndex="0" onClick={() => setContentType('home')}>
                <i class='bx bx-home-alt' ></i>
                <p>Home</p>
              </div>
              <div className="list-select-content" tabIndex="0" onClick={() => setContentType('reseveManagement')}>
                <i class='bx bx-user' ></i>
                <p>Resevation Management</p>
              </div>
              <div className="list-select-content" tabIndex="0" onClick={() => setContentType('facilitiesManagement')}>
                <i class='bx bx-hotel' ></i>
                <p>Facilities Management</p>
              </div>
              <div className ="blank">
              </div> 
              <div className="list-select-content" tabIndex="0" onClick={handleLogout}>
                <i class='bx bx-exit' ></i>
                <p>Logout</p>
                </div>
          </div>
        </div>
        
        <div className="contentDashboard">
            {renderContent()}
        </div>
    </section>
  );
};

export default Content;