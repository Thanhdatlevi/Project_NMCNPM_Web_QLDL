import React, { useState, useEffect } from "react";
import "../Styles/Booking-01.css"; // Adjust this path according to your CSS file location
import { Link, useNavigate } from 'react-router-dom';

const Booking01 = ({ setBookingData }) => {
    const [fac, setFac] = useState({});
    const type = localStorage.getItem('type');
    useEffect(() => {
        console.log(type);
        const find = localStorage.getItem('selected');
        if (type === 'hotel') {
            fetch('/hotel/getFilterhotel')
                .then((response) => response.json())
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].facility_id === find) {
                            setFac(data[i]);
                        }
                    }
                })
                .catch((error) => console.error('Error:', error));
        }
        else if (type === 'restaurant') {
            fetch('/restaurant/getFilterrestaurant')
                .then((response) => response.json())
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].facility_id === find) {
                            setFac(data[i]);
                        }
                    }
                })
                .catch((error) => console.error('Error:', error));
        }
        console.log(fac);
    }, []);
    const [duration, setDuration] = useState(2); // Initial duration in days

    const decreaseDuration = () => {
        if (duration > 1) setDuration(duration - 1);
    };

    const increaseDuration = () => {
        setDuration(duration + 1);
    };
    const handleBooking = () => {
        const selections ={};
        selections[fac.facility_id]={
            ID: fac.facility_id,
            quantity: duration,
            date: localStorage.getItem('date'),
            price: fac.average_price,
        };
        var jsonSelections = JSON.stringify(selections);
        localStorage.setItem('selections', jsonSelections);
        localStorage.setItem('city', fac.location_id);

        // if (fac) {
        //     const data = {
        //         duration: duration,
        //         name: fac.facility_name,
        //         location: fac.location_name,
        //         total: 200 * duration,
        //         price: 200,
        //         imgPath: fac.img_url,
        //     };
        //     localStorage.setItem('bookingData', JSON.stringify(data));
        //     //setBookingData(data);
        // }
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

    let navigate = useNavigate();
    return (
        <div className="body">
            <div className="booking00-container">
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
                    <div className="booking00-details">
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
                            <label htmlFor="duration">{type === 'hotel' ? 'How long you will stay?' : 'How many tables you want to book?'}</label>
                            <div className="duration-control">
                                <button id="decrease" onClick={decreaseDuration}>
                                    -
                                </button>
                                <span id="duration">{duration} {type === 'hotel' ? 'Days' : 'Tables'}</span>
                                <button id="increase" onClick={increaseDuration}>
                                    +
                                </button>
                            </div>

                            <label htmlFor="date">Pick a Date</label>
                            <div className="date-picker">
                                <input id="time-place" type="datetime-local" onChange={handleDateChange} />
                            </div>
                            <div id="notice-place"></div>
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
                    <Link to="/booking02">
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