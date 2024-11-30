import React, { useState, useEffect,useHistory } from "react";
import "../Styles/Booking-01.css"; // Adjust this path according to your CSS file location
import { Link, useNavigate } from 'react-router-dom';

const Booking01 = ({ setBookingData }) => {
    const [hot,setHol] = useState([]);  
    useEffect(()=>{
        fetch('/hotel/h001')
            .then((response) => response.json())
            .then((data) => {
                setHol(data)
            })
            .catch((error) => console.error('Error:', error));
    },[]);
    const [duration, setDuration] = useState(2); // Initial duration in days

    const decreaseDuration = () => {
        if (duration > 1) setDuration(duration - 1);
    };

    const increaseDuration = () => {
        setDuration(duration + 1);
    };
    const handleBooking = () => {
        if (hot.length > 0) {
            const data = {
                duration: duration,
                name: hot[0].hotel_name,
                location: hot[0].hotel_location,
                total: 200 * duration,
                price: 200,
            };
            setBookingData(data);
        }
    };
    let navigate = useNavigate();
    return (
        <div className = "body">
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
            { Array.isArray(hot) && hot.map((item) => (
            <div className="booking01-info">
            
                <div className="booking-content">
                    <h2>Booking Information</h2>
                    <p>Please fill up the blank fields below</p>
                </div>
                <div className="booking01-details">
                    <div className="blank0"></div>
                    
                    <div className="info-section">
                        <div className="image-section">
                            <img src="/Images/voucher_res1.jpg" alt="Blue Origin Farms" />
                        </div>
                        <div className="location-section">
                            <h3>{item.hotel_name}</h3>
                            <p>{item.hotel_location}</p>
                        </div>
                    </div>
                    
                    <div className="blank"></div>
                    <div className="divider"></div>
                    <div className="blank"></div>
                    <div className="form-section">
                        <label htmlFor="duration">How long you will stay?</label>
                        <div className="duration-control">
                            <button id="decrease" onClick={decreaseDuration}>
                                -
                            </button>
                            <span id="duration">{duration} Days</span>
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
                                You will pay <strong> 200$ USD</strong>
                            </p>
                            <p>per <strong>{duration} Days</strong></p>
                        </div>
                    </div>
                    <div className="blank0"></div>
                </div>
                
            </div>
            ))}
            <div className="action-section">
                <Link to="/booking02">
                <button onClick={handleBooking} className="book-now">Book Now</button>
                </Link>
                <button className="cancel" onClick={() => {navigate(-1);}}
                >Cancel</button>
            </div>
        </div>
</div>
    );
};

export default Booking01;
