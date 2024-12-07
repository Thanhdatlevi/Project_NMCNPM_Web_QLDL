import React, { useState, useEffect } from "react";
import "../Styles/Booking-01.css"; // Adjust this path according to your CSS file location
import { Link, useNavigate } from 'react-router-dom';

const Booking01 = ({ setBookingData }) => {
    const [fac, setFac] = useState({});
    const type = localStorage.getItem('type');
    useEffect(() => {
        console.log(type);
        if (type === 'hol') {
            fetch('/hotel/getfilterhotel')
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].facility_id === localStorage.getItem('selected')) {
                            setFac(data[i]);
                        }
                    }
                })
                .catch((error) => console.error('Error:', error));
        }
        else if (type === 'res') {
            fetch('/res/getFilterres')
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

    }, []);
    const [duration, setDuration] = useState(2); // Initial duration in days

    const decreaseDuration = () => {
        if (duration > 1) setDuration(duration - 1);
    };

    const increaseDuration = () => {
        setDuration(duration + 1);
    };
    const handleBooking = () => {
        if (fac) {
            const data = {
                duration: duration,
                name: fac.facility_name,
                location: fac.location_name,
                total: 200 * duration,
                price: 200,
                imgPath: fac.img_url,
            };
            localStorage.setItem('bookingData', JSON.stringify(data));
            //setBookingData(data);
        }
    };
    let navigate = useNavigate();
    return (
        <div className="body">
            <div className="booking-container">
                <div className="booking-header">
                    <img src="/Images/logoITISE.png" alt="ITISE Logo" />
                </div>

                <div className="progress-indicator">
                    <span className="completed-step">✓</span>
                    <div className="progress-line"></div>
                    <span className="inactive-step">2</span>
                    <div className="progress-line"></div>
                    <span className="inactive-step">3</span>
                </div>

                <div className="booking01-info">

                    <div className="booking-content">
                        <h2>Booking Information</h2>
                        <p>Please fill up the blank fields below</p>
                    </div>
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

                        <div className="blank"></div>
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
                                <span className="calendar-icon">📅</span>
                                <div className="date-wrapper">
                                    <span className="date">20 Jan - 22 Jan</span>
                                </div>
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
                    <button className="cancel" onClick={() => { navigate(-1); }}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Booking01;
