import React, { useState, useRef, useEffect } from "react";
import "../Styles/FacilityForm.css";

const FacilityForm = () => {
    const dialogRef = useRef(null);
    const [detail, setDetail] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [capacityList, setCapacityList] = useState([]);
    const [facilityData, setFacilityData] = useState({
        name: "",
        location: "",
        description: "",
        img: [],
        capacity: [], // For rooms or tables
        amenities: "",
        contact: "",
        status: "",
        deal: "",
    });

    const [service, setService] = useState(localStorage.getItem("selectedService")); // "hotel" or "res"

    useEffect(() => {
        const id = localStorage.getItem("selectedServiceId") ? localStorage.getItem("selectedServiceId") : "r001";

        // Fetch data from server
        fetch(`/${service === "res" ? "restaurant" : "hotel"}/provider/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                const fetchedData = data;
                console.log("Data: ",fetchedData);

                // Normalize data
                if (service === "hotel") {
                    setFacilityData({
                        
                        name: fetchedData.hotelName,
                        location: fetchedData.hotelLocation,
                        description: fetchedData.hotelDescription,
                        img: fetchedData.hotelImages,
                        capacity: fetchedData.hotelRooms,
                        amenities: fetchedData.hotelAmenities,
                        contact: fetchedData.hotelContact,
                        status: fetchedData.hotelStatus,
                        deal: fetchedData.hotelDeal,
                    });
                    setCapacityList(fetchedData.hotelRooms);
                } else if (service === "res") {
                    setFacilityData({
                        
                        name: fetchedData.resName,
                        location: fetchedData.resLocation,
                        description: fetchedData.resDescription,
                        img: fetchedData.resImages,
                        capacity: fetchedData.resTables,
                        amenities: fetchedData.resAmenities,
                        contact: fetchedData.resContact,
                        status: fetchedData.resStatus,
                        deal: fetchedData.resDeal,
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

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };
    const addCapacity = () => {
        const idLength = capacityList.length > 0 ? (service === "res" ? capacityList[0].table_id.length : capacityList[0].room_id.length) - 1 : 3;
        const newIdNumber = (capacityList.length + 1).toString().padStart(idLength, '0');
        const newId = service=== "res" ?`t${newIdNumber}` : `r${newIdNumber}`;
        const newCapacity = service === "res"
            ? { table_id: newId, price: capacityList[0].price, status: "available" }
            : { room_id: newId, price: capacityList[0].price, status: "available" };
        setCapacityList([...capacityList, newCapacity]);
    };

    const removeCapacity = (index) => {
        const newCapacityList = capacityList.filter((_, i) => i !== index);
        setCapacityList(newCapacityList);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const newFacilityData = {
            id: localStorage.getItem("selectedServiceId"),
            
            name: facilityData.name,
            location: facilityData.location,
            detail: detail.detail,
            description: facilityData.description,
            img: facilityData.img,
            capacity: capacityList,
            amenities: facilityData.amenities,
            contact: facilityData.contact,
            status: facilityData.status,
            deal: facilityData.deal,
        };
        console.log(newFacilityData);
        // Send data to server
        // fetch(`${service}/update`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(newFacilityData),
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error("Failed to update data");
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
                        value={facilityData.name} required  
                        onChange={(e) => setFacilityData({ ...facilityData, name: e.target.value })} />
                    </div>
                    <div className="facility-form-item-inline">
                        <div className="facility-form-item">
                            <input type="text" id="facility_location" name="facility_location" placeholder="Location" 
                            value={facilityData.location} required  
                            onChange={(e) => setFacilityData({ ...facilityData, location: e.target.value })}/>
                        </div>
                        <div className="facility-form-item">
                            <input type="text" id="facility_location_detail" name="facility_location_details" placeholder="Location Detail" 
                            required onChange={(e) => setDetail({ ...detail, detail: e.target.value })} 
                            />
                        </div>
                    </div>
                    
                    <div className="facility-form-item-inline">
                    <button onClick={toggleDialog}>Add</button>
                        {isDialogOpen && (
                            <div className="dialog">
                                <div className="dialog-conte    nt">
                                    <h3>Capacity List</h3>
                                    <div className="capacity-header">
                                        <p>ID</p>
                                        <p>Price</p>
                                        <p>Status</p>
                                        <p>Action</p>
                                    </div>
                                    {capacityList.map((capacity, index) => (
                                        <div key={index} className="capacity-item">
                                            <p>{service === "res" ? capacity.table_id : capacity.room_id}</p>
                                            <p>{capacity.price}</p>
                                            <p>{capacity.status}</p>
                                            <button onClick={() => removeCapacity(index)}>Remove</button>
                                        </div>
                                    ))}
                                    <button onClick={addCapacity}>Add Capacity</button>
                                    <button onClick={toggleDialog}>Close</button>
                                </div>
                            </div>
                        )}
                        <div id="facility_type" name="facility_type">
                            {service === "hotel" ? "Hotel" : "Restaurant"}
                        </div>
                    </div>
                    <div className="facility-form-item">
                        <textarea id="facility_description" name="facility_description" placeholder="Description" 
                        value={facilityData.description} required  
                        onChange={(e) => setFacilityData({ ...facilityData, description: e.target.value })}/>
                    </div>
                    
                    <div className="facility-form-item">
                    
                        <div className="facility-images">
                        {facilityData.img.map((image, index) => (
                            <img key={index} src={image} alt={`Facility ${index}`} />
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
