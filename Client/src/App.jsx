// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content';
import TourReservationResult from './Components/TourReservationResult';
import Profile from './Components/Profile';
import {Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BookingContainer from './Components/BookingContainer';
import Booking02 from './Components/Booking-02';
import HomePlace from './Components/HomePlace';
import ServicePage from './Components/ServicePage';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import SelectRole from './Components/selectRole';
import SearchService from './Components/SearchService';
import ManageBooking from './Components/ManageBooking';
import BookingHistory from './Components/BookingHis';
import FacilityForm from './Components/FacilityForm';
import ProtectedUserRoute from './Components/ProtectedRouteUser';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/authenticate', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>
      <Header />
      Loading...
      <Footer />
      </div>;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ProtectedRoute user={user}><Content /></ProtectedRoute>} />
          <Route path="/HomePlace" element={<ProtectedUserRoute user={user}><HomePlace /></ProtectedUserRoute>} />
          <Route path="/servicepage/:idService" element={<ProtectedRoute user={user}><ServicePage /></ProtectedRoute>} />
          <Route path="/tourReservationResult" element={<ProtectedUserRoute user={user}><TourReservationResult /></ProtectedUserRoute>} />
          <Route path="/profile" element={<ProtectedUserRoute user={user}><Profile /></ProtectedUserRoute>} />
          <Route path="/*" element={<ProtectedUserRoute user={user}><BookingContainer /></ProtectedUserRoute>} />
          <Route path="/searchService" element={<ProtectedRoute user={user}><SearchService /></ProtectedRoute>} />
          <Route path="/manageBooking" element={<ProtectedUserRoute user={user}><ManageBooking /></ProtectedUserRoute>} />
          <Route path="/facilityForm" element={<ProtectedUserRoute user={user}><FacilityForm /></ProtectedUserRoute>} />
          <Route path="/bookingHistory" element={<ProtectedUserRoute user={user}><BookingHistory /></ProtectedUserRoute>} />
          <Route path="/booking-02" element={<ProtectedUserRoute user={user}><Booking02 /></ProtectedUserRoute>} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/role" element={<SelectRole />} />
          
         

          
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
