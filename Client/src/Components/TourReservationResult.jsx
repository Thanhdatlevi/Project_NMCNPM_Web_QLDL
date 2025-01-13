import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/TourReservationResult.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TourReservationResult = () => {
    const [placesChosen, setPlacesChosen] = useState([]);
    const [hotelChosen, setHotelChosen] = useState([]);
    const [restaurantChosen, setRestaurantChosen] = useState([]);
    const [total, setTotal] = useState(0);

    const loadPlaces = useCallback(async (city, selections) => {
        try {
            const response = await fetch('http://localhost:3000/attraction/getFilterattraction');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenPlaces = data.filter(element => element.location_id === city);
            const places = chosenPlaces.filter(element => selections[element.attraction_id])
                .map(element => ({
                    ...element,
                    quantity: selections[element.attraction_id].quantity,
                    date: selections[element.attraction_id].date,
                }));
            setPlacesChosen(places);
        } catch (error) {
            console.error('Error loading places:', error);
        }
    }, []);

    const loadHotels = useCallback(async (city, selections) => {
        try {
            const response = await fetch('http://localhost:3000/hotel/getFilterhotel');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenHotels = data.filter(element => element.location_id === city);
            const hotels = chosenHotels.filter(element => selections[element.facility_id])
                .map(element => ({
                    ...element,
                    quantity: selections[element.facility_id].quantity,
                    date: selections[element.facility_id].date,
                    price: element.average_price ? element.average_price : 0,
                    totalPrice: (element.average_price ? element.average_price : 0) * selections[element.facility_id].quantity
                }));
            setHotelChosen(hotels);
        } catch (error) {
            console.error('Error loading hotels:', error);
        }
    }, []);

    const loadRestaurants = useCallback(async (city, selections) => {
        try {
            const response = await fetch('http://localhost:3000/restaurant/getFilterrestaurant');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenRestaurants = data.filter(element => element.location_id === city);
            const restaurants = chosenRestaurants.filter(element => selections[element.facility_id])
                .map(element => ({
                    ...element,
                    quantity: selections[element.facility_id].quantity,
                    date: selections[element.facility_id].date,
                    price: element.average_price ? element.average_price : 0,
                    totalPrice: (element.average_price ? element.average_price : 0) * selections[element.facility_id].quantity
                }));
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
            .reduce((acc, item) => acc + (item.average_price ? item.average_price : 0) * item.quantity, 0);
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

    function formattedDate(date) {
        return date ? (`at ${date.split('T')[1]} on ${date.split("T")[0]}` ) : "--";
    }

    function confirmButton() {
        const transformedPlaces = placesChosen.map(place => ({
            Name: place.attraction_name,
            Quantity: place.quantity,
            "Checkin time": formattedDate(place.date),
        }));
    
        const transformedHotels = hotelChosen.map(hotel => ({
            Name: hotel.facility_name,
            Quantity: hotel.quantity,
            Price: hotel.average_price,
            "Checkin time": formattedDate(hotel.date),
            "Total price": hotel.totalPrice,
        }));

        const transformedRestaurants = restaurantChosen.map(restaurant => ({
            Name: restaurant.facility_name,
            Quantity: restaurant.quantity,
            Price: restaurant.average_price,
            "Checkin time": formattedDate(restaurant.date),
            "Total price": restaurant.totalPrice,
        }));

        // Combine the data
        const bookingData = [
            ...transformedPlaces,
            ...transformedHotels,
            ...transformedRestaurants
        ];
    
        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(bookingData);
    
        // Create a workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Booking Data');
    
        // Generate Excel file and save it
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'TourSchedule.xlsx');

        alert("Your reservation has been confirmed.");
        window.location.href = "/booking02";
    }

    function generateItem(item) {
        const formattedDate = item.date ? (
            <>
                {item.date.split('T')[0]}<br />at {item.date.split('T')[1]}
            </>
        ) : "--";

        return (
            <div id="service-detail" key={item.facility_name ? item.facility_name : item.attraction_name}>
                <p id="service-name">{item.facility_name ? item.facility_name : item.attraction_name}</p>
                <p id="service-quantity">{(item.quantity != 0) ? item.quantity : "--"}</p>
                <p id="checkin-time">{formattedDate}</p>
                <p id="service-price">{item.average_price ? item.average_price : "--"}</p>
                <p id="service-total-price">{item.average_price ? item.totalPrice : "--"}</p>
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
                                <p id="checkin-time"> Checkin time </p>
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
                            <Link to="/HomePlace" id="cancel-tour-button"> <span>Cancel</span></Link>
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