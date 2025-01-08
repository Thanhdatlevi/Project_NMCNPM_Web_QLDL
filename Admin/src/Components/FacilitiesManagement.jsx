// File: App.js
import React, { useState, useEffect } from 'react';
import '../Styles/FacilitiesManagement.css';

const FacilitiesManagement = () => {
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [currentView, setCurrentView] = useState('hotel');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
  
    useEffect(() => {
      // Fetch hotels
      fetch('/hotel/getFilterhotel')
        .then(res => res.json())
        .then(data => setHotels(data))
        .catch(err => console.error(err));
  
      // Fetch restaurants
      fetch('/restaurant/getFilterrestaurant')
        .then(res => res.json())
        .then(data => setRestaurants(data))
        .catch(err => console.error(err));
    }, []);
    const handleDelete = async (type,providerID, id, facilityID) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }
        const endpoint = `/admin/deleteFacility`;
        try {
            const response = await fetch(endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  facilityId: facilityID,
                }),
            });
            console.log(response)
            // Check if the response is not ok and throw an error
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || "Failed to delete item.");
            }
        
            // If the response is ok, process the deletion
            alert("Item deleted successfully.");
            if (type === 'hotel') {
                setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.facility_id !== facilityID));
            } else {
                setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.facility_id !== facilityID));
            }
        } catch (error) {
            // Handle errors
            console.error("Error deleting item:", error.message);
            alert(`Error: ${error.message}`);
        }
    };
  
    const currentItems =
      currentView === 'hotel'
        ? hotels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : restaurants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
    const totalItems = currentView === 'hotel' ? hotels.length : restaurants.length;
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    return (
      <div className="manage">
        <header className="manage-header">
          <h1>Hotels & Restaurants Management</h1>
          <div className="toggle-buttons">
            <button
              className={currentView === 'hotel' ? 'active' : ''}
              onClick={() => {
                setCurrentView('hotel');
                setCurrentPage(1);
              }}
            >
              Hotel
            </button>
            <button
              className={currentView === 'res' ? 'active' : ''}
              onClick={() => {
                setCurrentView('res');
                setCurrentPage(1);
              }}
            >
              Restaurant
            </button>
          </div>
        </header>
        <main>
          <section>
            <h2>{currentView === 'hotel' ? 'Hotels' : 'Restaurants'}</h2>
            <div className="items-list">
              {currentItems.map(item => (
                <div key={item.id || item.facility_id} className="item-card">
                  <img src={item.img_url} alt={item.facility_name} className="item-image" />
                    <h3>{item.facility_name}</h3>
                    <p>{item.description}</p>
                    <button onClick={() => handleDelete( currentView,item.provider_id,item.hotel_id||item.restaurant_id,item.facility_id)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    );
  };
  
  export default FacilitiesManagement;