import React, { useState, useRef, useEffect } from "react";
import "../Styles/FacilityForm.css";

const FacilityForm = () => {
    const [detail, setDetail] = useState({});
    const [locations, setLocations] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [capacityList, setCapacityList] = useState([]);
    const [facilityData, setFacilityData] = useState({
        name: "",
        location: "",
        locationID: "",
        description: "",
        img: [],
        capacity: [], // For rooms or tables
        amenities: "",
        contact: "",
        status: "",
        deal: "",
        specificLocation: "",
        averagePrice: "",

    });

    const [service, setService] = useState(localStorage.getItem("selectedService")); // "hotel" or "res"
    // fetch lay danh sach cac location
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
    useEffect(() => {
        const id = localStorage.getItem("selectedServiceId");
        console.log(id);
        // Fetch data from server
        fetch(`provider/${service == "res" ? "restaurant" : "hotel"}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                const fetchedData = data;
                console.log(fetchedData);

                // Normalize data
                if (service === "hotel") {
                    setFacilityData({
                        name: fetchedData.hotelName,
                        location: fetchedData.hotelLocation,
                        description: fetchedData.hotelDescription,
                        img: fetchedData.hotelImages,
                        //apacity: fetchedData.hotelRooms,
                        amenities: fetchedData.hotelAmenities,
                        contact: fetchedData.hotelContact,
                        status: fetchedData.hotelStatus,
                        specificLocation: fetchedData.hotelSpecificLocation,
                        averagePrice: fetchedData.hotelAveragePrice,
                    });
                    setCapacityList(fetchedData.hotelRooms);
                } else if (service === "res") {
                    setFacilityData({
                        name: fetchedData.resName,
                        location: fetchedData.resLocation,
                        description: fetchedData.resDescription,
                        img: fetchedData.resImages,
                        amenities: fetchedData.resAmenities,
                        contact: fetchedData.resContact,
                        status: fetchedData.resStatus,
                        specificLocation: fetchedData.resSpecificLocation,
                        averagePrice: fetchedData.resAveragePrice,
                    });
                    setCapacityList(fetchedData.resTables);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [service]);

    if (!facilityData.name) {
        return <div>Loading...</div>;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        let updateData = {};
        let stringAPI = "";
        if (service === "res") {
            stringAPI = `/provider/api/updateRestaurant/${localStorage.getItem("selectedServiceId")}`;
            updateData = {
                facilityData: {
                    facilityName: facilityData.name,
                    description: facilityData.description,
                    locationId: facilityData.locationID,
                    contact: facilityData.contact,
                    status: facilityData.status,
                    specificLocation: facilityData.specificLocation,
                },
                restaurantData: {
                    amenities: facilityData.amenities,
                    averagePrice: facilityData.averagePrice,
                },
        }
    }
        else {
            stringAPI = `/provider/api/updateHotel/${localStorage.getItem("selectedServiceId")}`;
            updateData = {
                facilityData: {
                    facilityName: facilityData.name,
                    description: facilityData.description,
                    locationId: facilityData.locationID,
                    contact: facilityData.contact,
                    status: facilityData.status,
                    specificLocation: facilityData.specificLocation,
                },
                hotelData: {
                    amenities: facilityData.amenities,
                    averagePrice: facilityData.averagePrice,
                },
        }
        
        
        };
        console.log(updateData);
        console.log(stringAPI);
        // Send data to server

        fetch(stringAPI, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ updateData }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        console.log(errorData.message); // In thông điệp lỗi từ server
                        throw new Error("Failed to update data");
                    });
                }
                return response.json();
            })
            .then((data) => {
                alert("Update facility successful!")
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <div className="facility-form">
            <div class="custom-button-wrapper">
                <div class="link_wrapper">
                    <a href="/home">Home</a>
                </div>
            </div>
            <div className="facility-form-content">
                <h2>Facility Information</h2>
                <p>Please fill up the blank fields below</p>
            </div>
            <div className="facility-form-body">
                <div className="facility-form-details">
                    <div className="facility-form-item">
                        <input type="text" id="facility_name" name="facility_name" placeholder="Name"
                            value={facilityData.name} required
                            onChange={(e) => setFacilityData({ ...facilityData, name: e.target.value })} />
                    </div>
                    <div className="facility-form-item-inline">
                        <div className="facility-form-item">
                        <select
                                id="facility_location"
                                name="facility_location"
                                required
                                
                                onChange={(e) => setFacilityData({ ...facilityData, locationID: e.target.value })}
                            >
                                <option value="">{facilityData.location}</option>
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
                                value={facilityData.contact}
                                onChange={(e) => setFacilityData({ ...facilityData, contact: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="facility-form-item-inline">
                        
                        <div id="facility_type" name="facility_type">
                            {service === "hotel" ? "Hotel" : "Restaurant"}
                        </div>
                        <div className="facility-form-item">
                            <input type="text" id="facility_location_detail" name="facility_location_details" placeholder="Specific Location"
                                required 
                                value={facilityData.specificLocation}
                                onChange={(e) => setFacilityData({ ...facilityData, specificLocation: e.target.value })}
                            />
                        </div>  
                    </div>
                    <div className="facility-form-item">
                        <textarea id="facility_description" name="facility_description" placeholder="Description"
                            value={facilityData.description} required
                            onChange={(e) => setFacilityData({ ...facilityData, description: e.target.value })} />
                    </div>
                    <div className ="facility-form-item-inline">
                        <div className ="facility-form-item">
                            <input type="text" id="facility_amenities" name="facility_amenities" placeholder="Amenities"
                                required
                                value={facilityData.amenities}
                                onChange={(e) => setFacilityData({ ...facilityData, amenities: e.target.value })}
                            />
                        </div>
                        <div className ="facility-form-item">
                            <input type="text" id="facility_average_price" name="facility_average_price" placeholder="Average Price"
                                required
                                value={facilityData.averagePrice}
                                onChange={(e) => setFacilityData({ ...facilityData, averagePrice: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="facility-form-item">

                        <div className="facility-images">
                            {facilityData.img.map((image, index) => (
                                <img id="current_image" key={index} src={image} alt={`Facility ${index}`} />
                            ))}

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
};

export default FacilityForm;