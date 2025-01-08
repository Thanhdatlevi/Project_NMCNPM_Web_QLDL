import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import '../Styles/HomeDashBoard.css';
import '../Styles/Home_Content.css';
import { use } from "react";
const HomeDashboard = () => {
    const [hotels, setHotels] = useState([])
    const [bestHotel, setBestHotel] = useState([])
    const [bestRestaurant, setBestRestaurant] = useState([])
    const [restaurants, setRestaurants] = useState([])
    useEffect(()=>{
        fetch('/provider/restaurant/by-provider')
            .then((response) => response.json())
            .then((data) => {
            setRestaurants(data)
            })
            .catch((error) => console.error('Error:', error));
    },[]);
    useEffect(()=>{
        fetch('/provider/hotel/by-provider')
            .then((response) => response.json())
            .then((data) => {
            setHotels(data);
            })
            .catch((error) => console.error('Error:', error)); 
    },[]);
    const bestHotelRating = (hotels) => {
        let max = 0;
        let bestHotel = [];
        for (let i = 0; i < hotels.length; i++) {
            if (hotels[i].rating > max) {
                max = hotels[i].rating;
                bestHotel = hotels[i];
            }
        }
        return bestHotel;
    };
    const bestResRating = (res) => {
        let max = 0;
        let bestRes = [];
        for (let i = 0; i < res.length; i++) {
            if (res[i].rating > max) {
                max = res[i].rating;
                bestRes = res[i];
            }
        }
        return bestRes;
    };
    useEffect(()=>{
        setBestHotel(bestHotelRating(hotels));
        setBestRestaurant(bestResRating(restaurants));
    },[hotels,restaurants]);
    // viết hàm tính trung bình rating cho facility
    const avgRatingHotel = (hotels) => {
        let sum = 0;
        let max = 0;
        for (let i = 0; i < hotels.length; i++) {
            sum += hotels[i].rating;
            if (hotels[i].rating > max) {
                max = hotels[i].rating;
            }
        }
        return sum / hotels.length;
    };
    const avgRatingRes = (res) => {
        let sum = 0;
        let max = 0;
        for (let i = 0; i < res.length; i++) {
            sum += res[i].rating;
            if (res[i].rating > max) {
                max = res[i].rating;
            }
        }
        return sum / res.length;
    };
    const roundFacility = (num) => {
        return Math.round(num * 100) / 100;
    };
    return (
        <section className="HomeDashboard">
            <div className ="dashboard-title">
                <h3>
                    Home Dashboard
                </h3>
            </div>
            <div className="dashboard-content">
                <div className ="topic-container">
                    <div className ="topic">
                        <h4>
                            Hotel
                        </h4>
                        <div className="total">
                            {hotels.length}
                        </div>
                        <div className="divider"></div>
                        <div className="specialty">
                        Average Rating: {roundFacility(avgRatingHotel(hotels))}
                        </div>
                    </div>
                    <div className ="topic">
                        <h4>
                            Restaurant
                        </h4>
                        <div className="total">
                            {restaurants.length}
                        </div>
                        <div className="divider"></div>
                        <div className="specialty">
                            Average Rating: {roundFacility(avgRatingRes(restaurants))}
                        </div>
                    </div>
                </div>
                <div className="dashboard-facility">
                    <div className="facility-title">
                        <h4>
                           Top Facility
                        </h4>
                    </div>
                    <div className="facility-list">
                    {hotels
                            .sort((a, b) => b.rating - a.rating) // Sắp xếp theo rating giảm dần
                            .slice(0, 2) // Lấy 2 phần tử đầu tiên
                            .map((hotel) => (
                                <div className="facility" >
                                    <div className="facility-image">
                                        <img src={hotel.images[0]} alt="attraction" />
                                    </div>
                                    <div className="facility-name">
                                        {hotel.hotelName}
                                    </div>
                                    <div className="facility-rating">
                                        {hotel.rating}
                                    </div>
                                </div>
                            ))}
                    {restaurants
                            .sort((a, b) => b.rating - a.rating) // Sắp xếp theo rating giảm dần
                            .slice(0, 2) // Lấy 2 phần tử đầu tiên
                            .map((res) => (
                                <div className="facility" >
                                    <div className="facility-image">
                                        <img src={res.images[0]} alt="attraction" />
                                    </div>
                                    <div className="facility-name">
                                        {res.restaurantName }
                                    </div>
                                    <div className="facility-rating">
                                        {res.rating}
                                    </div>
                                </div>
                            ))}
                        
                    </div>
                </div>
            </div>
        </section>
    );
}
export default HomeDashboard;