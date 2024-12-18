import '../Styles/Home_Content.css';
import { Link } from 'react-router-dom';
import HomeDashboard from './HomeDashboard';
import AttractionsManagement from './AttractionsManagement';
import UserManagement from './UserManagement';
import FacilitiesManagement from './FacilitiesManagement';

import React, { useEffect, useState } from 'react';


const Content = () => {
  const [contentType, setContentType] = useState('home');

  const renderContent = () => {
        if (contentType === 'home') {
            return <HomeDashboard />;
        }
        else if(contentType === 'attractionsManagement'){
            return <AttractionsManagement />;
        }else if(contentType === 'userManagement'){
            return <UserManagement />;
        }else if (contentType === 'facilitiesManagement'){
            return <FacilitiesManagement />;
        };
    };
  const [attractions, setAttractions] = useState([])
  useEffect(()=>{
    fetch('/attraction/getAllAttraction')
        .then((response) => response.json())
        .then((data) => {
          setAttractions(data)
        })
        .catch((error) => console.error('Error:', error));
  },[]);
  return (
    <section className="container-dashboard">
        <div className ="side-bar">
          <div className="logo">
                  <img src="../Images/logoITISE.png" alt="logo" />
          </div>
          <div className="list-select">
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
              <div className="list-select-content" tabIndex="0" >
                <i class='bx bx-cog'></i>
                Setting</div>
              <div className="list-select-content" tabIndex="0" >
                <i class='bx bx-exit' ></i>
                Logout</div>
          </div>
        </div>
        
        <div className="contentDashboard">
            <div className="dashboard-header">
              <div className ="notification">
                <i class='bx bx-bell'></i>
              </div>
              <div className ="admin-avt">
                <img src="../Images/logoITISE.png" alt="logo" />
              </div>
              <div className ="admin-info">
                  <h4>Admin</h4>
                  <p>admin@gmail.com</p>
              </div>

            </div>
            {renderContent()}
        </div>
    </section>
  );
};

export default Content;