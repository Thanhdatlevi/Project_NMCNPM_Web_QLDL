import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import '../Styles/HomeDashBoard.css';
import '../Styles/Home_Content.css';
import { use } from "react";
const HomeDashboard = () => {
    const [attractions, setAttractions] = useState([])
    useEffect(()=>{
        fetch('/attraction/getFilterattraction')
            .then((response) => response.json())
            .then((data) => {
            setAttractions(data)
            })
            .catch((error) => console.error('Error:', error));
    },[]);
    const  [attRate,setattRate] = useState(0)
    // viết hàm tính trung bình rating cho attraction
    const avgRating = (attractions) => {
        let sum = 0;
        for (let i = 0; i < attractions.length; i++) {
            sum += attractions[i].rating;
        }
        return sum / attractions.length;
    };
    //làm tròn 2 chữ số sau dấu phẩy
    const round = (num) => {
        return Math.round(num * 100) / 100;
    };
    useEffect(() => {
        setattRate(avgRating(attractions));
    }, [attractions]);

    const [facilities, setFacilities] = useState(0)
    const [hotels, setHotels] = useState(0)
    const [restaurants, setRestaurants] = useState(0)
    useEffect(()=>{
        fetch('/restaurant/getFilterres')
            .then((response) => response.json())
            .then((data) => {
            setFacilities(facilities+data.length)
            setRestaurants(data.length)
            })
            .catch((error) => console.error('Error:', error));
    },[]);
    useEffect(()=>{
        fetch('/hotel/getFilterhotel')
            .then((response) => response.json())
            .then((data) => {
            setFacilities(facilities+data.length)
            setHotels(data.length)
            })
            .catch((error) => console.error('Error:', error)); 
    },[]);
    // viết hàm tính trung bình rating cho facility
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
                            Attraction
                        </h4>
                        <div className="total">
                            {attractions.length}
                        </div>
                        <div className="divider"></div>
                        <div className="specialty">
                            Average Rating: {round(attRate)}
                        </div>
                    </div>
                    <div className ="topic">
                        <h4>
                            Facility
                        </h4>
                        <div className="total">
                            {hotels+restaurants}
                        </div>
                        <div className="divider"></div>
                        <div className="specialty">
                            <div className="facility-hotel">
                                Hotel: {hotels}
                            </div>
                            <div className="facility-restaurant">
                                Restaurant: {restaurants}
                            </div>
                        </div>
                    </div>
                    <div className="topic">
                        <h4>
                            User
                        </h4>
                        <div className="total">
                            0
                        </div>
                        <div className="divider"></div>
                        <div className="specialty">
                            <div className="user-admin">
                                Provider: 0
                            </div>
                            <div className="user-customer">
                                Customer: 0
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-attraction">
                    <div className="attraction-title">
                        <h4>
                           Top Attraction
                        </h4>
                    </div>
                    <div className="attraction-list">
                        {attractions
                            .sort((a, b) => b.rating - a.rating) // Sắp xếp theo rating giảm dần
                            .slice(1, 5) // Lấy 4 phần tử đầu tiên
                            .map((attraction) => (
                                <div className="attraction" key={attraction._id}>
                                    <div className="attraction-image">
                                        <img src={attraction.img_url} alt="attraction" />
                                    </div>
                                    <div className="attraction-name">
                                        {attraction.attraction_name}
                                    </div>
                                    <div className="attraction-rating">
                                        {attraction.rating}
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