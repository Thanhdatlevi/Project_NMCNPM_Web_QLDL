import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Styles/Booking-02.css"; // Adjust this path according to your CSS file location
const Booking02 = ({ bookingData }) => {
    let navigate = useNavigate();
    return (
        <div className="body">

        <div className="booking-container">
            <div className="booking-header">
                <img src="/Images/logoITISE.png" alt="ITISE Logo" />
            </div>

            <div className="progress-indicator">
                <span className="completed-step">✓</span>
                <div className="progress-line completed"></div>
                <span className="completed-step">✓</span>
                <div className="progress-line"></div>
                <span className="inactive-step">3</span>
            </div>

            <div className="booking02-info">
                <div className="booking-content">
                    <h2>Payment</h2>
                    <p>Kindly follow the instructions below</p>
                </div>
                <div className="booking02-details">
                    <div className="blank0"></div>
                    <div className="info-section">
                        <div className="title-section">
                            <h3>Transfer ITISE:</h3>
                        </div>
                        <div className="location-section">
                            <h3>
                               <strong> {bookingData.duration} days </strong> at <strong>{bookingData.name}</strong>,<strong> {bookingData.location}</strong>
                            </h3>
                        </div>
                        <div className="total-section">
                            <h3>
                                Total: <strong>${bookingData.total} USD</strong>
                            </h3>
                        </div>
                        <div className="initial-section">
                            <h3>
                                Initial Payment: <strong>${bookingData.price}</strong>
                            </h3>
                        </div>
                    </div>
                    <div className="blank"></div>
                    <div className="divider"></div>
                    <div className="blank"></div>
                    <div className="form-section">
                        <label htmlFor="phone-number">Card Number</label>
                        <div className="phone-section">
                            <input
                                className="phone-input"
                                placeholder="Payment card number"
                                type="text"
                            />
                        </div>

                        <label htmlFor="bank">Bank</label>
                        <div className="phone-section">
                            <input
                                className="bank-input"
                                placeholder="Select bank"
                                type="text"
                            />
                        </div>

                        <label htmlFor="exp-date">Exp Date</label>
                        <div className="exp-section">
                            <input
                                className="exp-input"
                                placeholder="Validation date"
                                type="text"
                            />
                        </div>

                        <label htmlFor="cvv">CVV</label>
                        <div className="cvv-section">
                            <input
                                className="cvv-input"
                                placeholder="Beside the card"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="blank0"></div>
                </div>
            </div>
            <div className="action-section">
                <button className="pay-now">Pay Now</button>
                <button onClick={()=> {navigate(-1);}} className="cancel">Cancel</button>
            </div>
        </div>
                    
        </div>
    );
};

export default Booking02;
