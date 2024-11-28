import React from "react";
import { useState, useEffect, useCallback } from "react";
import "../Styles/ManageBooking.css"; // Adjust this path according to your CSS file location
import BookingCard from "./BookingCard.jsx";

const bookings = [
    {
        id: 1,
        title: "Effotel By Sayaji Jaipur",
        location: "Kanoli, Jaipur",
        checkIn: "Fri 18 Aug 2023",
        checkOut: "Sun 20 Aug 2023",
        details: "2 Nights | 9 Adults, 4 Children | 3 Rooms",
    },
    {
        id: 2,
        title: "The Oberoi Udaivilas",
        location: "Udaipur, Rajasthan",
        checkIn: "Mon 21 Aug 2023",
        checkOut: "Wed 23 Aug 2023",
        details: "2 Nights | 2 Adults | 1 Room",
    },
    {
        id: 3,
        title: "Taj Lake Palace",
        location: "Udaipur, Rajasthan",
        checkIn: "Thu 24 Aug 2023",
        checkOut: "Sat 26 Aug 2023",
        details: "2 Nights | 4 Adults, 2 Children | 2 Rooms",
    },
    {
        id: 4,
        title: "The Leela Palace",
        location: "New Delhi, Delhi",
        checkIn: "Sun 27 Aug 2023",
        checkOut: "Tue 29 Aug 2023",
        details: "2 Nights | 3 Adults | 1 Room",
    },
    {
        id: 5,
        title: "ITC Grand Chola",
        location: "Chennai, Tamil Nadu",
        checkIn: "Wed 30 Aug 2023",
        checkOut: "Fri 1 Sep 2023",
        details: "2 Nights | 5 Adults, 3 Children | 2 Rooms",
    },
    {
        id: 6,
        title: "The Lalit Mumbai",
        location: "Mumbai, Maharashtra",
        checkIn: "Sat 2 Sep 2023",
        checkOut: "Mon 4 Sep 2023",
        details: "2 Nights | 2 Adults, 1 Child | 1 Room",
    },
    {
        id: 7,
        title: "Hyatt Regency",
        location: "Kolkata, West Bengal",
        checkIn: "Tue 5 Sep 2023",
        checkOut: "Thu 7 Sep 2023",
        details: "2 Nights | 6 Adults | 3 Rooms",
    },
    {
        id: 8,
        title: "Radisson Blu",
        location: "Bengaluru, Karnataka",
        checkIn: "Fri 8 Sep 2023",
        checkOut: "Sun 10 Sep 2023",
        details: "2 Nights | 4 Adults, 2 Children | 2 Rooms",
    },
    {
        id: 9,
        title: "JW Marriott",
        location: "Pune, Maharashtra",
        checkIn: "Mon 11 Sep 2023",
        checkOut: "Wed 13 Sep 2023",
        details: "2 Nights | 3 Adults, 1 Child | 1 Room",
    },
    {
        id: 10,
        title: "Le Meridien",
        location: "Kochi, Kerala",
        checkIn: "Thu 14 Sep 2023",
        checkOut: "Sat 16 Sep 2023",
        details: "2 Nights | 2 Adults | 1 Room",
    }
];
const ManageBooking = () => {

    const [imgPath, setImgPath] = useState([]);

    // fetch data use callback
    const fetchImgPath = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3000/res/getfilterres');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            let imgPath_t = [];
            data.map((item) => {
                imgPath_t.push(item.img_url);
            });
            setImgPath(imgPath_t);
        } catch (error) {
            console.error('Error loading image:', error);
        }
    }, []);

    useEffect(() => {
        fetchImgPath();
    }, [fetchImgPath]);

    return (
        <body className="manage-booking">
            <div className="hotel-booking">
                <div className="booking-header">
                    <h2 id="page-name">Hotel Bookings</h2>
                    <div className="sort-dropdown">
                        <select id="filter">
                            <option>Latest Booking</option>
                        </select>
                    </div>
                </div>
                
                <div className="booking-list">
                    {bookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} imgPath={imgPath}/>
                    ))}
                </div>
            </div>
        </body>
    );

}

export default ManageBooking;