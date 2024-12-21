// src/App.js
import React from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content';
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route, Router, Navigate } from 'react-router-dom';
import ServicePage from './Components/ServicePage';
import SearchService from './Components/SearchService';
import FacilityFeedback from './Components/FacilityFeedback';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Content />} />
          <Route path="/servicepage/:idService" element={<ServicePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchService" element={<SearchService />} />
      </Routes>
      
    </div>
  );
}

export default App;
