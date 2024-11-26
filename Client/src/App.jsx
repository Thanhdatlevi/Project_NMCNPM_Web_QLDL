// src/App.js
import React from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content';
import TourReservationResult from './Components/TourReservationResult';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route, Router, Navigate } from 'react-router-dom';
//import Form from './Components/Form';
import HomePlace from './Components/HomePlace';
import ServicePage from './Components/ServicePage';
import SearchService from './Components/SearchService';
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
          <Route path="/searchService" element={<SearchService />} />
      </Routes>
      <Footer />
    </div>
    
  );
}

export default App;
