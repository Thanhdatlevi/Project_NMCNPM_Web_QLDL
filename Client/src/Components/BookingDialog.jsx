import React, { useState, useEffect } from "react";
import "../Styles/BookingDialog.css"; // Adjust this path according to your CSS file location
import { Link, useNavigate } from 'react-router-dom';
import { use } from "react";

const BookingDialog = ({isBookingVisible, handleBookingFinished }) => {
    const [fac, setFac] = useState({});
    const [date, setDate] = useState('');
    const type = localStorage.getItem('type');
    useEffect(() => {
        if (type === 'hol') {
            fetch('/hotel/getfilterhotel')
                .then((response) => response.json())
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].facility_id === localStorage.getItem('selected')) {
                            setFac(data[i]);
                        }
                    }
                })
                .catch((error) => console.error('Error:', error));
        }
        else if (type === 'res') {
            fetch('/restaurant/getFilterrestaurant')
                .then((response) => response.json())
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].facility_id === localStorage.getItem('selected')) {
                            setFac(data[i]);
                        }
                    }
                })
                .catch((error) => console.error('Error:', error));
        }

    }, [isBookingVisible]);
    const [duration, setDuration] = useState(parseInt(localStorage.getItem('quantity'))); // Initial duration in days

    const decreaseDuration = () => {
        if (duration > 1) setDuration(duration - 1);
    };

    const increaseDuration = () => {
        setDuration(duration + 1);
    };
    const handleBooking = () => {
        localStorage.setItem('price',fac.average_price);
        const booking = document.getElementById('dialog');
        booking.classList.toggle('hidden');
        if (handleBookingFinished) {
            handleBookingFinished(duration);
        }
    };
    function handleDateChange(event) {
        const today = new Date().toISOString().split('T')[0];
        if (event.target.value < today) {
            const notice = document.getElementById('notice-place');
            notice.innerHTML = "You can't choose the past date.";
            event.target.value = today;
        } else {
            const notice = document.getElementById('notice-place');
            notice.innerHTML = "";
            console.log(event.target.value);
            localStorage.setItem('date', event.target.value);   
        }
    }

    return (
        <div className="bookingDialog">
            <div id="dialog" className="dialog hidden">
                <div className="dialog-content-booking">
                    <div className="booking-container">
                        <div className="booking01-info">
                            <div className="booking01-details">
                                <div className="blank0"></div>
                                <div className="info-section">
                                    <div className="image-section">
                                        <img src={fac.img_url} alt="Blue Origin Farms" />
                                    </div>
                                    <div className="location-section">
                                        <h3>{fac.facility_name}</h3>
                                        <p>{fac.location_name}</p>
                                    </div>
                                </div>

                                <div className="divider"></div>
                                <div className="blank"></div>
                                <div className="form-section">
                                    <label htmlFor="duration">{type === 'hol' ? 'How long you will stay?' : 'How many tables you want to book?'}</label>
                                    <div className="duration-control">
                                        <button id="decrease" onClick={decreaseDuration}>
                                            -
                                        </button>
                                        <span id="duration">{duration} {type === 'hol' ? 'Days' : 'Tables'}</span>
                                        <button id="increase" onClick={increaseDuration}>
                                            +
                                        </button>
                                    </div>

                                    <label htmlFor="date">Pick a Date</label>
                                    <div className="date-picker">
                                        <input id="time-place" type="date" onChange={handleDateChange} />
                                    </div>
                                    <div className="price-info">
                                        <p>
                                            You will pay <strong> {duration * 200}$ USD</strong>
                                        </p>
                                        <p>per <strong>{duration} {type === 'hol' ? 'Days' : 'Tables'}</strong></p>
                                    </div>
                                </div>
                                <div className="blank0"></div>
                            </div>

                        </div>

                        <div className="action-section">
                            <Link to="/HomePlace">
                                <button onClick={handleBooking} className="book-now">Book Now</button>
                            </Link>
                            <button className="cancel" onClick={() => {
                                document.getElementById('dialog').classList.toggle('hidden');
                            }}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDialog;
