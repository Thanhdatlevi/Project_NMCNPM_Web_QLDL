import React from "react";
import "../Styles/FacilityForm.css"; 
const FacilityForm = () => {

    return (
        <div className="facility-form">
            <div className="facility-form-content">
                <h2>Facility Information</h2>
                <p>Please fill up the blank fields below</p>
            </div>
            <div className="facility-form-body">
                <div className="facility-form-details">
                    <div className="facility-form-item">
                        <input type="text" id="facility_name" name="facility_name" placeholder="Name" required />
                    </div>
                    <div className="facility-form-item">
                        <input type="text" id="facility_location" name="facility_location" placeholder="Location" required />
                    </div>
                    <div className="facility-form-item-inline">
                        
                        <input type="number" id="facility_price" name="facility_price" placeholder="Price" required />
                        <select id="facility_type" name="facility_type" required>
                            <option value="">Type</option>
                            <option value="hotel">Hotel</option>
                            <option value="restaurant">Restaurant</option>
                        </select>
                    </div>
                    <div className="facility-form-item">
                        <textarea id="facility_description" name="facility_description" placeholder="Description" required />
                    </div>
                    <div className="facility-form-item">
                        <input type="file" id="facility_img" name="facility_img" accept="image/*" required />
                    </div>
                    <div className="facility-form-item">
                        <button type="submit" id="facility_action" >Submit</button>
                    </div>
                </div>
                <div className="image-preview">
                    <img src="/Images/facility-form.jpg" alt="Image Preview" />
                </div>
            </div>
        </div>
    )
};
export default FacilityForm;