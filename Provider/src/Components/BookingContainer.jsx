import React, { useState } from 'react';
import Booking01 from './Booking-01';
import Booking02 from './Booking-02';
import { Routes, Route } from 'react-router-dom';

const BookingContainer = () => {
    const [bookingData, setBookingData] = useState([]);

    return (
        <div>
            <Routes>
                <Route path="/booking01" element={<Booking01 setBookingData={setBookingData} />} />
                <Route path="/booking02" element={<Booking02 bookingData={bookingData} />} />
            </Routes>
        </div>
    );
};

export default BookingContainer;