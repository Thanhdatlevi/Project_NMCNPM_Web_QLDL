import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Styles/Booking-02.css"; // Adjust this path according to your CSS file location
const Booking02 = ({ bookingData }) => {
    let navigate = useNavigate();

    const [placesChosen, setPlacesChosen] = useState([]);
    const [hotelChosen, setHotelChosen] = useState([]);
    const [restaurantChosen, setRestaurantChosen] = useState([]);
    const [total, setTotal] = useState(0);

    const loadPlaces = useCallback(async (city, selections) => {
        try {
            const response = await fetch('http://localhost:3000/attraction/getfilterattraction');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenPlaces = data.filter(element => element.location_id === city)
            const places = chosenPlaces.filter(element => element.attraction_id === selections[element.attraction_id]);
            console.log(selections);
            setPlacesChosen(places);
        } catch (error) {
            console.error('Error loading places:', error);
        }
    }, []);

    const loadHotels = useCallback(async (city, selections) => {
        try {
            const response = await fetch('http://localhost:3000/hotel/getfilterhotel');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenHotels = data.filter(element => element.location_id === city)
            const hotels = chosenHotels.filter(element => element.facility_id === selections[element.facility_id]);    
            setHotelChosen(hotels);
        } catch (error) {
            console.error('Error loading hotels:', error);
        }
        return true;
    }, []);

    const loadRestaurants = useCallback(async (city, selections) => {
        try {
            const response = await fetch('http://localhost:3000/res/getFilterres');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenRestaurants = data.filter(element => element.location_id === city)
            const restaurants = chosenRestaurants.filter(element => element.facility_id === selections[element.facility_id]);
            setRestaurantChosen(restaurants);
        } catch (error) {
            console.error('Error loading restaurants:', error);
        }
        return true;
    }, []);

    const displayItems = () => {
        const allItems = [...placesChosen, ...hotelChosen, ...restaurantChosen];
        return allItems.map(item => generateItem(item));
    };

    const displayTotal = useCallback(() => {
        const total = [...placesChosen, ...hotelChosen, ...restaurantChosen]
            .reduce((acc, item) => acc + 100, 0);
        setTotal(total);
    }, [placesChosen, hotelChosen, restaurantChosen]);

    const calFinalTotal = useCallback(() => {
        return total * 0.9;
    }, [total]);

    const finalTotal = useCallback(() => {
        return calFinalTotal();
    }, [calFinalTotal]);

    useEffect(() => {
        async function fetchData() {
            try {
                const selections = JSON.parse(localStorage.getItem('selections'));
                const city = localStorage.getItem('city');
                await loadPlaces(city, selections);
                await loadHotels(city, selections);
                await loadRestaurants(city, selections);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        finalTotal();
    }, []);

    useEffect(() => {
        displayTotal();
        displayItems();
    }, [displayTotal]);

    function editTourButton() {
        window.location.href = "/HomePlace";
    }

    function confirmButton() {
        alert("Your reservation has been confirmed.");
        window.location.href = "/booking02";
    }

    function generateItem(item) {
        return (
            <h3>
                <strong> {} {item.attraction_id ? "tickets" : (item.restaurant_id ? "tables" : "days") } 
                    </strong> at <strong>{item.attraction_name ? item.attraction_name : item.facility_name}</strong>
                    ,<strong> {item.location_name}</strong>
            </h3>
        );
    }

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
                            {
                                displayItems()
                            }
                        </div>
                        <div className="total-section">
                            <h3>
                                Total: <strong>${finalTotal()} USD</strong>
                            </h3>
                        </div>
                        <div className="initial-section">
                            <h3>
                                Initial Payment: <strong>${finalTotal()} USD</strong>
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
