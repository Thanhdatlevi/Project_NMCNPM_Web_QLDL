import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/TourReservationResult.css';

const TourReservationResult = () => {
    const [selections, setSelections] = useState({});
    const [city, setCity] = useState('');
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
            const places = chosenPlaces.filter(element => element.attraction_name === selections[element.attraction_name]);
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
            const hotels = chosenHotels.filter(element => element.facility_name === selections[element.facility_name]);    
            setHotelChosen(hotels);
        } catch (error) {
            console.error('Error loading hotels:', error);
        }
    }, []);

    const loadRestaurants = useCallback(async (city, selections) => {
        try {
            const response = await fetch('http://localhost:3000/res/getFilterres');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenRestaurants = data.filter(element => element.location_id === city)
            const restaurants = chosenRestaurants.filter(element => element.facility_name === selections[element.facility_name]);
            setRestaurantChosen(restaurants);
        } catch (error) {
            console.error('Error loading restaurants:', error);
        }
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
    }, [loadPlaces, loadHotels, loadRestaurants, displayTotal]);

    useEffect(() => {
        displayTotal();
    }, [displayTotal]);

    useEffect(() => {
        finalTotal();
    }, [finalTotal]);

    useEffect(() => {
        displayItems();
    }, [displayItems]);

    function editTourButton() {
        window.location.href = "/HomePlace";
    }

    function confirmButton() {
        alert("Your reservation has been confirmed.");
        window.location.href = "/";
    }

    function generateItem(item) {
        return (
            <div id="service-detail" key={item.facility_name ? item.facility_name : item.attraction_name}>
                <p id="service-name">{item.facility_name ? item.facility_name : item.attraction_name}</p>
                <p id="service-quantity">1</p>
                <p id="service-price">{100}</p>
                <p id="service-total-price">{100}</p>
            </div>
        );
    }

    return (
        <body className="TRR-body">
            <div className="TRR-container">
                <div className="TRR-title">
                    <span href="#!" data-i18n="" >Tour Reservation Result</span>
                </div>

                <div className="TRR-content">
                    {/* <!-- Tour Detail and customer information --> */}
                    <div className="TRR-content-left">
                        <div className="Tour-infor">
                            <div id="ReceiptId-CustomerInfor">
                                <div id="ReceiptId">
                                    <p href="#!" data-i18n="">Receipt ID: <span>123456</span></p>
                                </div>
                            </div>

                            <div id="ReceiptStatus">
                                <span href="#!" data-i18n="">Unpaid</span>
                            </div>
                        </div>

                        <div className="Tourist-infor">
                            <div id="header">
                                <p> Customer Information </p>
                            </div>

                            <div id="information">
                                <p id="customer-name"> Name: <span>Nguyen Van A</span> </p>
                                <p id="customer-phone"> Phone: <span>0123456789</span> </p>
                            </div>
                        </div>

                        <div className="Tour-detail">
                            <div id="header">
                                <p id="service-name"> Service name </p>
                                <p id="service-qunatity"> Quantity </p>
                                <p id="service-price"> Price </p>
                                <p id="service-total-price"> Total </p>
                            </div>

                            <div id="service-container">
                                {displayItems()}
                            </div>
                        </div>
                    </div>

                    {/* <!-- Total and Payment --> */}
                    <div className="TRR-content-right">
                        <div className="Payment-method">
                            <div id="header">
                                <p> Payment method </p>
                            </div>
                            <div id="Payment-detail">
                                <div id="method-container">
                                    <p id="method">Cash</p>
                                    <p id="total">{total}</p>
                                </div>

                                {/* <!-- temp start --> */}
                                <div id="method-container">
                                    <p id="method">Cash</p>
                                    <p id="total">{total}</p>
                                </div>
                                {/* <!-- temp end --> */}
                            </div>
                        </div>

                        <div className="Receipt-detail">
                            <div id="header">
                                <p> Receipt detail </p>
                            </div>

                            <div id="Receipt-container">
                                <div>
                                    <p> Current total: </p>
                                    <p> Discount: </p>
                                    <p> Voucher: </p>
                                    <p> Final total: </p>
                                </div>

                                <div id="editable">
                                    <p id="total"> {total} </p>
                                    <p id="discount"> 10%</p>
                                    <p id="voucher"> None</p>
                                    <p id="final-total"> {finalTotal()}</p>
                                </div>
                            </div>

                            <div id="Must-pay-container">
                                <p> Must pay: </p>
                                <p id="final-total"> {finalTotal()} </p>
                            </div>
                        </div>

                        <div className="Option_buttons">
                            <Link to="/HomePlace" id="edit-tour-button" onClick={editTourButton}> <span>Edit</span> </Link>
                            <Link to="/" id="cancel-tour-button" > <span>Cancel</span></Link>
                        </div>

                        <div className="Confirm-button">
                            <button id="Confirm-button" onClick={confirmButton}> <span>Confirm</span> </button>
                        </div>
                    </div>
                </div>
            </div>
            <script src="../javascript/tourReservationResult.js"></script>
        </body>
    );

};

export default TourReservationResult;