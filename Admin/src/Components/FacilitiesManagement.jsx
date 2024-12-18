import '../Styles/FacilitiesManagement.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
const FacilitiesManagement = () => {
    return (
        <section className="FacilitiesManagement">
            <h3>
                Facilities Management
            </h3>
            <div className="list-facilities">
                <div className="list-facilities-content">
                    <Link to="/facilitiesManagement/addFacility">Add Facility</Link>
                </div>
                <div className="list-facilities-content">
                    <Link to="/facilitiesManagement/editFacility">Edit Facility</Link>
                </div>
                <div className="list-facilities-content">
                    <Link to="/facilitiesManagement/deleteFacility">Delete Facility</Link>
                </div>
            </div>
        </section>
    );
}
export default FacilitiesManagement;