import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AddFacility.css";
import ImageSelector from "./ImageSelector.jsx";
import  supabase  from "../Scripts/supabase.js";
const AddFacility = () => {
    const [type, setType] = useState("hotel");
    const [locations, setLocations] = useState([]);
    const [detail, setDetail] = useState({});
    const [requestData, setrequestData] = useState({
        facilityName: "",
        description: "",
        locationId: "",
        specificLocation: "",
        contact: "",
        imageUrls: [],
    });
    useEffect(() => {
        fetch("/location/allLocation")
            .then((response) => response.json())
            .then((data) => {
                setLocations(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
   
    const [service, setService] = useState(localStorage.getItem("selectedService")); // "hotel" or "res"
    const handleImageUpload = (uploadedUrls) => {
        // Set the uploaded image URLs in the state
        console.log(uploadedUrls);
        setrequestData({ ...requestData, imageUrls: uploadedUrls });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(requestData);
        //Send data to server
        let stringAPI = "";
        if (type === "hotel") 
            { 
                stringAPI = "/provider/api/requestHotel"; 
            }
        else 
        { 
            stringAPI = "/provider/api/requestRestaurant"; 
        }
        console.log(stringAPI);
        fetch(stringAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ requestData }),
        })
            .then((response) => {
                if (!response.ok) {
                    alert("Add Fail!")
                }
                alert("Add successfully!")
            })
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <div className="facility-form">
            <div className="facility-form-content">
                <h2>Facility Information</h2>
                <p>Please fill up the blank fields below</p>
            </div>
            <div className="facility-form-body">
                <div className="facility-form-details">
                    <div className="facility-form-item">
                        <input type="text" id="facility_name" name="facility_name" placeholder="Name" 
                            required
                            onChange={(e) => setrequestData({ ...requestData, facilityName: e.target.value })}
                           />
                    </div>
                    <div className="facility-form-item-inline">
                        <div className="facility-form-item">
                            <select
                                id="facility_location"
                                name="facility_location"
                                required
                                onChange={(e) => setrequestData({ ...requestData, locationId: e.target.value })}
                            >
                                <option value="">Select a location</option>
                                {locations.map(location => (
                                    <option key={location.locationId} value={location.locationId}>
                                        {location.locationName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="facility-form-item">
                            <input type="text" id="facility_contact" name="facility_contact" placeholder="Contact"
                                required
                                onChange={(e) => setrequestData({ ...requestData, contact: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="facility-form-item-inline">
                        <select id="facility_type" name="facility_type" required onChange={(e) => setType(e.target.value)}>
                            <option value="restaurant" >Restaurant</option>
                            <option value="hotel">Hotel</option>
                        </select>
                        <div className="facility-form-item">
                            <input type="text" id="facility_location_detail" name="facility_location_details" placeholder="Specific Location"
                                required 
                                onChange={(e) => setrequestData({ ...requestData, specificLocation: e.target.value })}
                            />
                    </div>
                    </div>
                    <div className="facility-form-item">
                        <textarea id="facility_description" name="facility_description" placeholder="Description"
                            required
                            onChange={(e) => setrequestData({ ...requestData, description: e.target.value })}
                            />
                    </div>
                    
                    

                    <div className="facility-form-item">
                        <div className="facility-images">
                            <ImageSelector onImageUpload={handleImageUpload}/>
                            
                        </div>
                    </div>
                    <div className="facility-form-item">
                        <button type="submit" id="facility_action" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="image-preview">
                    <img src={"/Images/facility-form.jpg"} alt="Image Preview" />
                </div>
            </div>
        </div>
    );
}
export default AddFacility;