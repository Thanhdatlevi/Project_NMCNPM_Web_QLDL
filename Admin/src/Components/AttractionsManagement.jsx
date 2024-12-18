import '../Styles/AttractionsManagement.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
const AttractionsManagement = () => {
    return  (
        <section className="AttractionsManagement">
            <h3>
                Attractions Management
            </h3>
            <div className="list-attractions">
                <div className="list-attractions-content">
                    <Link to="/attractionsManagement/addAttraction">Add Attraction</Link>
                </div>
                <div className="list-attractions-content">
                    <Link to="/attractionsManagement/editAttraction">Edit Attraction</Link>
                </div>
                <div className="list-attractions-content">
                    <Link to="/attractionsManagement/deleteAttraction">Delete Attraction</Link>
                </div>
            </div>
        </section>
    );
}
export default AttractionsManagement;