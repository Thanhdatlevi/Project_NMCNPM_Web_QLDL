import React from "react";
import "../Styles/BookingCard.css"; // Adjust this path according to your CSS file location

function BookingCard({ booking, imgPath }) {

    console.log(booking);
    console.log(imgPath);

    return (
        <div className="booking-card">
            <img
                src={imgPath[booking.id - 1]} // Replace with actual image URL
                alt={booking.title}
            />
            <div className="booking-info">
                <h3>{booking.title}</h3>
                <p>{booking.location}</p>
                <p>Check-in: {booking.checkIn}</p>
                <p>Check-out: {booking.checkOut}</p>
                <p>{booking.details}</p>
            </div>
            <div className="button-container">
                <button className="booking-button">Booking Confirmed</button>
                <button className="booking-button">Booking Canceled</button>
            </div>

        </div>
    );
}

export default BookingCard;