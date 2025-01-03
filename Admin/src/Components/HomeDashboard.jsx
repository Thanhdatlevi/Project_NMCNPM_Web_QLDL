import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import '../Styles/HomeDashBoard.css';
import '../Styles/Home_Content.css';
import { use } from "react";
const HomeDashboard = () => {
    const [users,setUsers] = useState(0);
    const [facilities,setFacilities] = useState(0);
    const [attractions, setAttractions] = useState([])
    useEffect(()=>{
        fetch('/admin/getUsersNum')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                console.log(data);
            })
            .catch((error) => console.error('Error:', error));

    },[]);
    
    useEffect(()=>{
        fetch('/attraction/getFilterattraction')
            .then((response) => response.json())
            .then((data) => {
            setAttractions(data)
            })
            .catch((error) => console.error('Error:', error));
    },[]);

    useEffect(()=>{
        fetch('/admin/getFacilitiesNum')
            .then(response => response.json())
            .then(data => {
                setFacilities(data);
                console.log(data);
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
                          
                        </div>
                    </div>
                    <div className ="topic">
                        <h4>
                            Facility
                        </h4>
                        <div className="total">
                           {facilities.facilitiesNum}
                        </div>
                        <div className="divider"></div>
                        <div className="specialty">
                        
                        </div>
                    </div>
                    <div className="topic">
                        <h4>
                            User
                        </h4>
                        <div className="total">
                           {users.usersNum}
                        </div>
                        <div className="divider"></div>
                        <div className="specialty">
                            
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