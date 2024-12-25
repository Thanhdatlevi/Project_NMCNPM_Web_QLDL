import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AddFacility.css";

const AddFacility = () => {
    const [type, setType] = useState("hotel");
    const [detail, setDetail] = useState({});
    const [facilityData, setFacilityData] = useState({
        name: "",
        description: "",
        locationID: "",
        specificLocation: "",
        contact: "",
        img: [],
    });

    const [service, setService] = useState(localStorage.getItem("selectedService")); // "hotel" or "res"
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(facilityData);
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
        // fetch(stringAPI, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ facilityData }),
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             return response.json().then((errorData) => {
        //                 console.log(errorData.message); // In thông điệp lỗi từ server
        //                 throw new Error("Failed to update data");
        //             });
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log("Success:", data);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
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
                            onChange={(e) => setFacilityData({ ...facilityData, name: e.target.value })}
                           />
                    </div>
                    <div className="facility-form-item-inline">
                        <div className="facility-form-item">
                            <input type="text" id="facility_location" name="facility_location" placeholder="Location"
                                required
                                onChange={(e) => setFacilityData({ ...facilityData, locationID: e.target.value })}
                            />
                        </div>
                        <div className="facility-form-item">
                            <input type="text" id="facility_location_detail" name="facility_location_details" placeholder="Specific Location"
                                required 
                                onChange={(e) => setFacilityData({ ...facilityData, specificLocation: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="facility-form-item-inline">
                        <select id="facility_type" name="facility_type" required onChange={(e) => setType(e.target.value)}>
                            <option value="restaurant" >Restaurant</option>
                            <option value="hotel">Hotel</option>
                        </select>
                        <div className="facility-form-item">
                            <input type="number" id="facility_capacity" name="facility_capacity" placeholder="Capacity"
                                required
                                onChange={(e) => setFacilityData({ ...facilityData, capacity: e.target.value })}
                            />                        
                        </div>
                    </div>
                    <div className="facility-form-item">
                        <textarea id="facility_description" name="facility_description" placeholder="Description"
                            required
                            onChange={(e) => setFacilityData({ ...facilityData, description: e.target.value })}
                            />
                    </div>
                    <div className="facility-form-item">
                        <input type="text" id="facility_contact" name="facility_contact" placeholder="Contact"
                            required
                            onChange={(e) => setFacilityData({ ...facilityData, contact: e.target.value })}
                        />
                    </div>
                    <div className="facility-form-item">
                        <div className="facility-images">
                            <label htmlFor="facility_images">Images</label>
                            <input type="file" id="facility_images" name="facility_images" accept="image/*" multiple
                                required
                            />
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