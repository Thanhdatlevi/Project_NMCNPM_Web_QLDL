// src/App.js
import React from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content';
import TourReservationResult from './Components/TourReservationResult';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route, Router, Navigate } from 'react-router-dom';
import BookingContainer from './Components/BookingContainer';
import HomePlace from './Components/HomePlace';
import ServicePage from './Components/ServicePage';
import Booking01 from './Components/Booking-01';
import Booking02 from './Components/Booking-02';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import SelectRole from './Components/selectRole';
import SearchService from './Components/SearchService';
import ManageBooking from './Components/ManageBooking';
import FacilityForm from './Components/FacilityForm';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Content />} />
          <Route path="/HomePlace" element={<HomePlace />} />
          <Route path="/servicepage/:idService" element={<ServicePage />} />
          <Route path="/tourReservationResult" element={<TourReservationResult />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<BookingContainer />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/role" element={<SelectRole />} />
          <Route path="/searchService" element={<SearchService />} />
          <Route path="/manageBooking" element={<ManageBooking />} />
          <Route path="/facilityForm" element={<FacilityForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
