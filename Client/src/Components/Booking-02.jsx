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
            const response = await fetch('attraction/getFilterattraction');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();// get all the data about attractions
            const chosenPlaces = data.filter(element => element.location_id === city) // get all the attractions in the city

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
            const response = await fetch('hotel/getFilterhotel');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenHotels = data.filter(element => element.location_id === city)

            const hotels = chosenHotels.filter(element => selections[element.facility_id])
                .map(element => ({
                    ...element,
                    quantity: selections[element.facility_id].quantity,
                    date: selections[element.facility_id].date,
                    totalPrice: element.average_price * selections[element.facility_id].quantity,
                    img: selections[element.facility_id].img_url
                }));
            setHotelChosen(hotels);
        } catch (error) {
            console.error('Error loading hotels:', error);
        }
        return true;
    }, []);

    const loadRestaurants = useCallback(async (city, selections) => {
        try {
            const response = await fetch('restaurant/getFilterrestaurant');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const chosenRestaurants = data.filter(element => element.location_id === city)
            console.log(chosenRestaurants)
            const restaurants = chosenRestaurants.filter(element => selections[element.facility_id])
                .map(element => ({
                    ...element,
                    quantity: selections[element.facility_id].quantity,
                    date: selections[element.facility_id].date,
                    totalPrice: element.average_price * selections[element.facility_id].quantity,
                    img: selections[element.facility_id].img_url
                }));
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
            .reduce((acc, item) => acc + (item.average_price ? item.average_price : 0) * item.quantity, 0);
        setTotal(total);
    }, [placesChosen, hotelChosen, restaurantChosen]);

    const calFinalTotal = useCallback(() => {
        return total;
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

    function payNow() {
        const transformedPlaces = placesChosen.map(place => ({
            attraction_id: place.attraction_id,
            quantity: place.quantity,
            date: place.date,
        }));

        const transformedHotels = hotelChosen.map(hotel => ({
            facilityId: hotel.facility_id,
            facilityName: hotel.facility_name,
            quantity: hotel.quantity,
            price: hotel.average_price,
            checkinTime: hotel.date,
            totalPrice: hotel.totalPrice,
            img: hotel.img_url
        }));

        const transformedRestaurants = restaurantChosen.map(restaurant => ({
            facilityId: restaurant.facility_id,
            facilityName: restaurant.facility_name,
            quantity: restaurant.quantity,
            price: restaurant.average_price,
            checkinTime: restaurant.date,
            totalPrice: restaurant.totalPrice,
            img: restaurant.img_url
        }));
        const bookingData = {
            status: 'reserved',
            detailReservation: [
                ...transformedHotels,
                ...transformedRestaurants,
            ],
            //final_total: finalTotal()
        };
        console.log(restaurantChosen);
        console.log(bookingData);
        fetch('/tourist/createReservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
            .then(async (response) => {
                // Kiểm tra nếu response không thành công
                if (!response.ok) {
                    const errorMessage = await response.text(); // Hoặc response.json() nếu server trả về JSON
                    if (response.status === 500) {
                        // Nếu mã lỗi là 500, hiển thị thông báo và chuyển hướng
                        alert(`Dịch vụ không còn tồn tại.`);
                        window.location.href = '/HomePlace';
                        return;
                    }
                    throw new Error(`Error: ${errorMessage}`);

                }
                return response.json(); // Đọc nội dung JSON từ server
            })
            .then((data) => {
                console.log('Success:', data.message); // In message từ server nếu có
                alert(data.message || 'Your payment has been processed successfully.');
                window.location.href = '/home';
            })
            .catch((error) => {
                console.error('Error:', error.message); // In lỗi từ server hoặc từ client
                alert(`There was an error: ${error.message}`);
            });

    }

    function generateItem(item) {

        const formattedDate = " at " + item.date.split('T')[1] + " on " + item.date.split('T')[0];

        return (
            <h3>
                <strong> {item.quantity} {item.attraction_id ? "tickets" : (item.restaurant_id ? "tables" : "days")}
                </strong> in <strong>{item.attraction_name ? item.attraction_name : item.facility_name} </strong>
                ,<strong> {item.location_name}{formattedDate}</strong>
            </h3>
        );
    }

    return (
        <div className="body">

            <div className="booking00-container">
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
                    <div className="booking00-details">
                        <div className="blank0"></div>
                        <div className="info-section">
                            <div className="title-section">
                                <h3>Transfer ITISE:</h3>
                            </div>
                            <div className="detail-section">
                                {
                                    displayItems()
                                }
                            </div>
                            <div className="total-section">
                                <h3>
                                    Total: <strong>${finalTotal() * 0.9} USD</strong>
                                </h3>
                            </div>
                            <div className="initial-section">
                                <h3>
                                    Initial Payment: <strong>${finalTotal() * 0.9} USD</strong>
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
                    <button className="pay-now" onClick={payNow}>Pay Now</button>
                    <button onClick={() => { navigate(-1); }} className="cancel">Cancel</button>
                </div>
            </div>

        </div>
    );
};

export default Booking02;