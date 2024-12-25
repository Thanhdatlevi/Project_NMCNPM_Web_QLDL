// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Content from './Components/Content';
import FacilityForm from './Components/FacilityForm';
import { BrowserRouter, Routes, Route, Router, Navigate } from 'react-router-dom';
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
    return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ProtectedRoute user={user}>
              <Content />
            </ProtectedRoute>} />
          <Route path="/facilityForm" element={<ProtectedRoute user={user}>
            <FacilityForm />
          </ProtectedRoute>} />
      </Routes>
      
    </div>
  );
}

export default App;
